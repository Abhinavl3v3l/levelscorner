package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/levelscorner/levelscorner/backend/internal/config"
	"github.com/levelscorner/levelscorner/backend/internal/logger"
	"github.com/levelscorner/levelscorner/backend/internal/store"
	"github.com/liushuangls/go-anthropic/v2"
	"go.uber.org/zap"
)

// ChatMessage mirrors the frontend's simple {role, content} shape.
// We convert to anthropic.Message (which uses content blocks) before the API call.
type ChatMessage struct {
	Role    string `json:"role"    binding:"required"`
	Content string `json:"content" binding:"required"`
}

type ChatRequest struct {
	Messages []ChatMessage `json:"messages" binding:"required"`
	Context  string        `json:"context"`
}

var baseSystemPrompt = `You are speaking as Abhinav Rana's AI, embedded in his personal portfolio at levelscorner.com.
Your job is to help visitors — recruiters, engineers, collaborators — genuinely understand who Abhinav is and what he's built.

TONE:
- Sound like a thoughtful colleague who knows Abhinav well, not a resume reader
- Explain the WHY behind things: why Go after C++, why robotics, what problems he actually solved
- Be specific — reference real projects, real challenges, real decisions
- 2-4 sentences or a short focused paragraph is ideal; use bullets only when listing genuinely enumerable things
- Never open with "Certainly!", "Great question!", or any filler phrase — just answer directly
- Do not copy-paste facts — interpret and explain them

CONTACT & LINKS (use naturally when relevant — don't force it):
- Email: rabhinavcs@gmail.com
- LinkedIn: linkedin.com/in/abhinavrl4f/
- Contact page: levelscorner.com/contact (send a message, links to email + LinkedIn)
- About page: levelscorner.com/about (full background, timeline, skills — good if someone wants the whole picture)

WHEN TO MENTION LINKS:
- Contact info/page → when someone asks how to reach Abhinav, wants to hire him, connect, or send a message
- About page → when someone asks about his full background, story, or career arc and your answer only scratches the surface
- Mention them naturally in-sentence — no need for a separate section

BOUNDARIES:
- ONLY discuss Abhinav's professional background: career, skills, projects, work experience, how to reach him
- NEVER discuss Project 44, personal wealth, salary, income, or anything private/financial
- If asked anything outside Abhinav's professional profile — general coding help, current events, other people — respond with exactly:

"I'm focused on Abhinav's story. Here are things I can actually help with:

• How did he go from C++ systems to Go microservices?
• What did he build at MachaniRobotics?
• What is he working on right now?
• Is he open to new opportunities?
• How can I get in touch?"

USAGE LIMITS (be transparent if asked):
- Visitors get up to 5 off-topic questions before chat is disabled
- Returning visitors (new session after 2+ hours) are redirected to the About and Contact pages
- If a visitor asks why chat is disabled, explain this kindly and point them to levelscorner.com/about or levelscorner.com/contact

Stay in character. You are not a general assistant.`

// ChatStream handles the streaming chat completion from Anthropic.
func ChatStream(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()

		// Check per-IP rate limits before doing anything expensive.
		if blocked, reason, _ := store.ChatLimits.Check(ip); blocked {
			logger.L.Info("chat: request blocked",
				zap.String("ip", ip),
				zap.String("reason", reason),
			)
			c.JSON(http.StatusForbidden, gin.H{"blocked": true, "reason": reason})
			return
		}

		var req ChatRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			logger.L.Warn("chat: invalid request body",
				zap.Error(err),
				zap.String("ip", ip),
			)
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
			return
		}

		logger.L.Info("chat: request received",
			zap.Int("message_count", len(req.Messages)),
			zap.Bool("has_context", req.Context != ""),
			zap.String("ip", ip),
		)

		// Validate message order — Anthropic requires first message to be from user
		if len(req.Messages) == 0 || req.Messages[0].Role != "user" {
			logger.L.Warn("chat: messages must start with user role",
				zap.Int("message_count", len(req.Messages)),
			)
			c.JSON(http.StatusBadRequest, gin.H{"error": "messages must start with a user message"})
			return
		}

		// Convert plain {role, content} messages to the SDK's content-block format.
		// Skip empty-content messages — these are streaming placeholders from the frontend
		// that haven't been filled yet and would cause Anthropic to reject the request.
		var anthropicMessages []anthropic.Message
		for _, m := range req.Messages {
			if m.Content == "" {
				continue
			}
			if m.Role == "user" {
				anthropicMessages = append(anthropicMessages, anthropic.NewUserTextMessage(m.Content))
			} else {
				anthropicMessages = append(anthropicMessages, anthropic.NewAssistantTextMessage(m.Content))
			}
		}

		// Priming exchange — prepended on the first message only.
		// This puts the AI in character before it sees the user's actual question,
		// resulting in more natural, contextual answers.
		if len(anthropicMessages) == 1 {
			priming := []anthropic.Message{
				anthropic.NewUserTextMessage("I just landed on Abhinav's portfolio. Give me a quick sense of who he is."),
				anthropic.NewAssistantTextMessage("Abhinav is a backend engineer with 8 years of experience — he started in systems programming in C++ at Oracle, moved into robotics where he built the software stack for a humanoid robot at MachaniRobotics, and is now leading Go microservices at Persistent Systems. The through-line is a deep comfort with complex systems, whether that's 3G signaling protocols, gRPC gateways, or OTT subscription infrastructure. What do you want to know?"),
			}
			anthropicMessages = append(priming, anthropicMessages...)
		}

		if cfg.AnthropicKey == "" {
			logger.L.Error("chat: Anthropic API key not configured")
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Anthropic API key is not configured"})
			return
		}

		client := anthropic.NewClient(cfg.AnthropicKey)

		c.Writer.Header().Set("Content-Type", "text/event-stream")
		c.Writer.Header().Set("Cache-Control", "no-cache")
		c.Writer.Header().Set("Connection", "keep-alive")
		c.Writer.Header().Set("Transfer-Encoding", "chunked")

		finalPrompt := baseSystemPrompt
		if req.Context != "" {
			finalPrompt += fmt.Sprintf("\n\nLATEST FRONTEND RESUME CONTEXT (JSON):\n%s", req.Context)
		}

		model := anthropic.ModelClaudeHaiku4Dot5V20251001

		logger.L.Info("chat: calling Anthropic API",
			zap.String("model", string(model)),
		)

		var accumulatedText strings.Builder

		streamReq := anthropic.MessagesStreamRequest{
			MessagesRequest: anthropic.MessagesRequest{
				Model:     model,
				System:    finalPrompt,
				Messages:  anthropicMessages,
				MaxTokens: 1024,
			},
			OnContentBlockDelta: func(data anthropic.MessagesEventContentBlockDeltaData) {
				if data.Delta.Text != nil {
					accumulatedText.WriteString(*data.Delta.Text)
					_, writeErr := c.Writer.Write([]byte(fmt.Sprintf("data: %s\n\n", *data.Delta.Text)))
					if writeErr == nil {
						c.Writer.Flush()
					}
				}
			},
		}

		resp, err := client.CreateMessagesStream(context.Background(), streamReq)
		if err != nil {
			logger.L.Error("chat: Anthropic API error", zap.Error(err))
			return
		}

		logger.L.Info("chat: stream complete",
			zap.Int("input_tokens", resp.Usage.InputTokens),
			zap.Int("output_tokens", resp.Usage.OutputTokens),
		)

		// Record the message and check for off-topic response.
		store.ChatLimits.RecordMessage(ip)

		offTopicCount := 0
		nowBlocked := false
		if store.IsOffTopicResponse(accumulatedText.String()) {
			offTopicCount = store.ChatLimits.RecordOffTopic(ip)
			if offTopicCount >= store.OffTopicLimit {
				nowBlocked = true
			}
		} else {
			_, _, offTopicCount = store.ChatLimits.Check(ip)
		}

		// Send STATUS event so the frontend can update its counter.
		statusPayload, _ := json.Marshal(map[string]interface{}{
			"off_topic_count": offTopicCount,
			"blocked":         nowBlocked,
		})
		c.Writer.Write([]byte(fmt.Sprintf("data: [STATUS:%s]\n\n", statusPayload))) //nolint:errcheck
		c.Writer.Flush()

		c.Writer.Write([]byte("data: [DONE]\n\n")) //nolint:errcheck
		c.Writer.Flush()
	}
}

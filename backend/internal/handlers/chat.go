package handlers

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/levelscorner/levelscorner/backend/internal/config"
	"github.com/gin-gonic/gin"
	"github.com/liushuangls/go-anthropic/v2"
)

type ChatRequest struct {
	Messages []anthropic.Message `json:"messages" binding:"required"`
	Context  string              `json:"context"`
}

var baseSystemPrompt = `You are a helpful AI assistant residing in the personal portfolio of Abhinav Rana (levelscorner). 
Your job is to answer questions about Abhinav's career, skills, and background. 

IMPORTANT RULES:
1. ONLY answer questions about Abhinav's professional background, skills, and public blog base on the context below.
2. Maintain a sleek, technical, and concise tone. 
3. DO NOT answer any questions about "Project 44", personal wealth goals, salary, or private income tracking. If asked about these, state that you are not authorized to share personal or financial information.
4. If a question is entirely unrelated to software engineering or Abhinav, politely steer the conversation back or decline.`

// ChatStream handles the streaming completion from Anthropic
func ChatStream(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req ChatRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
			return
		}

		if cfg.AnthropicKey == "" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Anthropic API key is not configured"})
			return
		}

		client := anthropic.NewClient(cfg.AnthropicKey)

		// Set headers for SSE
		c.Writer.Header().Set("Content-Type", "text/event-stream")
		c.Writer.Header().Set("Cache-Control", "no-cache")
		c.Writer.Header().Set("Connection", "keep-alive")
		c.Writer.Header().Set("Transfer-Encoding", "chunked")

		// Dynamically inject the React frontend content into the prompt
		finalPrompt := baseSystemPrompt
		if req.Context != "" {
			finalPrompt += fmt.Sprintf("\n\nLATEST FRONTEND RESUME CONTEXT (JSON):\n%s", req.Context)
		}

		streamReq := anthropic.MessagesStreamRequest{
			MessagesRequest: anthropic.MessagesRequest{
				Model:     anthropic.ModelClaude3Dot5HaikuLatest,
				System:    finalPrompt,
				Messages:  req.Messages,
				MaxTokens: 1024,
			},
			OnContentBlockDelta: func(data anthropic.MessagesEventContentBlockDeltaData) {
				if data.Delta.Text != nil {
					// SSE format: "data: <content>\n\n"
					_, writeErr := c.Writer.Write([]byte(fmt.Sprintf("data: %s\n\n", *data.Delta.Text)))
					if writeErr == nil {
						c.Writer.Flush()
					}
				}
			},
		}

		_, err := client.CreateMessagesStream(context.Background(), streamReq)
		if err != nil {
			log.Printf("Anthropic API error: %v", err)
			return
		}

		c.Writer.Write([]byte("data: [DONE]\n\n"))
		c.Writer.Flush()
	}
}

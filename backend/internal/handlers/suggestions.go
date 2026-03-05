package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/levelscorner/levelscorner/backend/internal/config"
	"github.com/levelscorner/levelscorner/backend/internal/logger"
	"github.com/gin-gonic/gin"
	"github.com/liushuangls/go-anthropic/v2"
	"go.uber.org/zap"
)

type SuggestionsRequest struct {
	Messages []ChatMessage `json:"messages" binding:"required"`
}

// GetSuggestions generates 2 follow-up questions based on the last exchange.
func GetSuggestions(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req SuggestionsRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
			return
		}

		// Only need the last user + assistant exchange for context
		msgs := req.Messages
		if len(msgs) > 4 {
			msgs = msgs[len(msgs)-4:]
		}

		var anthropicMsgs []anthropic.Message
		for _, m := range msgs {
			if m.Content == "" {
				continue
			}
			if m.Role == "user" {
				anthropicMsgs = append(anthropicMsgs, anthropic.NewUserTextMessage(m.Content))
			} else {
				anthropicMsgs = append(anthropicMsgs, anthropic.NewAssistantTextMessage(m.Content))
			}
		}

		// Ask for follow-up suggestions as a JSON array
		anthropicMsgs = append(anthropicMsgs, anthropic.NewUserTextMessage(
			`Based on this conversation, suggest exactly 2 short follow-up questions a recruiter or engineer might want to ask next about Abhinav. Return ONLY a raw JSON array of 2 strings — no markdown, no explanation. Example: ["Question one?","Question two?"]`,
		))

		client := anthropic.NewClient(cfg.AnthropicKey)
		resp, err := client.CreateMessages(context.Background(), anthropic.MessagesRequest{
			Model:     anthropic.ModelClaudeHaiku4Dot5V20251001,
			Messages:  anthropicMsgs,
			MaxTokens: 128,
		})
		if err != nil {
			logger.L.Warn("suggestions: API error", zap.Error(err))
			c.JSON(http.StatusOK, gin.H{"suggestions": []string{}})
			return
		}

		raw := strings.TrimSpace(resp.Content[0].GetText())
		var suggestions []string
		if err := json.Unmarshal([]byte(raw), &suggestions); err != nil {
			logger.L.Warn("suggestions: failed to parse response", zap.String("raw", raw))
			c.JSON(http.StatusOK, gin.H{"suggestions": []string{}})
			return
		}

		logger.L.Info("suggestions: generated", zap.Strings("suggestions", suggestions))
		c.JSON(http.StatusOK, gin.H{"suggestions": suggestions})
	}
}

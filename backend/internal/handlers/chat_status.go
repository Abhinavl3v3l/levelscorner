package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/levelscorner/levelscorner/backend/internal/store"
)

// GetChatStatus returns the current rate-limit state for the caller's IP.
func GetChatStatus(c *gin.Context) {
	ip := c.ClientIP()
	blocked, reason, offTopicCount := store.ChatLimits.Check(ip)
	c.JSON(http.StatusOK, gin.H{
		"blocked":        blocked,
		"reason":         reason,
		"off_topic_count": offTopicCount,
		"off_topic_limit": store.OffTopicLimit,
	})
}

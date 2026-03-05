package middleware

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/levelscorner/levelscorner/backend/internal/logger"
	"go.uber.org/zap"
)

// RequestLogger replaces Gin's default logger with structured Zap output.
func RequestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path

		c.Next()

		status := c.Writer.Status()
		latency := time.Since(start)

		fields := []zap.Field{
			zap.String("method", c.Request.Method),
			zap.String("path", path),
			zap.Int("status", status),
			zap.Duration("latency", latency),
			zap.String("ip", c.ClientIP()),
		}

		if status >= 500 {
			logger.L.Error("request", fields...)
		} else if status >= 400 {
			logger.L.Warn("request", fields...)
		} else {
			logger.L.Info("request", fields...)
		}
	}
}

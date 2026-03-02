package handlers

import (
	"net/http"
	"time"

	"github.com/Abhinavl3v3l/levelscorner/backend/internal/config"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type loginRequest struct {
	Password string `json:"password" binding:"required"`
}

func Login(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req loginRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "password required"})
			return
		}

		if req.Password != cfg.AdminPassword {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid password"})
			return
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sub": "admin",
			"iat": time.Now().Unix(),
			"exp": time.Now().Add(24 * time.Hour).Unix(),
		})

		signed, err := token.SignedString([]byte(cfg.JWTSecret))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"token": signed})
	}
}

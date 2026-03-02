package handlers

import (
	"net/http"

	"github.com/Abhinavl3v3l/levelscorner/backend/internal/data"
	"github.com/gin-gonic/gin"
)

func GetProjects(c *gin.Context) {
	c.JSON(http.StatusOK, data.Projects)
}

func GetExperience(c *gin.Context) {
	c.JSON(http.StatusOK, data.Experience)
}

func GetSkills(c *gin.Context) {
	c.JSON(http.StatusOK, data.Skills)
}

func GetPosts(c *gin.Context) {
	// No posts yet — returns empty slice ready for content
	c.JSON(http.StatusOK, []struct{}{})
}

func Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

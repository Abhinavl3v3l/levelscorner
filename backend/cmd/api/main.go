package main

import (
	"log"

	"github.com/Abhinavl3v3l/levelscorner/backend/internal/config"
	"github.com/Abhinavl3v3l/levelscorner/backend/internal/handlers"
	"github.com/Abhinavl3v3l/levelscorner/backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()
	r.Use(middleware.CORS(cfg))

	api := r.Group("/api")
	{
		api.GET("/health", handlers.Health)
		api.GET("/projects", handlers.GetProjects)
		api.GET("/experience", handlers.GetExperience)
		api.GET("/skills", handlers.GetSkills)
		api.GET("/posts", handlers.GetPosts)
		api.POST("/auth/token", handlers.Login(cfg))
	}

	private := r.Group("/api/private")
	private.Use(middleware.Auth(cfg))
	{
		private.GET("/dashboard", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "dashboard coming soon"})
		})
	}

	log.Printf("starting in %s mode on :%s", cfg.Env, cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}

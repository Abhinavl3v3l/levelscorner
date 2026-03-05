package main

import (
	"github.com/levelscorner/levelscorner/backend/internal/config"
	"github.com/levelscorner/levelscorner/backend/internal/handlers"
	"github.com/levelscorner/levelscorner/backend/internal/logger"
	"github.com/levelscorner/levelscorner/backend/internal/middleware"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		// logger not ready yet — fall back to panic
		panic("failed to load config: " + err.Error())
	}

	if err := logger.Init(cfg.Env); err != nil {
		panic("failed to init logger: " + err.Error())
	}
	defer logger.L.Sync() //nolint:errcheck

	logger.L.Info("starting server",
		zap.String("env", cfg.Env),
		zap.String("port", cfg.Port),
	)

	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Use gin.New() instead of gin.Default() so we control the middleware stack.
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(middleware.RequestLogger())
	r.Use(middleware.CORS(cfg))

	api := r.Group("/api")
	{
		api.GET("/health", handlers.Health)
		api.GET("/projects", handlers.GetProjects)
		api.GET("/experience", handlers.GetExperience)
		api.GET("/skills", handlers.GetSkills)
		api.GET("/posts", handlers.GetPosts)
		api.POST("/chat", handlers.ChatStream(cfg))
		api.GET("/chat/status", handlers.GetChatStatus)
		api.POST("/chat/suggestions", handlers.GetSuggestions(cfg))
		api.POST("/auth/token", handlers.Login(cfg))
	}

	private := r.Group("/api/private")
	private.Use(middleware.Auth(cfg))
	{
		private.GET("/dashboard", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "dashboard coming soon"})
		})
	}

	if err := r.Run(":" + cfg.Port); err != nil {
		logger.L.Fatal("server failed", zap.Error(err))
	}
}

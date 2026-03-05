package config

import (
	"fmt"
	"os"
	"strings"

	"github.com/spf13/viper"
)

type Config struct {
	Env           string `mapstructure:"env"`
	Port          string `mapstructure:"port"`
	AllowedOrigin string `mapstructure:"allowed_origin"`
	JWTSecret     string `mapstructure:"jwt_secret"`
	AdminPassword string `mapstructure:"admin_password"`
	AnthropicKey  string `mapstructure:"anthropic_api_key"`
}

func Load() (*Config, error) {
	appEnv := os.Getenv("APP_ENV")
	if appEnv == "" {
		appEnv = "dev"
	}

	viper.SetConfigName(appEnv)
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./config")
	viper.AddConfigPath("/app/config")

	// Explicitly bind environment variables for secrets
	viper.BindEnv("jwt_secret", "JWT_SECRET")
	viper.BindEnv("admin_password", "ADMIN_PASSWORD")
	viper.BindEnv("anthropic_api_key", "ANTHROPIC_API_KEY")

	// Environment variables override config file values.
	// e.g. PORT overrides port
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		return nil, fmt.Errorf("failed to read config (%s.yaml): %w", appEnv, err)
	}

	var cfg Config
	if err := viper.Unmarshal(&cfg); err != nil {
		return nil, fmt.Errorf("failed to unmarshal config: %w", err)
	}

	return &cfg, nil
}

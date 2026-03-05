package logger

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

// L is the global logger. Call Init before using it.
var L *zap.Logger

// Init sets up the global logger. Dev mode uses a human-readable console
// format; production uses JSON for log aggregators.
func Init(env string) error {
	var cfg zap.Config

	if env == "production" {
		cfg = zap.NewProductionConfig()
	} else {
		cfg = zap.NewDevelopmentConfig()
		cfg.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	}

	var err error
	L, err = cfg.Build()
	return err
}

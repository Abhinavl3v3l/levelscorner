package store

import (
	"strings"
	"sync"
	"time"
)

const (
	OffTopicLimit       = 5
	SessionGapDuration  = 2 * time.Hour
)

type IPState struct {
	OffTopicCount int
	TotalMessages int
	LastSeen      time.Time
}

type chatLimitStore struct {
	mu    sync.Mutex
	state map[string]*IPState
}

// ChatLimits is the global singleton for per-IP rate limit state.
var ChatLimits = &chatLimitStore{
	state: make(map[string]*IPState),
}

// Check returns whether the given IP is blocked and the reason.
// Returns (blocked bool, reason string, offTopicCount int).
func (s *chatLimitStore) Check(ip string) (bool, string, int) {
	s.mu.Lock()
	defer s.mu.Unlock()

	st, ok := s.state[ip]
	if !ok {
		return false, "", 0
	}

	if st.OffTopicCount >= OffTopicLimit {
		return true, "off_topic_limit", st.OffTopicCount
	}

	if st.TotalMessages > 0 && time.Since(st.LastSeen) > SessionGapDuration {
		return true, "returning_visitor", st.OffTopicCount
	}

	return false, "", st.OffTopicCount
}

// RecordMessage increments the total message count and updates LastSeen.
func (s *chatLimitStore) RecordMessage(ip string) {
	s.mu.Lock()
	defer s.mu.Unlock()

	st := s.getOrCreate(ip)
	st.TotalMessages++
	st.LastSeen = time.Now()
}

// RecordOffTopic increments the off-topic count and returns the new value.
func (s *chatLimitStore) RecordOffTopic(ip string) int {
	s.mu.Lock()
	defer s.mu.Unlock()

	st := s.getOrCreate(ip)
	st.OffTopicCount++
	return st.OffTopicCount
}

func (s *chatLimitStore) getOrCreate(ip string) *IPState {
	st, ok := s.state[ip]
	if !ok {
		st = &IPState{}
		s.state[ip] = st
	}
	return st
}

// IsOffTopicResponse returns true when the response text is the canned off-topic refusal.
func IsOffTopicResponse(text string) bool {
	return strings.HasPrefix(strings.TrimSpace(text), "I'm focused on Abhinav's story")
}

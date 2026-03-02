package models

type Project struct {
	ID           int      `json:"id"`
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Technologies []string `json:"technologies"`
	GithubURL    string   `json:"github_url,omitempty"`
	LiveURL      string   `json:"live_url,omitempty"`
	Featured     bool     `json:"featured"`
}

type Experience struct {
	ID          int      `json:"id"`
	Company     string   `json:"company"`
	Role        string   `json:"role"`
	Period      string   `json:"period"`
	Location    string   `json:"location"`
	Description []string `json:"description"`
	Tags        []string `json:"tags"`
}

type Skill struct {
	Category string   `json:"category"`
	Items    []string `json:"items"`
}

type Post struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Slug        string `json:"slug"`
	Summary     string `json:"summary"`
	PublishedAt string `json:"published_at"`
	Category    string `json:"category"`
}

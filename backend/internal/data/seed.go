package data

import "github.com/levelscorner/levelscorner/backend/internal/models"

var Projects = []models.Project{}

var Experience = []models.Experience{
	{
		ID:       1,
		Company:  "Persistent Systems",
		Role:     "Lead Software Developer",
		Period:   "Oct 2024 – Present",
		Location: "Bengaluru, India",
		Description: []string{
			"Leading Go-based microservices for Vuclip's OTT platform — retail provisioning and subscription lifecycle at scale.",
			"Designed and implemented a Semi-Managed Subscription system automating deactivation, suspension, and resumption based on per-partner config.",
			"Drove migration of legacy Java subscription services to Go, improving performance and alignment with the team's Go-first strategy.",
			"Built CI/CD pipeline infrastructure for NewRelic; automated Docker image vulnerability scanning with Trivy.",
		},
		Tags: []string{"Go", "microservices", "REST APIs", "CI/CD", "AWS", "Docker"},
	},
	{
		ID:       2,
		Company:  "CSG",
		Role:     "Senior Software Development Engineer",
		Period:   "Dec 2023 – Oct 2024",
		Location: "Bengaluru, India",
		Description: []string{
			"Led design and development of Go microservices for scalable backend solutions.",
			"Designed and implemented a payment and reservations feature for the Charging System Orchestration (CSO) microservice, integrating multiple services through REST APIs.",
		},
		Tags: []string{"Go", "microservices", "REST APIs", "AWS"},
	},
	{
		ID:       3,
		Company:  "MachaniRobotics",
		Role:     "Software Developer – Robotics & AI",
		Period:   "Jan 2021 – Dec 2023",
		Location: "Bengaluru, India",
		Description: []string{
			"Migrated Genesis Engine from monolithic to a dockerized mono-repo architecture, significantly reducing production time.",
			"Engineered Gaia — a Go gateway microservice using gRPC, GraphQL, and Protocol Buffers, integrated with Nginx and Envoy for service orchestration.",
			"Built ApexDrive — a C++ microservice acting as a centralized limb driver for a humanoid robot, enabling precise animation control.",
			"Integrated ChatGPT APIs to build an interactive chatbot for the humanoid robot with TTS and STT capabilities.",
		},
		Tags: []string{"Go", "C++", "gRPC", "GraphQL", "Protobuf", "Envoy", "Docker", "microservices"},
	},
	{
		ID:       4,
		Company:  "Oracle",
		Role:     "Software Developer (System)",
		Period:   "Jul 2018 – Dec 2020",
		Location: "Bengaluru, India",
		Description: []string{
			"Developed features for the SIGTRAN SCCP Layer within the Virtual Signaling Transfer Protocol (vSTP).",
			"Implemented packet segmentation for large data transfers, improving transmission efficiency.",
			"Designed a Firewall Management Process to restrict connections to provisioned endpoints.",
			"Automated test suite creation with Python, improving coverage and code quality.",
		},
		Tags: []string{"C++", "Python", "systems programming"},
	},
}

var Skills = []models.Skill{
	{
		Category: "Primary",
		Items:    []string{"Go", "C++"},
	},
	{
		Category: "Backend",
		Items:    []string{"gRPC", "REST APIs", "GraphQL", "Protocol Buffers", "Gin"},
	},
	{
		Category: "Databases",
		Items:    []string{"PostgreSQL", "SQLC"},
	},
	{
		Category: "Infrastructure",
		Items:    []string{"Docker", "Nginx", "Envoy", "AWS", "CI/CD", "GitHub Actions"},
	},
	{
		Category: "Previously",
		Items:    []string{"Python", "Java", "JavaScript", "Bazel"},
	},
}

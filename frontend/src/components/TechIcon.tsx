import {
  SiGo,
  SiCplusplus,
  SiDocker,
  SiPostgresql,
  SiGraphql,
  SiNginx,
  SiPython,
  SiJavascript,
  SiGithub,
  SiLinkedin,
  SiNewrelic,
  SiBazel,
} from "react-icons/si";
// Note: SiJava does not exist in this version of react-icons/si — using monogram fallback below.
import type { IconType } from "react-icons";

type SIEntry = { type: "si"; Component: IconType; color: string };
type MonoEntry = { type: "mono"; label: string; color: string };
type IconEntry = SIEntry | MonoEntry;

const ICON_MAP: Record<string, IconEntry> = {
  // SI icons — safe imports
  Go:                 { type: "si", Component: SiGo,         color: "#00ADD8" },
  "C++":              { type: "si", Component: SiCplusplus,  color: "#00599C" },
  Docker:             { type: "si", Component: SiDocker,     color: "#2496ED" },
  PostgreSQL:         { type: "si", Component: SiPostgresql, color: "#4169E1" },
  GraphQL:            { type: "si", Component: SiGraphql,    color: "#E10098" },
  Nginx:              { type: "si", Component: SiNginx,      color: "#009639" },
  Python:             { type: "si", Component: SiPython,     color: "#3776AB" },
  JavaScript:         { type: "si", Component: SiJavascript, color: "#F7DF1E" },
  Java:               { type: "mono", label: "Jv",           color: "#007396" },
  GitHub:             { type: "si", Component: SiGithub,     color: "var(--text)" },
  "GitHub Enterprise":{ type: "si", Component: SiGithub,     color: "var(--text)" },
  LinkedIn:           { type: "si", Component: SiLinkedin,   color: "#0A66C2" },
  "New Relic":        { type: "si", Component: SiNewrelic,   color: "#1CE783" },
  NewRelic:           { type: "si", Component: SiNewrelic,   color: "#1CE783" },
  bazel:              { type: "si", Component: SiBazel,       color: "#43A047" },
  Bazel:              { type: "si", Component: SiBazel,       color: "#43A047" },

  // Monogram fallbacks — no SI entry or risky import
  AWS:                { type: "mono", label: "AW", color: "#FF9900" },
  "CI/CD":            { type: "mono", label: "CI", color: "#2088FF" },
  gRPC:               { type: "mono", label: "gR", color: "#00ADD8" },
  Gin:                { type: "mono", label: "Gi", color: "#00ADD8" },
  SQLC:               { type: "mono", label: "sq", color: "#4169E1" },
  "REST APIs":        { type: "mono", label: "RE", color: "var(--muted)" },
  "Protocol Buffers": { type: "mono", label: "pb", color: "#4285F4" },
  Protobuf:           { type: "mono", label: "pb", color: "#4285F4" },
  Envoy:              { type: "mono", label: "En", color: "#AC6199" },
  microservices:      { type: "mono", label: "μs", color: "var(--muted)" },
  "distributed systems": { type: "mono", label: "ds", color: "var(--muted)" },
  SIGTRAN:            { type: "mono", label: "SG", color: "var(--muted)" },
  "systems programming": { type: "mono", label: "sys", color: "var(--muted)" },
  "3G":               { type: "mono", label: "3G", color: "var(--muted)" },
};

interface Props {
  name: string;
  size?: number;
  colored?: boolean;
}

export function TechIcon({ name, size = 16, colored = true }: Props) {
  const entry = ICON_MAP[name];

  // Unknown → 2-char monogram
  if (!entry) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          fontSize: size * 0.5,
          fontFamily: "monospace",
          fontWeight: 700,
          color: colored ? "var(--muted)" : "currentColor",
          flexShrink: 0,
          lineHeight: 1,
        }}
      >
        {name.slice(0, 2)}
      </span>
    );
  }

  if (entry.type === "mono") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          fontSize: Math.max(7, size * 0.5),
          fontFamily: "monospace",
          fontWeight: 700,
          color: colored ? entry.color : "currentColor",
          flexShrink: 0,
          lineHeight: 1,
        }}
      >
        {entry.label}
      </span>
    );
  }

  // SI icon — GitHub always uses var(--text) to stay visible on dark bg
  const isGithub = name === "GitHub" || name === "GitHub Enterprise";
  const color = !colored
    ? "currentColor"
    : isGithub
    ? "var(--text)"
    : entry.color;

  const Icon = entry.Component;
  return <Icon size={size} color={color} style={{ flexShrink: 0 }} />;
}

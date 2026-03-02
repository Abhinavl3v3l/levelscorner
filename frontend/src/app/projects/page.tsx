import type { Metadata } from "next";
import { ComingSoonTerminal } from "@/components/ComingSoonTerminal";
import type { TerminalLine } from "@/components/ComingSoonTerminal";

export const metadata: Metadata = {
  title: "Projects | Abhinav Rana",
  description: "Projects by Abhinav Rana — backend engineering and open source.",
};

const lines: TerminalLine[] = [
  { text: "ls projects/", delay: 300 },
  { text: "initializing registry...", delay: 700 },
  { text: "SeeCV — Go + OpenAI resume parser", delay: 1200 },
  { text: "status: in development", delay: 1700 },
];

export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <p className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
        built
      </p>
      <h1
        className="font-display italic leading-none mb-6"
        style={{ fontSize: "clamp(3rem, 7vw, 5rem)", color: "var(--text)", letterSpacing: "-0.02em" }}
      >
        Projects
      </h1>
      <p className="mb-14 max-w-md text-lg" style={{ color: "var(--muted)" }}>
        Building in public. More projects on the way.
      </p>

      <ComingSoonTerminal lines={lines} title="projects — zsh" />

    </div>
  );
}

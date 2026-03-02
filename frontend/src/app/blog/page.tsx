import type { Metadata } from "next";
import { ComingSoonTerminal } from "@/components/ComingSoonTerminal";
import type { TerminalLine } from "@/components/ComingSoonTerminal";

export const metadata: Metadata = {
  title: "Blog | Abhinav Rana",
  description: "Technical writing on Go, distributed systems, and backend engineering.",
};

const lines: TerminalLine[] = [
  { text: "ls drafts/", delay: 300 },
  { text: "scanning posts...", delay: 700 },
  { text: "topics: go microservices, system design", delay: 1200 },
  { text: "first post: loading soon", delay: 1700 },
];

export default function Blog() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <p className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
        writing
      </p>
      <h1
        className="font-display italic leading-none mb-6"
        style={{ fontSize: "clamp(3rem, 7vw, 5rem)", color: "var(--text)", letterSpacing: "-0.02em" }}
      >
        Blog
      </h1>
      <p className="mb-14 max-w-md text-lg" style={{ color: "var(--muted)" }}>
        Technical writing on Go, distributed systems, and backend engineering.
      </p>

      <ComingSoonTerminal lines={lines} title="blog — zsh" />

    </div>
  );
}

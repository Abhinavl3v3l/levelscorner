"use client";

import { useEffect, useState } from "react";

export interface TerminalLine {
  text: string;
  delay: number;
}

interface Props {
  lines: TerminalLine[];
  title?: string;
}

export function ComingSoonTerminal({ lines, title = "terminal" }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= lines.length) return;
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, lines[visibleCount].delay);
    return () => clearTimeout(timer);
  }, [visibleCount, lines]);

  return (
    <div className="terminal-window max-w-xl">
      <div className="terminal-header">
        <span className="terminal-dot" style={{ backgroundColor: "#ff5f57" }} />
        <span className="terminal-dot" style={{ backgroundColor: "#ffbd2e" }} />
        <span className="terminal-dot" style={{ backgroundColor: "#28c840" }} />
        <span className="ml-3 font-mono text-xs" style={{ color: "var(--muted)" }}>
          {title}
        </span>
      </div>
      <div className="p-5 space-y-1.5 min-h-[9rem]">
        {lines.slice(0, visibleCount).map((line, i) => (
          <p key={i} className="font-mono text-sm leading-relaxed">
            <span style={{ color: "var(--accent)", userSelect: "none" }}>{">"} </span>
            <span style={{ color: "var(--text)" }}>{line.text}</span>
          </p>
        ))}
        <span
          className="font-mono text-sm animate-blink inline-block"
          style={{ color: "var(--accent)" }}
        >
          ▋
        </span>
      </div>
    </div>
  );
}

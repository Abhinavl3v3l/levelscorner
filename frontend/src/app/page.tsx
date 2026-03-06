import Link from "next/link";
import { LuUser, LuMail } from "react-icons/lu";
import { TechIcon } from "@/components/TechIcon";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const skills = [
  "Go", "C++", "gRPC", "REST APIs", "GraphQL", "Protocol Buffers",
  "PostgreSQL", "Docker", "Nginx", "Envoy", "AWS", "CI/CD",
  "microservices", "SQLC", "Gin", "distributed systems",
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 relative">

        {/* Ambient glow — dark mode only */}
        <div className="hero-ambient" />

        {/* Decorative dot grid — top right corner */}
        <div className="hero-dots">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="hero-dot"
              style={{ animationDelay: `${(i * 0.11) % 2.2}s` }}
            />
          ))}
        </div>

        <p
          className="font-mono text-sm tracking-widest uppercase mb-6 fade-up fade-up-1"
          style={{ color: "var(--accent)", position: "relative", zIndex: 1 }}
        >
          hi, i&apos;m
        </p>

        <h1
          className="font-display italic leading-none mb-8 fade-up fade-up-2"
          style={{
            fontSize: "clamp(5rem, 13vw, 11rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
            position: "relative",
            zIndex: 1,
          }}
        >
          Abhinav
          <br />
          Rana.
          <span className="animate-blink not-italic ml-2" style={{ color: "var(--accent)" }}>
            _
          </span>
        </h1>

        <p
          className="text-xl md:text-2xl max-w-xl leading-relaxed mb-8 fade-up fade-up-3"
          style={{ color: "var(--muted)", position: "relative", zIndex: 1 }}
        >
          From humanoid robots to OTT platforms —{" "}
          <span style={{ color: "var(--text)" }}>
            backend engineer with 8 years building systems in C++ and Go.
          </span>
          {" "}Currently leading microservices at Persistent Systems.
        </p>

        <div className="flex items-center gap-2.5 mb-10 fade-up fade-up-4" style={{ position: "relative", zIndex: 1 }}>
          <span className="status-dot" />
          <span className="font-mono text-sm" style={{ color: "var(--muted)" }}>
            Lead SDE · Persistent Systems · Bengaluru, India
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 fade-up fade-up-5" style={{ position: "relative", zIndex: 1 }}>
          <Link href="/about" className="btn-primary">
            View Work
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <a
            href="/resume.pdf"
            download="Abhinav_Rana_Resume.pdf"
            className="btn-ghost"
          >
            Download Resume
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
          <Link href="/contact" className="btn-text">
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────── */}
      <RevealOnScroll>
        <section
          className="py-5 flex flex-wrap items-center gap-x-10 gap-y-3 font-mono text-base"
          style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        >
          {[
            { value: "8+", label: "years exp" },
            { value: "4",  label: "companies" },
            { value: "Go", label: "primary lang" },
            { value: "Lead", label: "current level" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-2">
              {i > 0 && (
                <span className="hidden sm:block mr-6" style={{ color: "var(--border)" }}>·</span>
              )}
              <span className="font-semibold text-lg" style={{ color: "var(--text)" }}>{stat.value}</span>
              <span style={{ color: "var(--muted)" }}>{stat.label}</span>
            </div>
          ))}
        </section>
      </RevealOnScroll>

      {/* ── Skills marquee ───────────────────────────────── */}
      <section className="py-px overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="marquee-track">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-mono text-sm py-4 px-5 flex items-center gap-2"
              style={{ color: "var(--muted)" }}
            >
              <TechIcon name={skill} size={14} colored={true} />
              {skill}
              <span style={{ color: "var(--accent)", opacity: 0.35 }}>◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Section navigation ───────────────────────────── */}
      <RevealOnScroll>
        <section className="py-16 flex flex-col gap-[10px]">

          {/* About */}
          <Link href="/about" className="bento-card bento-about" style={{ minHeight: "260px" }}>
            <div className="flex items-center gap-2 mb-5">
              <LuUser size={14} style={{ color: "var(--card-accent)" }} />
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "var(--card-accent)", opacity: 0.65 }}
              >
                01
              </span>
            </div>
            <h2
              className="font-display italic mb-4"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                lineHeight: 1.05,
                color: "var(--text)",
                letterSpacing: "-0.02em",
              }}
            >
              About
            </h2>
            <p
              className="text-sm leading-relaxed mb-auto"
              style={{ color: "var(--muted)", maxWidth: "36ch" }}
            >
              The full story — systems programming, robotics, and Go microservices.
            </p>
            <div className="mt-6 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
              <span className="bento-arrow text-xs font-mono">→ read more</span>
            </div>
            <span className="bento-ghost-num" aria-hidden>01</span>
          </Link>

          {/* Contact */}
          <Link href="/contact" className="bento-card bento-card-contact">
            <div className="flex items-center gap-3">
              <LuMail size={16} style={{ color: "var(--card-accent)" }} />
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "var(--card-accent)", opacity: 0.65 }}
              >
                02
              </span>
              <h2
                className="font-display italic"
                style={{
                  fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
                  lineHeight: 1.1,
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                }}
              >
                Contact
              </h2>
            </div>
            <p className="text-sm hidden sm:block" style={{ color: "var(--muted)" }}>
              Let&apos;s connect.
            </p>
            <span className="bento-arrow text-xs font-mono">→ get in touch</span>
            <span className="bento-ghost-num" aria-hidden>02</span>
          </Link>

        </section>
      </RevealOnScroll>

    </div>
  );
}

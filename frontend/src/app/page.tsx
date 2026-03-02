import Link from "next/link";
import { LuUser, LuBook, LuMail, LuGitBranch } from "react-icons/lu";
import { TechIcon } from "@/components/TechIcon";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const sections = [
  {
    href: "/about",
    num: "01",
    title: "About",
    description: "The full story — systems programming, robotics, and Go microservices.",
    Icon: LuUser,
  },
  {
    href: "/projects",
    num: "02",
    title: "Projects",
    description: "What I've built and what's in the pipeline.",
    Icon: LuGitBranch,
  },
  {
    href: "/blog",
    num: "03",
    title: "Blog",
    description: "Technical writing on Go, distributed systems, and backend engineering.",
    Icon: LuBook,
  },
  {
    href: "/contact",
    num: "04",
    title: "Contact",
    description: "Let's connect.",
    Icon: LuMail,
  },
];

const skills = [
  "Go", "C++", "gRPC", "REST APIs", "GraphQL", "Protocol Buffers",
  "PostgreSQL", "Docker", "Nginx", "Envoy", "AWS", "CI/CD",
  "microservices", "SQLC", "Gin", "distributed systems",
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">

        <p
          className="font-mono text-sm tracking-widest uppercase mb-6 fade-up fade-up-1"
          style={{ color: "var(--accent)" }}
        >
          hi, i&apos;m
        </p>

        <h1
          className="font-display italic leading-none mb-8 fade-up fade-up-2"
          style={{
            fontSize: "clamp(5rem, 13vw, 9.5rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
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
          style={{ color: "var(--muted)" }}
        >
          From humanoid robots to OTT platforms —{" "}
          <span style={{ color: "var(--text)" }}>
            backend engineer with 8 years building systems in C++ and Go.
          </span>
          {" "}Currently leading microservices at Persistent Systems.
        </p>

        <div className="flex items-center gap-2.5 mb-10 fade-up fade-up-4">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span className="font-mono text-sm" style={{ color: "var(--muted)" }}>
            Lead SDE · Persistent Systems · Bengaluru, India
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 fade-up fade-up-5">
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
            { value: "4", label: "companies" },
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
      <section className="pb-24 pt-2">
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {sections.map((section, i) => (
            <RevealOnScroll key={section.href} delay={`${i * 0.08}s`}>
              <Link
                href={section.href}
                className="group section-row"
              >
                <span
                  className="font-mono text-xs w-7 flex-shrink-0"
                  style={{ color: "var(--accent)", opacity: 0.65 }}
                >
                  {section.num}
                </span>

                <section.Icon
                  size={16}
                  style={{ color: "var(--muted)", flexShrink: 0 }}
                />

                <span
                  className="text-lg font-medium flex-1 min-w-0"
                  style={{ color: "var(--text)" }}
                >
                  {section.title}
                </span>

                <span
                  className="text-base hidden md:block truncate max-w-xs"
                  style={{ color: "var(--muted)" }}
                >
                  {section.description}
                </span>

                <span className="section-arrow text-base font-mono">→</span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

    </div>
  );
}

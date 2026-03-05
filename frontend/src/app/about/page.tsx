import type { Metadata } from "next";
import { LuZap, LuBriefcase, LuGraduationCap } from "react-icons/lu";
import { TechIcon } from "@/components/TechIcon";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { experience, skills, education } from "@/data/resume";

export const metadata: Metadata = {
  title: "About | Abhinav Rana",
  description: "8 years of backend engineering across C++, robotics, and Go microservices.",
};

function SectionLabel({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="font-mono text-sm" style={{ color: "var(--accent)" }}>§</span>
      {Icon && <Icon size={16} style={{ color: "var(--muted)" }} />}
      <h2 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>{children}</h2>
      <div className="flex-1 h-px ml-2" style={{ backgroundColor: "var(--border)" }} />
    </div>
  );
}

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 page-about">

      {/* ── Bio ──────────────────────────────────────────── */}
      <section className="mb-20">
        <p className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
          the story
        </p>
        <h1
          className="font-display italic leading-none mb-10"
          style={{ fontSize: "clamp(3rem, 7vw, 5rem)", color: "var(--text)", letterSpacing: "-0.02em" }}
        >
          About
        </h1>
        <div className="space-y-5 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
          <p>
            I started in systems programming — C++, signal processing, the stuff that runs close to the wire.
            At Oracle, I worked on telecom infrastructure: 3G signaling protocols, firewall management, packet-level data handling.
          </p>
          <p>
            That low-level foundation carried into robotics. At MachaniRobotics, I built hardware stack for
            humanoid robots — a humanoid driver controlling physical movement, a Go gRPC gateway managing
            service communication to the robot via clients and APIs, and eventually a ChatGPT-powered robot chatbot.
          </p>
          <blockquote className="pull-quote">
            Building from scratch with hardware constraints teaches you to care about every byte.
          </blockquote>
          <p>
            From there, Go became my home. At CSG and then Persistent Systems, I moved into distributed
            backend systems at scale — payment orchestration, OTT subscription management, CI/CD pipelines.
            The throughline across all of it: understanding systems deeply enough to build them reliably.
          </p>
          <p className="font-medium" style={{ color: "var(--text)" }}>
            Currently Lead Software Developer at Persistent Systems, Bengaluru.
          </p>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────── */}
      <RevealOnScroll>
        <section className="mb-20">
          <SectionLabel icon={LuZap}>Skills</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((group) => (
              <div
                key={group.category}
                className="skill-card p-4 rounded-sm"
                style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
              >
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)", opacity: 0.7 }}>
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-sm font-mono rounded-sm flex items-center gap-1.5"
                      style={{
                        backgroundColor: "var(--bg)",
                        color: "var(--text)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <TechIcon name={item} size={13} colored />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* ── Experience ───────────────────────────────────── */}
      <RevealOnScroll>
        <section className="mb-20">
          <SectionLabel icon={LuBriefcase}>Experience</SectionLabel>
          <div className="space-y-14">
            {experience.map((job, i) => (
              <div key={i} className="relative pl-6" style={{ borderLeft: "2px solid var(--border)" }}>
                {/* Timeline dot — pulse on current job */}
                <div
                  className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2${i === 0 ? " timeline-dot-current" : ""}`}
                  style={{ backgroundColor: "var(--accent)", borderColor: "var(--bg)" }}
                />

                {/* Company header */}
                <div className="mb-5">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>
                    {job.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-medium text-base" style={{ color: "var(--accent)" }}>{job.company}</span>
                    <span className="font-mono text-xs" style={{ color: "var(--border)" }}>·</span>
                    <span className="font-mono text-sm" style={{ color: "var(--muted)" }}>{job.period}</span>
                    <span className="font-mono text-xs" style={{ color: "var(--border)" }}>·</span>
                    <span className="font-mono text-sm" style={{ color: "var(--muted)" }}>{job.location}</span>
                  </div>
                </div>

                {/* Client sections */}
                <div className="space-y-6">
                  {job.clients.map((client, j) => (
                    <div key={j}>
                      {client.name && (
                        <div className="flex items-center gap-3 mb-3">
                          <p className="text-base font-medium" style={{ color: "var(--text)" }}>
                            {client.name}
                          </p>
                          {client.period && (
                            <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                              {client.period}
                            </span>
                          )}
                        </div>
                      )}
                      <ul className="space-y-3">
                        {client.points.map((point, k) => (
                          <li key={k} className="text-base leading-relaxed flex gap-3" style={{ color: "var(--muted)" }}>
                            <span className="mt-1 flex-shrink-0 font-mono text-xs" style={{ color: "var(--accent)", opacity: 0.5 }}>–</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono rounded-sm flex items-center gap-1"
                      style={{
                        backgroundColor: "var(--accent-dim)",
                        color: "var(--accent)",
                        border: "1px solid transparent",
                      }}
                    >
                      <TechIcon name={tag} size={10} colored />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* ── Education ────────────────────────────────────── */}
      <RevealOnScroll>
        <section>
          <SectionLabel icon={LuGraduationCap}>Education</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {education.map((edu, i) => (
              <div
                key={i}
                className="p-4 rounded-sm"
                style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
              >
                <p className="text-base font-semibold mb-1" style={{ color: "var(--text)" }}>{edu.degree}</p>
                <p className="text-base mb-3" style={{ color: "var(--accent)" }}>{edu.institution}</p>
                <div className="flex items-center justify-between font-mono text-xs" style={{ color: "var(--muted)" }}>
                  <span>{edu.period}</span>
                  <span>CGPA {edu.cgpa}</span>
                </div>
                <p className="font-mono text-xs mt-1" style={{ color: "var(--muted)", opacity: 0.6 }}>
                  {edu.location}
                </p>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

    </div>
  );
}

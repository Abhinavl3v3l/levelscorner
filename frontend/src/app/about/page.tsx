import type { Metadata } from "next";
import { LuZap, LuBriefcase, LuGraduationCap } from "react-icons/lu";
import { TechIcon } from "@/components/TechIcon";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "About | Abhinav Rana",
  description: "8 years of backend engineering across C++, robotics, and Go microservices.",
};

const experience = [
  {
    company: "Persistent Systems",
    role: "Lead Software Developer",
    period: "Oct 2024 – Present",
    location: "Bengaluru, India",
    clients: [
      {
        name: "Vuclip (OTT Platform)",
        period: "Mar 2025 – Present",
        points: [
          "Own multiple Go-based microservices handling retail provisioning and subscription lifecycle management at scale for Vuclip's B2B OTT platform.",
          "Designed and implemented a Semi-Managed Subscription system — automates deactivation, suspension, and resumption of subscriptions based on per-partner business config, reducing manual intervention across Vuclip's client base.",
          "Extended retail provisioning APIs to support full activation/deactivation/resumption flows, enabling partners to seamlessly manage end-user subscriptions.",
          "Drove migration of legacy Java subscription services to Go — improved performance, reduced complexity, and aligned with the team's Go-first microservice strategy.",
          "Led end-to-end testing across staging and QA; coordinated production rollout of semi-managed subscriptions with zero critical post-release incidents.",
          "Proactively identified and resolved security vulnerabilities across multiple repositories as part of a vulnerability remediation initiative.",
        ],
      },
      {
        name: "NewRelic (Developer Platform)",
        period: "Nov 2024 – Feb 2025",
        points: [
          "Built CI/CD pipeline infrastructure for the NewRelic product suite.",
          "Implemented an automated system to scan and rebuild Docker images using Trivy, reducing manual intervention in vulnerability management and improving deployment pipeline security.",
        ],
      },
    ],
    tags: ["Go", "microservices", "REST APIs", "CI/CD", "AWS", "Docker", "GitHub Enterprise"],
  },
  {
    company: "CSG",
    role: "Senior Software Development Engineer",
    period: "Dec 2023 – Oct 2024",
    location: "Bengaluru, India",
    clients: [
      {
        name: "",
        period: "",
        points: [
          "Led design and development of Go microservices for scalable backend solutions across the CSG product suite.",
          "Designed and implemented payment and reservations for the Charging System Orchestration (CSO) microservice — integrated multiple repositories and services through REST APIs, coordinating across the full payment and reservation lifecycle.",
          "Ensured seamless communication, scalability, and reliability across payment flows serving telecom billing infrastructure.",
        ],
      },
    ],
    tags: ["Go", "microservices", "REST APIs", "AWS"],
  },
  {
    company: "MachaniRobotics",
    role: "Software Developer – Robotics & AI",
    period: "Jan 2021 – Dec 2023",
    location: "Bengaluru, India",
    clients: [
      {
        name: "Genesis Engine",
        period: "",
        points: [
          "Orchestrated the shift from a monolithic to a dockerized mono-repo architecture in Genesis (the core engine), leveraging Docker and CI/CD — significantly reducing production time and improving micro-service efficiency.",
          "Engineered Gaia — a Go gateway microservice using gRPC, GraphQL, and Protocol Buffers for streamlined authentication and request routing. Integrated Nginx and Envoy Gateway as reverse proxies, enabling precise control and efficient orchestration across all Genesis microservices.",
          "Built ApexDrive — a C++ microservice acting as a centralized Limb Driver for a humanoid robot, controlling all limbs within the hardware stack. Enabled lifelike motion dynamics and precise animation, significantly advancing the robot's physical interaction capabilities.",
          "Built Portail — a GraphQL API gateway microservice to streamline request delegation, improving system performance and operational scalability.",
          "Enhanced the Facial Recognition perception pipeline — managed embeddings and image augmentations, improving recognition accuracy in challenging environments.",
          "Integrated ChatGPT APIs to build an interactive chatbot for the humanoid robot with TTS and STT capabilities, enabling natural human–robot communication.",
        ],
      },
    ],
    tags: ["Go", "C++", "gRPC", "GraphQL", "Protobuf", "Envoy", "Nginx", "Docker", "bazel"],
  },
  {
    company: "Oracle",
    role: "Software Developer (System)",
    period: "Jul 2018 – Dec 2020",
    location: "Bengaluru, India",
    clients: [
      {
        name: "vSTP – Virtual Signaling Transfer Point",
        period: "",
        points: [
          "Developed key features for the SIGTRAN SCCP Layer within the vSTP, improving protocol efficacy and communications reliability within 3G network infrastructure.",
          "Implemented a packet segmentation mechanism for large data loads — significantly improved transmission efficiency and reduced transmission errors across the signaling network.",
          "Designed a Firewall Management Process to allow only provisioned connections, enhancing system security and minimizing unauthorized access risks.",
          "Automated test suite creation with Python, improving code coverage and contributing to higher code quality across the vSTP codebase.",
        ],
      },
    ],
    tags: ["C++", "Python", "SIGTRAN", "systems programming", "3G"],
  },
];

const skills = [
  { category: "Primary", items: ["Go", "C++"] },
  { category: "Backend", items: ["gRPC", "REST APIs", "GraphQL", "Protocol Buffers", "Gin"] },
  { category: "Databases", items: ["PostgreSQL", "SQLC"] },
  { category: "Infrastructure", items: ["Docker", "Nginx", "Envoy", "AWS", "CI/CD"] },
  { category: "Previously", items: ["Python", "Java", "JavaScript", "Bazel"] },
];

const education = [
  {
    degree: "M.Sc Computer Science",
    institution: "Amrita University",
    period: "2016 – 2018",
    location: "Coimbatore, TN",
    cgpa: "8.0",
  },
  {
    degree: "Diploma in Java",
    institution: "NIIT",
    period: "2013 – 2014",
    location: "Bengaluru, KA",
    cgpa: "7.0",
  },
  {
    degree: "B.E Electrical & Electronics",
    institution: "Vinayaka University",
    period: "2009 – 2013",
    location: "Salem, TN",
    cgpa: "6.5",
  },
];

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
    <div className="max-w-5xl mx-auto px-6 py-16">

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
            service communication to the robot via clients and APIs, and eventually a ChatGPT-powered robot chatbot. Building
            from scratch with hardware constraints teaches you to care about every byte.
          </p>
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

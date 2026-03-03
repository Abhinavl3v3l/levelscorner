import type { Metadata } from "next";
import { LuMail } from "react-icons/lu";
import { SiLinkedin, SiGithub } from "react-icons/si";
import type { IconType } from "react-icons";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Contact | Abhinav Rana",
  description: "Get in touch with Abhinav Rana — backend engineer.",
};

const links: {
  label: string;
  value: string;
  href: string;
  description: string;
  num: string;
  Icon: IconType;
  iconColor: string;
}[] = [
  {
    label: "Email",
    value: "rabhinavcs@gmail.com",
    href: "mailto:rabhinavcs@gmail.com",
    description: "Best way to reach me directly.",
    num: "01",
    Icon: LuMail,
    iconColor: "var(--muted)",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/abhinavrl4f",
    href: "https://linkedin.com/in/abhinavrl4f",
    description: "Professional network and updates.",
    num: "02",
    Icon: SiLinkedin,
    iconColor: "#0A66C2",
  },
  {
    label: "GitHub",
    value: "github.com/levelscorner",
    href: "https://github.com/levelscorner",
    description: "Code, projects, and experiments.",
    num: "03",
    Icon: SiGithub,
    iconColor: "var(--text)",
  },
];

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <p className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
        reach out
      </p>
      <h1
        className="font-display italic leading-none mb-6"
        style={{ fontSize: "clamp(3rem, 7vw, 5rem)", color: "var(--text)", letterSpacing: "-0.02em" }}
      >
        Contact
      </h1>
      <p className="mb-14 max-w-md text-lg" style={{ color: "var(--muted)" }}>
        Open to interesting conversations — engineering, consulting, or just talking backend systems.
      </p>

      <RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="contact-card group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <link.Icon size={14} style={{ color: link.iconColor }} />
                  <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                    {link.label}
                  </p>
                </div>
                <span className="font-mono text-[10px]" style={{ color: "var(--accent)", opacity: 0.5 }}>
                  {link.num}
                </span>
              </div>
              <p className="text-base font-medium mb-2 break-all" style={{ color: "var(--text)" }}>
                {link.value}
              </p>
              <p className="text-sm" style={{ color: "var(--muted)", opacity: 0.7 }}>{link.description}</p>
            </a>
          ))}
        </div>
      </RevealOnScroll>

    </div>
  );
}

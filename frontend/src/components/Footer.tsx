import { SiLinkedin, SiGithub } from "react-icons/si";
import { LuMail } from "react-icons/lu";
import type { IconType } from "react-icons";

const footerLinks: { label: string; href: string; Icon: IconType }[] = [
  { label: "linkedin", href: "https://linkedin.com/in/abhinavrl4f", Icon: SiLinkedin },
  { label: "github",   href: "https://github.com/levelscorner",    Icon: SiGithub   },
  { label: "email",    href: "mailto:rabhinavcs@gmail.com",         Icon: LuMail     },
];

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div
        className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between text-xs font-mono"
        style={{ color: "var(--muted)" }}
      >
        <span>© {new Date().getFullYear()} Abhinav Rana</span>
        <div className="flex items-center gap-5">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="footer-link flex items-center gap-1.5"
            >
              <link.Icon size={12} />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

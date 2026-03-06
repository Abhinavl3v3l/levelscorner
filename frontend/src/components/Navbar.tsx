"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/about", label: "About", num: "01" },
  { href: "/contact", label: "Contact", num: "02" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md nav-header"
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--nav-bg)",
      }}
    >
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight transition-opacity hover:opacity-70"
          style={{ color: "var(--text)" }}
        >
          levelscorner
        </Link>

        <div className="flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono transition-all"
                style={{
                  color: isActive ? "var(--accent)" : "var(--muted)",
                  backgroundColor: isActive ? "var(--accent-dim)" : "transparent",
                }}
              >
                <span
                  className="text-[10px]"
                  style={{ color: "var(--accent)", opacity: isActive ? 1 : 0.5 }}
                >
                  {link.num}
                </span>
                {link.label}
              </Link>
            );
          })}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

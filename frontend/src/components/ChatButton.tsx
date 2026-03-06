"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuTerminal } from "react-icons/lu";

export function ChatButton() {
    const pathname = usePathname();
    if (pathname === "/dashboard") return null;

    return (
        <Link
            href="/dashboard"
            aria-label="Chat with Abhinav's AI"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full font-mono text-sm group chat-fab"
        >
            <LuTerminal size={14} className="shrink-0" />
            <span className="hidden sm:inline">Ask the AI</span>
            <span className="sm:hidden">AI</span>
        </Link>
    );
}

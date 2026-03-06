"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { LuTerminal, LuSend, LuX } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { experience, skills, education } from "@/data/resume";

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = { role: "user" | "assistant"; content: string };
type BlockedState = { blocked: boolean; reason: string };

// ─── Constants ────────────────────────────────────────────────────────────────

const QUICK_PROMPTS = [
    "How did he go from C++ to Go?",
    "What did he build at MachaniRobotics?",
    "Is he open to new roles?",
    "What's his current stack?",
];

const INITIAL_MESSAGE: Message = {
    role: "assistant",
    content: "Hey — I'm minion, Abhinav's AI. Ask me anything about his career, what he's built, or whether he's open to new work.",
};

// ─── Hook: detect mobile breakpoint ──────────────────────────────────────────

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);
    return isMobile;
}

// ─── Hook: all chat state + logic ────────────────────────────────────────────

function useChatSession() {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [offTopicCount, setOffTopicCount] = useState(0);
    const [blocked, setBlocked] = useState<BlockedState>({ blocked: false, reason: "" });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Restore state from server on mount
    useEffect(() => {
        fetch("/api/chat/status")
            .then((r) => r.json())
            .then((d) => {
                setOffTopicCount(d.off_topic_count ?? 0);
                if (d.blocked) setBlocked({ blocked: true, reason: d.reason ?? "" });
            })
            .catch(() => {});
    }, []);

    // Scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isLoading || blocked.blocked) return;

        const userMsg: Message = { role: "user", content: text };
        setMessages((prev) => [...prev, userMsg, { role: "assistant", content: "" }]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: (() => {
                        const idx = messages.findIndex((m) => m.role === "user");
                        const history = idx === -1 ? [] : messages.slice(idx);
                        return [...history, userMsg];
                    })(),
                    context: JSON.stringify({ experience, skills, education }),
                }),
            });

            if (response.status === 403) {
                const data = await response.json();
                setBlocked({ blocked: true, reason: data.reason ?? "off_topic_limit" });
                setMessages((prev) => prev.slice(0, -1));
                return;
            }
            if (!response.ok) throw new Error("Server error");

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            if (!reader) throw new Error("No reader");

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });

                for (const line of chunk.split("\n\n")) {
                    if (!line.startsWith("data: ")) continue;
                    const data = line.slice(6);
                    if (data === "[DONE]") break;

                    if (data.startsWith("[STATUS:")) {
                        try {
                            const s = JSON.parse(data.slice(8, -1));
                            setOffTopicCount(s.off_topic_count ?? 0);
                            if (s.blocked) setBlocked({ blocked: true, reason: "off_topic_limit" });
                        } catch {}
                        continue;
                    }

                    setMessages((prev) => {
                        const next = [...prev];
                        next[next.length - 1] = {
                            ...next[next.length - 1],
                            content: next[next.length - 1].content + data,
                        };
                        return next;
                    });
                }
            }
        } catch {
            setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { ...next[next.length - 1], content: "Connection error — please try again." };
                return next;
            });
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, blocked, messages]);

    return { messages, input, setInput, isLoading, offTopicCount, blocked, sendMessage, messagesEndRef, inputRef };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();
    const chat = useChatSession();

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    // Focus input when panel opens
    useEffect(() => {
        if (isOpen) setTimeout(() => chat.inputRef.current?.focus(), 300);
    }, [isOpen, chat.inputRef]);

    // Responsive panel config
    const panelStyle = isMobile
        ? { bottom: 0, left: 0, right: 0, height: "82dvh", borderRadius: "16px 16px 0 0" }
        : { top: "3.5rem", right: 0, bottom: 0, width: "40vw", minWidth: "380px" };

    const panelAnimation = isMobile
        ? { initial: { y: "100%", opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: "100%", opacity: 0 } }
        : { initial: { x: "100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "100%", opacity: 0 } };

    const offTopicRemaining = Math.max(0, 5 - chat.offTopicCount);

    return (
        <>
            {/* Trigger button */}
            <button
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Open minion AI chat"
                className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-sm chat-fab"
            >
                <LuTerminal size={14} className="shrink-0" />
                <span className="hidden sm:inline">minion</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40"
                            style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Panel */}
                        <motion.div
                            key="panel"
                            {...panelAnimation}
                            transition={{ type: "spring", stiffness: 320, damping: 32 }}
                            className="fixed z-50 flex flex-col"
                            style={{
                                ...panelStyle,
                                backgroundColor: "rgba(6,6,12,0.98)",
                                borderLeft: isMobile ? "none" : "1px solid rgba(114,217,160,0.15)",
                                borderTop: isMobile ? "1px solid rgba(114,217,160,0.15)" : "none",
                                backdropFilter: "blur(24px)",
                                boxShadow: isMobile
                                    ? "0 -8px 48px rgba(0,0,0,0.5)"
                                    : "-8px 0 48px rgba(0,0,0,0.5)",
                            }}
                        >
                            {/* Title bar */}
                            <div className="flex items-center justify-between px-5 py-3 shrink-0"
                                style={{ borderBottom: "1px solid rgba(114,217,160,0.08)" }}>
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <button onClick={() => setIsOpen(false)}
                                            className="w-3 h-3 rounded-full hover:opacity-75 transition-opacity"
                                            style={{ backgroundColor: "#ff5f57" }} />
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <LuTerminal size={11} style={{ color: "var(--accent)", opacity: 0.55 }} />
                                        <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.28)" }}>
                                            minion
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {chat.offTopicCount >= 3 && !chat.blocked.blocked && (
                                        <span className="text-xs font-mono px-2 py-0.5 rounded"
                                            style={{ backgroundColor: "rgba(254,188,46,0.07)", border: "1px solid rgba(254,188,46,0.18)", color: "#febc2e" }}>
                                            ⚠ {offTopicRemaining} left
                                        </span>
                                    )}
                                    <span className="status-dot" />
                                    <button onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center w-6 h-6 rounded transition-colors"
                                        style={{ color: "rgba(255,255,255,0.22)" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}>
                                        <LuX size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Quick prompt chips */}
                            <div className="flex gap-2 px-4 py-2.5 overflow-x-auto shrink-0 no-scrollbar"
                                style={{ borderBottom: "1px solid rgba(114,217,160,0.06)" }}>
                                {QUICK_PROMPTS.map((p) => (
                                    <button key={p}
                                        onClick={() => chat.sendMessage(p)}
                                        disabled={chat.isLoading || chat.blocked.blocked}
                                        className="shrink-0 text-xs font-mono px-3 py-1.5 rounded-full whitespace-nowrap transition-all disabled:opacity-30"
                                        style={{ backgroundColor: "rgba(114,217,160,0.05)", border: "1px solid rgba(114,217,160,0.12)", color: "rgba(114,217,160,0.65)" }}
                                        onMouseEnter={(e) => { const el = e.currentTarget; el.style.backgroundColor = "rgba(114,217,160,0.1)"; el.style.borderColor = "rgba(114,217,160,0.25)"; el.style.color = "rgba(114,217,160,0.9)"; }}
                                        onMouseLeave={(e) => { const el = e.currentTarget; el.style.backgroundColor = "rgba(114,217,160,0.05)"; el.style.borderColor = "rgba(114,217,160,0.12)"; el.style.color = "rgba(114,217,160,0.65)"; }}>
                                        {p}
                                    </button>
                                ))}
                            </div>

                            {chat.blocked.blocked ? (
                                /* Blocked screen */
                                <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-5">
                                    <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgba(114,217,160,0.3)" }}>session ended</p>
                                    <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(242,242,252,0.65)", fontFamily: "var(--font-sans)" }}>
                                        {chat.blocked.reason === "returning_visitor"
                                            ? "Welcome back — check out Abhinav's full story or get in touch directly."
                                            : "You've reached the off-topic limit. Minion only covers Abhinav's career."}
                                    </p>
                                    <div className="flex gap-3">
                                        {[{ href: "/about", label: "About →", primary: true }, { href: "/contact", label: "Contact →", primary: false }].map(({ href, label, primary }) => (
                                            <a key={href} href={href}
                                                className="text-xs font-mono px-4 py-2 rounded-lg transition-opacity hover:opacity-75"
                                                style={{
                                                    backgroundColor: primary ? "rgba(114,217,160,0.08)" : "rgba(114,217,160,0.04)",
                                                    border: `1px solid rgba(114,217,160,${primary ? "0.2" : "0.1"})`,
                                                    color: primary ? "var(--accent)" : "rgba(114,217,160,0.5)",
                                                }}>
                                                {label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                                        <AnimatePresence initial={false}>
                                            {chat.messages.map((msg, i) => (
                                                <motion.div key={i}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.14 }}>
                                                    {msg.role === "assistant" ? (
                                                        <div className="flex gap-2.5 items-start">
                                                            <span className="text-xs font-mono shrink-0 mt-px select-none"
                                                                style={{ color: "var(--accent)", opacity: 0.45 }}>ai&gt;</span>
                                                            <div className="text-sm leading-relaxed" style={{ color: "#c8c8dc", fontFamily: "var(--font-sans)" }}>
                                                                {chat.isLoading && i === chat.messages.length - 1 && msg.content === "" ? (
                                                                    <span className="inline-flex gap-1 items-center">
                                                                        {[0, 150, 300].map((d) => (
                                                                            <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                                                                                style={{ backgroundColor: "var(--accent)", animationDelay: `${d}ms` }} />
                                                                        ))}
                                                                    </span>
                                                                ) : (
                                                                    <ReactMarkdown components={{
                                                                        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                                                                        strong: ({ children }) => <strong className="font-semibold" style={{ color: "#e8e8f8" }}>{children}</strong>,
                                                                        ul: ({ children }) => <ul className="mt-1 mb-2 space-y-1 pl-4 list-disc">{children}</ul>,
                                                                        ol: ({ children }) => <ol className="mt-1 mb-2 space-y-1 pl-4 list-decimal">{children}</ol>,
                                                                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                                                        a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline", textDecorationColor: "rgba(114,217,160,0.35)" }}>{children}</a>,
                                                                        code: ({ children }) => <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ backgroundColor: "rgba(114,217,160,0.07)", color: "var(--accent)" }}>{children}</code>,
                                                                    }}>
                                                                        {msg.content}
                                                                    </ReactMarkdown>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-end">
                                                            <p className="text-sm leading-relaxed px-4 py-2.5 rounded-xl rounded-tr-sm max-w-[85%]"
                                                                style={{ color: "#e8e8f0", backgroundColor: "rgba(114,217,160,0.06)", border: "1px solid rgba(114,217,160,0.1)", fontFamily: "var(--font-sans)" }}>
                                                                {msg.content}
                                                            </p>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        <div ref={chat.messagesEndRef} />
                                    </div>

                                    {/* Input */}
                                    <div className="shrink-0 px-5 py-4" style={{ borderTop: "1px solid rgba(114,217,160,0.07)" }}>
                                        <form onSubmit={(e) => { e.preventDefault(); chat.sendMessage(chat.input); }}
                                            className="flex items-center gap-3">
                                            <span className="text-sm font-mono shrink-0 select-none" style={{ color: "var(--accent)" }}>$</span>
                                            <input
                                                ref={chat.inputRef}
                                                type="text"
                                                value={chat.input}
                                                onChange={(e) => chat.setInput(e.target.value)}
                                                placeholder="ask minion anything..."
                                                disabled={chat.isLoading}
                                                className="flex-1 bg-transparent border-none outline-none text-sm font-mono disabled:opacity-40"
                                                style={{ color: "#e8e8f0", caretColor: "var(--accent)" }}
                                            />
                                            <button type="submit"
                                                disabled={chat.isLoading || !chat.input.trim()}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all disabled:opacity-20"
                                                style={{ backgroundColor: "rgba(114,217,160,0.08)", border: "1px solid rgba(114,217,160,0.18)", color: "var(--accent)" }}>
                                                <LuSend size={10} />
                                                send
                                            </button>
                                        </form>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { LuTerminal, LuSend } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { experience, skills, education } from "@/data/resume";

type Message = {
    role: "user" | "assistant";
    content: string;
};

type BlockedState = {
    blocked: boolean;
    reason: string;
};

export function TerminalChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hey — I'm Abhinav's AI. Ask me anything about his career, what he's built, or whether he's open to new work.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [offTopicCount, setOffTopicCount] = useState(0);
    const [blockedState, setBlockedState] = useState<BlockedState>({ blocked: false, reason: "" });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    // On mount: fetch status to restore state for returning visitors
    useEffect(() => {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "/api";
        fetch(`${apiBase}/chat/status`)
            .then((r) => r.json())
            .then((data) => {
                setOffTopicCount(data.off_topic_count ?? 0);
                if (data.blocked) {
                    setBlockedState({ blocked: true, reason: data.reason ?? "" });
                }
            })
            .catch(() => {/* ignore — non-critical */});
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
    }, [isOpen]);

    // Close on click outside
    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, handleClickOutside]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading || blockedState.blocked) return;

        const userMsg: Message = { role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

            const dynamicContext = JSON.stringify({ experience, skills, education });
            const apiBase = process.env.NEXT_PUBLIC_API_URL || "/api";

            const response = await fetch(`${apiBase}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: (() => {
                        const firstUserIdx = messages.findIndex(m => m.role === "user");
                        const history = firstUserIdx === -1 ? [] : messages.slice(firstUserIdx);
                        return [...history, userMsg];
                    })(),
                    context: dynamicContext,
                }),
            });

            if (response.status === 403) {
                const data = await response.json();
                setBlockedState({ blocked: true, reason: data.reason ?? "off_topic_limit" });
                // Remove the empty assistant placeholder
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
                            const status = JSON.parse(data.slice(8, -1));
                            setOffTopicCount(status.off_topic_count ?? 0);
                            if (status.blocked) {
                                setBlockedState({ blocked: true, reason: "off_topic_limit" });
                            }
                        } catch { /* ignore malformed STATUS */ }
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
                next[next.length - 1] = { ...next[next.length - 1], content: "Connection error. Please try again." };
                return next;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const offTopicRemaining = Math.max(0, 5 - offTopicCount);

    return (
        <>
            {/* ── Bottom bar launcher ─────────────────────────── */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed bottom-0 left-0 w-full sm:left-1/2 sm:-translate-x-1/2 sm:w-[80vw] sm:max-w-[1100px] z-50"
                    >
                        <button
                            onClick={() => setIsOpen(true)}
                            className="w-full flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors"
                            style={{
                                backgroundColor: "rgba(8, 8, 16, 0.92)",
                                borderTop: "1px solid rgba(114,217,160,0.2)",
                                borderLeft: "1px solid rgba(255,255,255,0.06)",
                                borderRight: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "12px 12px 0 0",
                                backdropFilter: "blur(16px)",
                                boxShadow: "0 -4px 32px rgba(114,217,160,0.05), 0 -1px 0 rgba(114,217,160,0.15)",
                            }}
                        >
                            <LuTerminal size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                            <span
                                className="text-sm font-mono"
                                style={{ color: "var(--accent)" }}
                            >
                                abhinav@ai:~$
                            </span>
                            <span
                                className="text-sm font-mono flex-1 text-left"
                                style={{ color: "rgba(255,255,255,0.35)" }}
                            >
                                ask me anything about Abhinav&apos;s career...
                            </span>
                            <span
                                className="text-xs font-mono px-2 py-0.5 rounded"
                                style={{
                                    backgroundColor: "rgba(114,217,160,0.08)",
                                    border: "1px solid rgba(114,217,160,0.2)",
                                    color: "var(--accent)",
                                }}
                            >
                                click to open
                            </span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Terminal panel ──────────────────────────────── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={panelRef}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-0 left-0 w-full sm:left-1/2 sm:-translate-x-1/2 sm:w-[80vw] sm:max-w-[1100px] h-[75vh] sm:h-[60vh] z-50 flex flex-col"
                        style={{
                            minHeight: "360px",
                            backgroundColor: "rgba(6, 6, 12, 0.97)",
                            borderTop: "1px solid rgba(114,217,160,0.25)",
                            borderLeft: "1px solid rgba(255,255,255,0.07)",
                            borderRight: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: "14px 14px 0 0",
                            backdropFilter: "blur(24px)",
                            boxShadow: "0 -8px 48px rgba(114,217,160,0.06), 0 -24px 80px rgba(0,0,0,0.5)",
                        }}
                    >
                        {/* ── Title bar ── */}
                        <div
                            className="flex items-center justify-between px-5 py-3 shrink-0"
                            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-3 h-3 rounded-full transition-opacity hover:opacity-75"
                                        style={{ backgroundColor: "#ff5f57" }}
                                    />
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
                                </div>
                                <span
                                    className="text-xs font-mono"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    abhinav-ai — levelscorner.com
                                </span>
                                {offTopicCount >= 3 && !blockedState.blocked && (
                                    <span
                                        className="text-xs font-mono px-2 py-0.5 rounded"
                                        style={{
                                            backgroundColor: "rgba(254,188,46,0.08)",
                                            border: "1px solid rgba(254,188,46,0.25)",
                                            color: "#febc2e",
                                        }}
                                    >
                                        ⚠ {offTopicRemaining} off-topic left
                                    </span>
                                )}
                            </div>
                            <span
                                className="hidden sm:block text-xs font-mono"
                                style={{ color: "rgba(255,255,255,0.2)" }}
                            >
                                press esc or click outside to close
                            </span>
                        </div>

                        {blockedState.blocked ? (
                            /* ── Blocked screen ── */
                            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
                                <div
                                    className="text-sm font-mono leading-relaxed"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    {blockedState.reason === "returning_visitor" ? (
                                        <>
                                            <p className="mb-3" style={{ color: "#e8e8f0" }}>Welcome back!</p>
                                            <p>Check out Abhinav&apos;s full story or get in touch directly.</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="mb-3" style={{ color: "#e8e8f0" }}>You&apos;ve reached the off-topic limit.</p>
                                            <p>The AI only covers Abhinav&apos;s career and background.</p>
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-3 mt-2">
                                    <a
                                        href="/about"
                                        className="text-xs font-mono px-4 py-2 rounded-lg transition-opacity hover:opacity-75"
                                        style={{
                                            backgroundColor: "rgba(114,217,160,0.1)",
                                            border: "1px solid rgba(114,217,160,0.25)",
                                            color: "var(--accent)",
                                        }}
                                    >
                                        About page →
                                    </a>
                                    <a
                                        href="/contact"
                                        className="text-xs font-mono px-4 py-2 rounded-lg transition-opacity hover:opacity-75"
                                        style={{
                                            backgroundColor: "rgba(114,217,160,0.06)",
                                            border: "1px solid rgba(114,217,160,0.15)",
                                            color: "rgba(114,217,160,0.7)",
                                        }}
                                    >
                                        Contact page →
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* ── Messages ── */}
                                <div
                                    className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.16 }}
                                        >
                                            {msg.role === "assistant" ? (
                                                <div className="flex gap-3 items-start">
                                                    <span
                                                        className="text-xs font-mono shrink-0 mt-0.5 select-none"
                                                        style={{ color: "var(--accent)", opacity: 0.7 }}
                                                    >
                                                        ai&gt;
                                                    </span>
                                                    <div
                                                        className="text-sm leading-relaxed"
                                                        style={{ color: "#c8c8dc" }}
                                                    >
                                                        {isLoading && i === messages.length - 1 && msg.content === "" ? (
                                                            <span className="inline-flex gap-1 items-center">
                                                                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--accent)", animationDelay: "0ms" }} />
                                                                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--accent)", animationDelay: "150ms" }} />
                                                                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--accent)", animationDelay: "300ms" }} />
                                                            </span>
                                                        ) : (
                                                            <ReactMarkdown
                                                                components={{
                                                                    p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                                                                    strong: ({ children }) => <strong className="font-semibold" style={{ color: "#e8e8f8" }}>{children}</strong>,
                                                                    ul: ({ children }) => <ul className="mt-1 mb-2 space-y-1 pl-4 list-disc">{children}</ul>,
                                                                    ol: ({ children }) => <ol className="mt-1 mb-2 space-y-1 pl-4 list-decimal">{children}</ol>,
                                                                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                                                    a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline", textDecorationColor: "rgba(114,217,160,0.4)" }}>{children}</a>,
                                                                    code: ({ children }) => <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ backgroundColor: "rgba(114,217,160,0.08)", color: "var(--accent)" }}>{children}</code>,
                                                                }}
                                                            >
                                                                {msg.content}
                                                            </ReactMarkdown>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex gap-3 items-start">
                                                    <span
                                                        className="text-xs font-mono shrink-0 mt-0.5 select-none"
                                                        style={{ color: "rgba(255,255,255,0.4)" }}
                                                    >
                                                        you&gt;
                                                    </span>
                                                    <p
                                                        className="text-sm leading-relaxed"
                                                        style={{ color: "#e8e8f0" }}
                                                    >
                                                        {msg.content}
                                                    </p>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* ── Input ── */}
                                <div
                                    className="px-5 py-4 shrink-0"
                                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                                >
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex items-center gap-3"
                                    >
                                        <span
                                            className="text-sm font-mono shrink-0 select-none"
                                            style={{ color: "var(--accent)" }}
                                        >
                                            $
                                        </span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
                                            placeholder="type your question..."
                                            disabled={isLoading}
                                            className="flex-1 bg-transparent border-none outline-none text-sm font-mono"
                                            style={{
                                                color: "#e8e8f0",
                                                caretColor: "var(--accent)",
                                            }}
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading || !input.trim()}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all disabled:opacity-25"
                                            style={{
                                                backgroundColor: "rgba(114,217,160,0.1)",
                                                border: "1px solid rgba(114,217,160,0.2)",
                                                color: "var(--accent)",
                                            }}
                                        >
                                            <LuSend size={11} />
                                            send
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default function DashboardPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-24">
            <p className="font-mono text-sm uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
                dashboard
            </p>
            <h1 className="font-display italic mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)", letterSpacing: "-0.02em" }}>
                Private area
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                Income tracking, Project 44, and task board — coming soon.
            </p>
        </div>
    );
}

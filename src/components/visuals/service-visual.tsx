import { Bot, Database, FileText, GitBranch, Search, Sparkles, Zap } from "lucide-react";
import type { ServiceSlug } from "@/content/services";
import { cn } from "@/lib/cn";

/** A distinct, lightweight illustration for each service. Decorative. */
export function ServiceVisual({ slug, className }: { slug: ServiceSlug; className?: string }) {
  return (
    <div
      className={cn(
        "relative h-full min-h-56 overflow-hidden rounded-2xl border border-white/10 bg-navy-900 bg-grid",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/30 blur-3xl" />
      <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {slug === "web-development" && <WebVisual />}
        {slug === "mobile-app-development" && <MobileVisual />}
        {slug === "ai-solutions" && <AIVisual />}
        {slug === "custom-software" && <CustomVisual />}
      </div>
    </div>
  );
}

function WebVisual() {
  return (
    <div className="w-full max-w-[260px] overflow-hidden rounded-xl border border-white/10 bg-navy-800 shadow-xl shadow-black/40">
      <div className="flex gap-1 border-b border-white/10 px-2.5 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
      </div>
      <div className="space-y-2.5 p-3">
        <div className="flex items-center justify-between">
          <span className="h-2 w-12 rounded bg-white/70" />
          <span className="h-4 w-12 rounded-full bg-brand-500" />
        </div>
        <span className="block h-2.5 w-4/5 rounded bg-white/25" />
        <svg viewBox="0 0 200 50" className="h-10 w-full">
          <defs>
            <linearGradient id="web-area" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#4F7CFF" stopOpacity="0.5" />
              <stop offset="1" stopColor="#4F7CFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 42 L25 36 L50 38 L75 26 L100 30 L125 18 L150 21 L175 9 L200 6 V50 H0Z" fill="url(#web-area)" />
          <path d="M0 42 L25 36 L50 38 L75 26 L100 30 L125 18 L150 21 L175 9 L200 6" fill="none" stroke="#7495FF" strokeWidth="2" />
        </svg>
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-6 rounded-md border border-white/5 bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="flex items-end gap-4">
      {[0, 1].map((phone) => (
        <div
          key={phone}
          className={cn(
            "w-[100px] rounded-[1.3rem] border border-white/15 bg-navy-950 p-1 shadow-xl shadow-black/50",
            phone === 1 && "mb-6 motion-safe:animate-float",
          )}
        >
          <div className="space-y-1.5 rounded-[1.05rem] bg-gradient-to-b from-navy-700 to-navy-800 p-2 pt-3">
            <span className="mx-auto mb-1 block h-1 w-6 rounded-full bg-black/40" />
            {phone === 0 ? (
              <>
                <span className="block h-14 rounded-lg bg-gradient-to-br from-brand-500 to-violet-400" />
                <span className="block h-1.5 w-3/4 rounded bg-white/60" />
                <span className="block h-1.5 w-1/2 rounded bg-white/20" />
                <span className="block h-5 rounded-md bg-brand-500" />
              </>
            ) : (
              <>
                {["bg-brand-400", "bg-violet-400", "bg-emerald-400", "bg-brand-300"].map((color) => (
                  <span key={color} className="flex items-center gap-1 rounded-md bg-white/5 p-1">
                    <span className={cn("h-4 w-4 rounded", color)} />
                    <span className="h-1.5 flex-1 rounded bg-white/20" />
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function AIVisual() {
  const nodes = [
    { x: 20, y: 30, Icon: FileText },
    { x: 20, y: 70, Icon: Search },
    { x: 80, y: 30, Icon: Zap },
    { x: 80, y: 70, Icon: Database },
  ];
  return (
    <div className="relative h-44 w-full max-w-[280px]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {nodes.map((node) => (
          <line key={`${node.x}-${node.y}`} x1="50" y1="50" x2={node.x} y2={node.y} stroke="#A78BFA" strokeOpacity="0.5" strokeWidth="0.6" strokeDasharray="2 2" className="animate-dash" />
        ))}
      </svg>
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-400 text-white shadow-lg shadow-brand-500/40">
        <Bot className="h-7 w-7" />
      </span>
      {nodes.map(({ x, y, Icon }) => (
        <span
          key={`${x}-${y}`}
          className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-navy-800 text-brand-200"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <Icon className="h-4 w-4" />
        </span>
      ))}
      <span className="absolute left-1/2 top-[6%] flex -translate-x-1/2 items-center gap-1 rounded-full border border-violet-400/30 bg-violet-400/10 px-2 py-0.5 text-[9px] text-violet-300">
        <Sparkles className="h-2.5 w-2.5" /> grounded answers
      </span>
    </div>
  );
}

function CustomVisual() {
  const steps = ["Request", "Approve", "Process", "Report"];
  return (
    <div className="w-full max-w-[280px] space-y-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2" style={{ marginLeft: `${i * 12}%` }}>
          <span
            className={cn(
              "flex h-8 items-center gap-2 rounded-lg border px-2.5 text-[11px] font-medium",
              i === 2 ? "border-brand-400/50 bg-brand-500/20 text-white" : "border-white/10 bg-navy-800 text-slate-300",
            )}
          >
            <GitBranch className="h-3 w-3 text-brand-300" />
            {step}
          </span>
          {i < steps.length - 1 && <span className="h-px w-6 bg-gradient-to-r from-brand-400 to-transparent" />}
        </div>
      ))}
    </div>
  );
}

import Image from "next/image";
import { AlertTriangle, Bot, Camera, CheckCircle2, FileText, MapPin, PenLine } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * Product visual for a portfolio entry. Uses a real screenshot when `project.image`
 * is set, otherwise an illustrative interface rendered in HTML.
 */
export function ProjectMockup({
  project,
  className,
  priority,
  compact,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  /** Scales the illustrative UI down to fit small cards. */
  compact?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-line bg-navy-900 bg-grid", className)}>
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/30 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" aria-hidden="true" />
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div
          className={cn("absolute inset-0 flex items-center justify-center", compact ? "p-4" : "p-6 sm:p-10")}
          role="img"
          aria-label={`Illustrative interface for ${project.title}`}
        >
          <div className={cn("flex w-full items-center justify-center", compact && "origin-center scale-[0.72] sm:scale-[0.78]")}>
            {project.mockup === "assistant" && <AssistantMockup />}
            {project.mockup === "mobile" && <MobileMockup />}
            {project.mockup === "dashboard" && <DashboardMockup />}
            {project.mockup === "workflow" && <WorkflowMockup />}
          </div>
        </div>
      )}
      {!project.image && (
        <span className="absolute left-3 top-3 z-10 rounded-full border border-white/10 bg-navy-950/70 px-2 py-0.5 font-mono text-[10px] text-slate-400 backdrop-blur">
          Illustrative UI
        </span>
      )}
    </div>
  );
}

function Window({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("w-full overflow-hidden rounded-xl border border-white/10 bg-navy-800 shadow-2xl shadow-black/40", className)}>
      <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      {children}
    </div>
  );
}

function AssistantMockup() {
  return (
    <Window className="max-w-md">
      <div className="space-y-3 p-4 text-[11px] sm:text-xs">
        <p className="ml-auto w-fit max-w-[80%] rounded-xl rounded-br-sm bg-white/10 px-3 py-2 text-slate-100">
          What is our standard notice period for contractors?
        </p>
        <div className="flex gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-400 text-white">
            <Bot className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="rounded-xl rounded-tl-sm bg-white px-3 py-2.5 leading-relaxed text-ink">
            Contractors on standard agreements require <strong>30 days&apos; written notice</strong>, unless their statement of work
            specifies otherwise.
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["HR Policy v4 · §6.1", "Contractor template · §12"].map((source) => (
                <span key={source} className="inline-flex items-center gap-1 rounded-md bg-surface px-1.5 py-0.5 text-[10px] text-muted">
                  <FileText className="h-2.5 w-2.5" aria-hidden="true" />
                  {source}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-500">
          Ask about policies, projects or proposals…
        </div>
      </div>
    </Window>
  );
}

function MobileMockup() {
  return (
    <div className="flex items-end gap-5">
      <div className="w-36 rounded-[1.8rem] border border-white/15 bg-navy-950 p-1.5 shadow-2xl shadow-black/50 sm:w-44">
        <div className="space-y-2 rounded-[1.4rem] bg-gradient-to-b from-navy-700 to-navy-800 p-3 text-[10px]">
          <span className="mx-auto block h-1.5 w-10 rounded-full bg-black/40" />
          <p className="text-slate-400">Job #2041</p>
          <p className="text-xs font-semibold text-white">HVAC maintenance</p>
          <p className="flex items-center gap-1 text-slate-400">
            <MapPin className="h-3 w-3" aria-hidden="true" /> 2.4 km away
          </p>
          {["Inspect unit", "Replace filter", "Pressure test"].map((task, i) => (
            <p key={task} className="flex items-center gap-1.5 rounded-lg bg-white/5 p-1.5 text-slate-200">
              <CheckCircle2 className={cn("h-3 w-3", i < 2 ? "text-emerald-400" : "text-slate-600")} aria-hidden="true" />
              {task}
            </p>
          ))}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <span className="flex items-center justify-center gap-1 rounded-lg bg-white/10 py-1.5 text-slate-200">
              <Camera className="h-3 w-3" aria-hidden="true" /> Photo
            </span>
            <span className="flex items-center justify-center gap-1 rounded-lg bg-brand-500 py-1.5 text-white">
              <PenLine className="h-3 w-3" aria-hidden="true" /> Sign
            </span>
          </div>
        </div>
      </div>
      <div className="mb-10 hidden w-44 rounded-xl border border-white/10 bg-navy-800 p-3 text-[10px] shadow-xl shadow-black/40 sm:block">
        <p className="font-medium text-white">Dispatch board</p>
        {[
          ["Completed", "bg-emerald-400", "w-4/5"],
          ["In progress", "bg-brand-400", "w-1/2"],
          ["Scheduled", "bg-violet-400", "w-2/3"],
        ].map(([label, color, width]) => (
          <div key={label} className="mt-2">
            <p className="text-slate-400">{label}</p>
            <span className="mt-1 block h-1.5 rounded-full bg-white/5">
              <span className={cn("block h-1.5 rounded-full", color, width)} />
            </span>
          </div>
        ))}
        <p className="mt-2.5 text-[9px] text-emerald-300">● Offline changes synced</p>
      </div>
    </div>
  );
}

function DashboardMockup() {
  const rows = [
    ["Northwind", 92, "bg-emerald-400"],
    ["Acme Labs", 71, "bg-brand-400"],
    ["Globex", 38, "bg-amber-400"],
  ] as const;
  return (
    <Window className="max-w-lg">
      <div className="grid gap-3 p-4 sm:grid-cols-5">
        <div className="space-y-2 sm:col-span-3">
          <p className="text-[11px] font-medium text-white">Account health</p>
          <svg viewBox="0 0 200 70" className="h-24 w-full">
            <defs>
              <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
                <stop stopColor="#A78BFA" stopOpacity="0.45" />
                <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 55 L20 50 L40 52 L60 40 L80 44 L100 30 L120 34 L140 22 L160 26 L180 14 L200 12 V70 H0Z" fill="url(#dash-area)" />
            <path d="M0 55 L20 50 L40 52 L60 40 L80 44 L100 30 L120 34 L140 22 L160 26 L180 14 L200 12" fill="none" stroke="#A78BFA" strokeWidth="2" />
          </svg>
        </div>
        <div className="space-y-2 sm:col-span-2">
          {rows.map(([name, score, color]) => (
            <div key={name} className="rounded-lg border border-white/5 bg-white/5 p-2 text-[10px]">
              <p className="flex justify-between text-slate-300">
                {name} <span className="text-white">{score}</span>
              </p>
              <span className="mt-1 block h-1 rounded-full bg-white/10">
                <span className={cn("block h-1 rounded-full", color)} style={{ width: `${score}%` }} />
              </span>
            </div>
          ))}
          <p className="flex items-center gap-1 text-[10px] text-amber-300">
            <AlertTriangle className="h-3 w-3" aria-hidden="true" /> 1 account needs attention
          </p>
        </div>
      </div>
    </Window>
  );
}

function WorkflowMockup() {
  const steps = [
    ["Invoice received", "text-slate-300", "border-white/10"],
    ["AI extraction", "text-brand-200", "border-brand-400/40"],
    ["PO matched", "text-emerald-300", "border-emerald-400/40"],
    ["Posted to ERP", "text-slate-300", "border-white/10"],
  ] as const;
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {steps.map(([label, text, border], i) => (
          <div key={label} className={cn("rounded-xl border bg-navy-800 p-2.5 text-[10px] shadow-lg shadow-black/30", border)}>
            <p className="font-mono text-[9px] text-slate-500">0{i + 1}</p>
            <p className={cn("mt-1 font-medium", text)}>{label}</p>
          </div>
        ))}
      </div>
      <Window>
        <div className="space-y-1.5 p-3 font-mono text-[10px]">
          {[
            ["supplier", "Contoso Ltd."],
            ["invoice_no", "INV-10482"],
            ["total", "4,860.00"],
            ["po_match", "✓ PO-7731"],
          ].map(([key, value]) => (
            <p key={key} className="flex justify-between border-b border-white/5 pb-1.5 last:border-0">
              <span className="text-slate-500">{key}</span>
              <span className="text-slate-200">{value}</span>
            </p>
          ))}
        </div>
      </Window>
    </div>
  );
}

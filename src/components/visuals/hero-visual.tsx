import { Bot, CheckCircle2, FileText, Sparkles } from "lucide-react";

const bars = [38, 52, 44, 66, 58, 74, 69, 88, 80, 96];

/**
 * Hero composition: a web dashboard, mobile app, AI assistant and workflow engine,
 * connected by live data lines. Pure HTML/SVG — no image downloads, crisp at any size.
 */
export function HeroVisual() {
  return (
    <div
      className="relative mx-auto aspect-[10/9] w-full max-w-[600px] select-none text-left"
      role="img"
      aria-label="Illustration of connected products: a web dashboard, a mobile app, an AI assistant and an automated workflow"
    >
      {/* Glow */}
      <div className="absolute inset-[12%] rounded-full bg-brand-500/25 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-[8%] right-[6%] h-1/3 w-1/3 rounded-full bg-violet-400/20 blur-3xl" aria-hidden="true" />

      {/* Connection lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 540" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="hero-line" x1="0" y1="0" x2="600" y2="540" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F7CFF" />
            <stop offset="1" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        <path d="M120 420 C 120 360, 200 330, 260 300" stroke="url(#hero-line)" strokeWidth="1.5" strokeDasharray="4 8" className="animate-dash" opacity="0.7" />
        <path d="M470 120 C 520 160, 520 200, 500 230" stroke="url(#hero-line)" strokeWidth="1.5" strokeDasharray="4 8" className="animate-dash" opacity="0.7" />
        <path d="M360 330 C 400 360, 420 380, 440 390" stroke="url(#hero-line)" strokeWidth="1.5" strokeDasharray="4 8" className="animate-dash" opacity="0.7" />
      </svg>

      {/* Web dashboard */}
      <div data-parallax="0.06" className="absolute left-[2%] top-[10%] w-[74%] overflow-hidden rounded-2xl border border-white/10 bg-navy-800/90 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-3 h-4 flex-1 rounded-md bg-white/5 px-2 font-mono text-[8px] leading-4 text-slate-500 sm:text-[9px]">app.yourproduct.com/insights</span>
        </div>
        <div className="flex">
          <div className="hidden w-[22%] flex-col gap-2 border-r border-white/5 p-3 sm:flex">
            <span className="h-2 w-3/4 rounded bg-brand-400/70" />
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="h-1.5 rounded bg-white/10" style={{ width: `${80 - i * 9}%` }} />
            ))}
          </div>
          <div className="flex-1 p-3 sm:p-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Active users", "12.4k"],
                ["Automations", "318"],
                ["Uptime", "99.9%"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/5 bg-white/[0.03] p-2">
                  <p className="text-[7px] uppercase tracking-wider text-slate-500 sm:text-[8px]">{label}</p>
                  <p className="mt-0.5 text-xs font-semibold text-white sm:text-sm">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex h-[86px] items-end gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 sm:h-28">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 origin-bottom rounded-t-sm bg-gradient-to-t from-brand-500/40 to-brand-400 motion-safe:animate-grow-y"
                  style={{ height: `${h}%`, opacity: 0.45 + i * 0.055, animationDelay: `${500 + i * 60}ms` }}
                />
              ))}
            </div>
            <p className="mt-2 text-[7px] text-slate-500 sm:text-[8px]">Sample data · illustrative interface</p>
          </div>
        </div>
      </div>

      {/* Workflow card */}
      <div data-parallax="-0.14" data-parallax-rotate="-0.012" className="absolute right-[1%] top-[2%] w-[38%] motion-safe:animate-enter [animation-delay:700ms]">
      <div className="rounded-xl border border-white/10 bg-navy-800/95 p-3 shadow-xl shadow-black/40 motion-safe:animate-float [animation-delay:-2s]">
        <p className="flex items-center gap-1.5 text-[9px] font-medium text-slate-300 sm:text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse-soft" />
          Workflow running
        </p>
        <div className="mt-2.5 flex items-center gap-1">
          {["API", "AI", "DB"].map((node, i) => (
            <div key={node} className="flex flex-1 items-center gap-1">
              <span className="flex h-6 flex-1 items-center justify-center rounded-md border border-brand-400/30 bg-brand-500/15 font-mono text-[8px] text-brand-200 sm:text-[9px]">
                {node}
              </span>
              {i < 2 && <span className="h-px w-1.5 bg-brand-400/60" />}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Mobile app */}
      <div data-parallax="0.22" data-parallax-rotate="0.015" className="absolute bottom-[3%] right-[3%] w-[30%] motion-safe:animate-enter [animation-delay:900ms]">
      <div className="rounded-[1.6rem] border border-white/15 bg-navy-900 p-1.5 shadow-2xl shadow-black/50 motion-safe:animate-float">
        <div className="overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-navy-700 to-navy-800 px-2.5 pb-3 pt-2">
          <div className="mx-auto mb-2.5 h-1.5 w-10 rounded-full bg-black/40" />
          <p className="text-[8px] text-slate-400 sm:text-[9px]">Good morning</p>
          <p className="text-[10px] font-semibold text-white sm:text-xs">Today&apos;s jobs</p>
          <div className="mt-2 space-y-1.5">
            {[
              ["bg-brand-400", "Site inspection"],
              ["bg-violet-400", "Install & test"],
              ["bg-emerald-400", "Client sign-off"],
            ].map(([color, label]) => (
              <div key={label} className="flex items-center gap-1.5 rounded-lg bg-white/5 p-1.5">
                <span className={`h-5 w-1 rounded-full ${color}`} />
                <span className="text-[7px] text-slate-200 sm:text-[8px]">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 h-6 rounded-lg bg-brand-500 text-center text-[8px] font-medium leading-6 text-white sm:text-[9px]">Start route</div>
        </div>
      </div>
      </div>

      {/* AI assistant */}
      <div data-parallax="0.14" data-parallax-rotate="-0.008" className="absolute bottom-[1%] left-[0%] w-[58%] rounded-2xl motion-safe:animate-enter [animation-delay:1100ms] border border-white/10 bg-white p-3 shadow-2xl shadow-black/40 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-400 text-white">
            <Bot className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <p className="text-[10px] font-semibold text-ink sm:text-xs">Knowledge assistant</p>
          <Sparkles className="ml-auto h-3.5 w-3.5 text-violet-500" aria-hidden="true" />
        </div>
        <p className="ml-auto mt-2.5 w-fit motion-safe:animate-enter [animation-delay:1400ms] max-w-[85%] rounded-xl rounded-br-sm bg-surface px-2.5 py-1.5 text-[9px] text-ink sm:text-[10px]">
          Summarise the renewal terms in this contract.
        </p>
        <div className="mt-2 rounded-xl rounded-bl-sm bg-brand-50 motion-safe:animate-enter [animation-delay:1900ms] px-2.5 py-2 text-[9px] leading-relaxed text-ink sm:text-[10px]">
          <p className="flex items-start gap-1.5">
            <CheckCircle2 className="mt-px h-3 w-3 shrink-0 text-brand-600" aria-hidden="true" />
            Auto-renews yearly with 60 days&apos; notice to cancel.
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-white px-1.5 py-0.5 text-[8px] text-muted">
            <FileText className="h-2.5 w-2.5" aria-hidden="true" /> Section 8.2
          </span>
        </div>
      </div>
    </div>
  );
}

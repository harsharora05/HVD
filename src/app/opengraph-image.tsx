import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          background: "radial-gradient(circle at 80% 10%, rgba(79,124,255,0.45), transparent 45%), radial-gradient(circle at 95% 90%, rgba(167,139,250,0.35), transparent 40%), #0B1020",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 40 40">
            <rect x="1" y="1" width="38" height="38" rx="11" fill="#0B1020" stroke="#4F7CFF" strokeOpacity="0.6" strokeWidth="1.5" />
            <path d="M11 10v20" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            <path d="M29 10v20" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />
            <path d="M11 14.5 20 24l9-9.5" fill="none" stroke="#4F7CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="20" cy="24" r="2.6" fill="#fff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 4 }}>HVD</div>
            <div style={{ fontSize: 16, letterSpacing: 8, color: "#94a3b8" }}>TECHNOLOGIES</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#9DB1FF", marginBottom: 20 }}>HUMAN-CENTRIC VISIONARY DEVELOPMENT</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 950 }}>{siteConfig.tagline}</div>
          <div style={{ fontSize: 26, color: "#cbd5e1", marginTop: 28 }}>{siteConfig.statement}</div>
        </div>
      </div>
    ),
    size,
  );
}

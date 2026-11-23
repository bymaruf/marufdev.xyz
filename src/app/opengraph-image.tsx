import { ImageResponse } from "next/og";

export const alt = "Md. Maruf Hasan — CSE Student & Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          background: "#050505",
          color: "#ffffff",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Layered ellipses form a soft fiery horizon glow along the bottom. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: -180,
            width: 1200,
            height: 360,
            borderRadius: "50%",
            background: "rgba(180, 83, 9, 0.16)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 150,
            bottom: -130,
            width: 900,
            height: 260,
            borderRadius: "50%",
            background: "rgba(217, 119, 6, 0.22)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 300,
            bottom: -90,
            width: 600,
            height: 180,
            borderRadius: "50%",
            background: "rgba(251, 146, 60, 0.28)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            color: "#fcd34d",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#fbbf24",
              display: "flex",
            }}
          />
          MARUFDEV.XYZ
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Md. Maruf Hasan
          </div>
          <div style={{ fontSize: 32, color: "#fcd34d" }}>
            CSE Student &amp; Developer
          </div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.72)" }}>
            Computer Science · AI · Cybersecurity
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "monospace",
          }}
        >
          <span>marufdev.xyz</span>
          <span>github.com/bymaruf</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

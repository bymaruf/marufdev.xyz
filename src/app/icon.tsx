import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#050814",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(37,99,235,0.18)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "1px solid #2563eb",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "2px solid #60a5fa",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#000000",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 26,
            height: 2,
            borderRadius: 2,
            background: "rgba(56,189,248,0.85)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 10,
            height: 2,
            borderRadius: 2,
            background: "#bae6fd",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

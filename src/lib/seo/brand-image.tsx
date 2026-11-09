import { ImageResponse } from "next/og";
import { SITE_NAME } from "./site";

const TEAL = "#0F5246";
const TURMERIC = "#E8A92B";

export function logoImage(size: number) {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: TEAL, color: "#fff", fontSize: size * 0.66, fontWeight: 700 }}>S</div>,
    { width: size, height: size },
  );
}

export function shareImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, background: TEAL, color: "#fff" }}>
      <div style={{ display: "flex", width: 96, height: 10, background: TURMERIC, marginBottom: 40 }} />
      <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: -3 }}>{SITE_NAME}</div>
      <div style={{ display: "flex", fontSize: 46, marginTop: 24, lineHeight: 1.25, maxWidth: 980 }}>Thailand long-stay visas, schools and immigration offices</div>
      <div style={{ display: "flex", fontSize: 32, marginTop: 56, opacity: 0.8 }}>staylong.co</div>
    </div>,
    { width: 1200, height: 630 },
  );
}

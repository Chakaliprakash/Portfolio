import { ImageResponse } from "next/og";

export const alt = "Prakash Chakali — Java Backend Developer and Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", background: "#10120f", color: "#f0f0e9", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "18px", color: "#c6e56a", fontSize: 22, letterSpacing: "5px" }}>
        <div style={{ width: 54, height: 54, border: "1px solid #c6e56a", display: "flex", alignItems: "center", justifyContent: "center" }}>PC</div>
        PRAKASH CHAKALI
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ fontSize: 76, lineHeight: 1.02, fontWeight: 700, letterSpacing: "-5px" }}>Engineering what matters.</div>
        <div style={{ fontSize: 25, color: "#a0a69a" }}>Java Backend Developer · Software Engineer · Hyderabad, India</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #3a4035", paddingTop: "22px", color: "#c6e56a", fontSize: 16, letterSpacing: "3px" }}>
        <span>JAVA / SPRING / DATA / SYSTEMS</span><span>CHAKALIPRAKASH.GITHUB.IO</span>
      </div>
    </div>,
    { ...size }
  );
}

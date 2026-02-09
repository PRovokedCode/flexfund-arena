export default function HeroBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #8b5cf6, #60a5fa, #22d3ee)",
        borderRadius: "24px",
        padding: "40px",
        color: "white",
        position: "relative",
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        overflow: "hidden",
      }}
    >
      {/* Verified badge */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: "rgba(0,0,0,0.85)",
          padding: "6px 14px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        Verified by Gemini
      </div>

      <h1 style={{ fontSize: "42px", fontWeight: 800, marginBottom: "12px" }}>
        FlexFund Arena
      </h1>

      <p style={{ fontSize: "16px", opacity: 0.9, lineHeight: 1.5 }}>
        Fund your fun. Fuel real needs. <br />
        AI decides what gets funded.
      </p>
    </div>
  );
}

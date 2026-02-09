import { Sprout, Handshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ActionCards() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "28px",
        marginTop: "40px",
      }}
    >
      {/* I NEED FUNDING */}
      <div
        style={{
          background: "#1f2a4f",
          borderRadius: "20px",
          padding: "32px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
        }}
      >
        <Sprout size={56} color="#22d3ee" strokeWidth={1.8} />

        <h3 style={{ fontSize: "22px", fontWeight: 700, marginTop: "16px" }}>
          Make Request
        </h3>

        <p
          style={{
            fontSize: "14px",
            color: "#cbd5e1",
            marginTop: "10px",
            lineHeight: 1.6,
          }}
        >
          Submit your request. Gemini verifies it before it enters the arena.
        </p>

        <button
          onClick={() => navigate("/requester")}
          style={{
            marginTop: "24px",
            background: "linear-gradient(135deg, #34d399, #22c55e)",
            border: "none",
            padding: "12px 28px",
            borderRadius: "999px",
            fontWeight: 600,
            color: "white",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          }}
        >
          Make a Request
        </button>
      </div>

      {/* I WANT TO FUND */}
      <div
        style={{
          background: "#1f2a4f",
          borderRadius: "20px",
          padding: "32px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
        }}
      >
        <Handshake size={56} color="#38bdf8" strokeWidth={1.8} />

        <h3 style={{ fontSize: "22px", fontWeight: 700, marginTop: "16px" }}>
          Rich Guy Arena
        </h3>

        <p
          style={{
            fontSize: "14px",
            color: "#cbd5e1",
            marginTop: "10px",
            lineHeight: 1.6,
          }}
        >
          Browse AI-verified requests and support what you believe in.
        </p>

        <button
          onClick={() => navigate("/rich-guy")}
          style={{
            marginTop: "24px",
            background: "linear-gradient(135deg, #38bdf8, #22d3ee)",
            border: "none",
            padding: "12px 28px",
            borderRadius: "999px",
            fontWeight: 600,
            color: "white",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          }}
        >
          Enter Arena
        </button>
      </div>
    </div>
  );
}

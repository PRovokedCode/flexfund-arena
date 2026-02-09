import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";
import RequestCard from "../components/RequestCard";

export default function RichGuy() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchArena = async () => {
    try {
      const res = await axios.get(`${API_BASE}/arena`);

      const raw = res.data.requests || [];

      // 🔧 FIX: normalize fallback amount WITHOUT touching UI
      const normalized = raw.map((req) => ({
        ...req,
        amountNeeded:
          req.amountNeeded ??
          (typeof req.flexValue === "number" ? req.flexValue : null),
      }));

      setRequests(normalized);
    } catch (err) {
      console.error("Arena fetch failed:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArena();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#cbd5f5",
          fontSize: "16px",
          animation: "pulse 1.5s infinite",
        }}
      >
        Loading AI-verified requests…
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f172a, #020617)",
        color: "white",
        paddingBottom: "80px",
      }}
    >
      {/* HEADER */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
          {[
            { label: "← Home", action: () => navigate("/") },
            { label: "Make a Request →", action: () => navigate("/requester") },
            { label: "🔄 Refresh", action: fetchArena },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              style={{
                background: "#ffffff",
                color: "#0f172a",
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <h1
          style={{
            fontSize: "34px",
            fontWeight: 800,
            marginBottom: "8px",
            color: "white",
            animation: "fadeSlide 0.6s ease forwards",
          }}
        >
          🔥 Rich Guy Arena
        </h1>

        <p
          style={{
            color: "#c7d2fe",
            maxWidth: "560px",
            animation: "fadeSlide 0.8s ease forwards",
          }}
        >
          Every request below has been verified by AI. Fund what you believe
          deserves support.
        </p>
      </div>

      {/* FEED */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gap: "28px",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        }}
      >
        {requests.length === 0 && (
          <p style={{ color: "#94a3b8", textAlign: "center", marginTop: "80px" }}>
            No verified requests yet.
          </p>
        )}

        {requests.map((req, index) => (
          <div
            key={req.id}
            style={{
              background: "linear-gradient(180deg, #1e293b, #0f172a)",
              borderRadius: "20px",
              padding: "22px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
              animation: `fadeSlide 0.6s ease forwards`,
              animationDelay: `${index * 120}ms`,
              opacity: 0,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  background: "#f97316",
                  color: "#020617",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                {req.category || "#General"}
              </span>

              <span style={{ fontSize: "12px", color: "#22c55e" }}>
                ✔ AI Verified
              </span>
            </div>

            <h3 style={{ fontSize: "16px", fontWeight: 700, marginTop: "8px" }}>
              {req.headline || "Untitled Request"}
            </h3>

            <p style={{ fontSize: "13px", color: "#cbd5f5", marginTop: "6px" }}>
              {req.description || "No description provided."}
            </p>

            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "10px" }}>
              <p>Needed ₹{req.amountNeeded ?? "—"}</p>
              <p>Flex {req.flexValue} requested</p>
            </div>

            <button
              onClick={() => navigate("/pay", { state: { request: req } })}
              style={{
                marginTop: "14px",
                width: "100%",
                padding: "10px 0",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                color: "#020617",
                background: "linear-gradient(135deg, #34d399, #22c55e)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
              }}
            >
              Fund This
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

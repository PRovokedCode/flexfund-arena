import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const request = state?.request;

  const [payerName, setPayerName] = useState("RichGuy");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  if (!request) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
        }}
      >
        Invalid request.
      </div>
    );
  }

  const handlePay = async () => {
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      await axios.post(`${API_BASE}/fund-request`, {
        requestId: request.id,
        payAmount: amt,
        payerName,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/rich-guy");
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f172a, #020617)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        color: "white",
      }}
    >
      {/* SUCCESS OVERLAY */}
      {success && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "#020617",
              borderRadius: "20px",
              padding: "32px",
              textAlign: "center",
              animation: "scaleIn 0.35s ease",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "999px",
                background: "#22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: "28px",
              }}
            >
              ✔
            </div>

            <h2 style={{ fontSize: "20px", fontWeight: 800 }}>
              Payment Successful
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "13px" }}>
              Redirecting to Arena…
            </p>
          </div>
        </div>
      )}

      {/* PAYMENT CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "linear-gradient(180deg, #1e293b, #0f172a)",
          borderRadius: "24px",
          padding: "28px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
          animation: "fadeUp 0.6s ease",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            border: "1px solid #334155",
            color: "#e5e7eb",
            padding: "6px 14px",
            borderRadius: "999px",
            fontSize: "13px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ← Back
        </button>

        <h1 style={{ fontSize: "26px", fontWeight: 800, marginBottom: "6px" }}>
          💰 Fund an AI-Verified Request
        </h1>

        <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>
          You are supporting a request approved by Gemini
        </p>

        <div
          style={{
            background: "#020617",
            borderRadius: "18px",
            padding: "18px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}>
            {request.headline}
          </h3>

          <p style={{ fontSize: "13px", color: "#cbd5f5" }}>
            {request.text || "No description provided."}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "14px",
              fontSize: "13px",
              color: "#94a3b8",
            }}
          >
            <span>Needed ₹{request.amountNeeded}</span>
            <span>⚡ Flex {request.flexValue}</span>
          </div>
        </div>

        <input
          value={payerName}
          onChange={(e) => setPayerName(e.target.value)}
          placeholder="Your name"
          disabled={success}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            marginBottom: "12px",
            outline: "none",
          }}
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount to fund (₹)"
          disabled={success}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            marginBottom: "18px",
            outline: "none",
          }}
        />

        <button
          onClick={handlePay}
          disabled={success}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "999px",
            border: "none",
            fontWeight: 800,
            fontSize: "15px",
            cursor: success ? "default" : "pointer",
            color: "#020617",
            background: "linear-gradient(135deg, #34d399, #22c55e)",
            boxShadow: "0 16px 35px rgba(0,0,0,0.45)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.03)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          Pay Now
        </button>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.85); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

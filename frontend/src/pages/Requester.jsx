import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";

export default function Requester() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifiedData, setVerifiedData] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result.split(",")[1]);
    };
  };

  const verifyWithAI = async () => {
    if (!text.trim()) {
      alert("Please describe your request.");
      return;
    }

    setLoading(true);
    setVerifiedData(null);

    try {
      const res = await axios.post(`${API_BASE}/submit-request`, {
        text,
        image,
        amountNeeded: Number(amount) || 0,
      });

      if (res.data.status === "verified") {
        setVerifiedData({
          ...res.data.aiResult,
          amountNeeded: Number(amount) || 0, // 🔒 FORCE PRESERVE
          fallback: false,
        });
      } else {
        alert("Rejected: " + res.data.reason);
      }
    } catch (err) {
      console.error("Gemini error:", err);

      // ✅ CORRECT FALLBACK (SCHEMA SAFE)
      setVerifiedData({
        headline: text.slice(0, 60) + (text.length > 60 ? "..." : ""),
        description: text,
        category: "#General",
        amountNeeded: Number(amount) || 0, // ✅ FIX
        flexValue: 0,                      // ✅ FIX
        fallback: true,
      });

      alert(
        "⚠ Gemini verification failed.\nProceeding with fallback verification."
      );
    } finally {
      setLoading(false);
    }
  };

  const submitToArena = async () => {
    try {
      await axios.post(`${API_BASE}/submit-to-arena`, {
        aiResult: verifiedData,
      });

      alert("Request added to Arena!");
      navigate("/rich-guy");
    } catch {
      alert("Failed to submit to Arena.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "32px",
        animation: "fadeIn 0.6s ease",
      }}
    >
      {/* TOP NAV */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            border: "1px solid #cbd5e1",
            background: "white",
            cursor: "pointer",
          }}
        >
          ← Home
        </button>

        <button
          onClick={() => navigate("/rich-guy")}
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            border: "1px solid #cbd5e1",
            background: "white",
            cursor: "pointer",
          }}
        >
          Go to Arena →
        </button>
      </div>

      <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "6px" }}>
        Submit a Request
      </h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>
        Fund your fun. Gemini verifies it before gets funded.
      </p>

      {/* CARD */}
      <div
        style={{
          maxWidth: "900px",
          background: "#1f2a4f",
          borderRadius: "22px",
          padding: "32px",
          color: "white",
          boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
          animation: "slideUp 0.7s ease",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "16px" }}>
          Submit a Request
        </h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          placeholder="Describe what you need..."
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            marginBottom: "18px",
          }}
        />

        <label
          style={{
            fontSize: "13px",
            color: "#38bdf8",
            fontWeight: 600,
          }}
        >
          Amount needed (₹)
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "2px solid #22d3ee",
            outline: "none",
            marginTop: "6px",
            marginBottom: "18px",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <button
            onClick={verifyWithAI}
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #34d399, #22c55e)",
              padding: "12px 26px",
              borderRadius: "999px",
              border: "none",
              color: "white",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            }}
          >
            {loading ? "🧠 Gemini scanning..." : "Verify with AI"}
          </button>
        </div>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            style={{
              marginTop: "18px",
              width: "260px",
              height: "160px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        )}

        {verifiedData && (
          <div
            style={{
              marginTop: "24px",
              background: "white",
              color: "black",
              padding: "18px",
              borderRadius: "14px",
              animation: "fadeIn 0.4s ease",
            }}
          >
            <p
              style={{
                fontWeight: 800,
                color: verifiedData.fallback ? "#f59e0b" : "#16a34a",
                marginBottom: "8px",
              }}
            >
              {verifiedData.fallback
                ? "⚠ Fallback Verification (Low Confidence)"
                : "✔ AI Verified by Gemini"}
            </p>

            <p>
              <b>Headline:</b> {verifiedData.headline}
            </p>
            <p>
              <b>Flex:</b> {verifiedData.flexValue}
            </p>

            <button
              onClick={submitToArena}
              style={{
                marginTop: "14px",
                background: "#16a34a",
                color: "white",
                padding: "10px 22px",
                borderRadius: "999px",
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Submit to Arena
            </button>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

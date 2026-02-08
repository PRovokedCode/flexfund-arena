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
    if (!text.trim()) return alert("Please describe your request.");

    setLoading(true);
    setVerifiedData(null);

    try {
      const res = await axios.post(`${API_BASE}/submit-request`, {
        text,
        image,
        amountNeeded: Number(amount) || 0,
      });

      if (res.data.status === "verified") {
        setVerifiedData(res.data.aiResult);
      } else {
        alert("Rejected: " + res.data.reason);
      }
    } catch {
      alert("AI verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const submitToArena = async () => {
    await axios.post(`${API_BASE}/submit-to-arena`, {
      aiResult: verifiedData,
    });

    alert("Request added to Arena!");
    navigate("/rich-guy");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 page-transition">
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 px-3 py-1 rounded text-sm"
        >
          ← Home
        </button>

        <button
          onClick={() => navigate("/rich-guy")}
          className="bg-yellow-400 text-black px-3 py-1 rounded text-sm"
        >
          Go to Arena →
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2 animate-fade-in">
        Submit a Request
      </h2>

      <div className="max-w-2xl space-y-4 animate-fade-in">
        <textarea
          className="w-full p-3 rounded text-black"
          placeholder="Describe what you need…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />

        <input
          type="number"
          className="w-full p-3 rounded text-black"
          placeholder="Amount needed (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-64 h-40 object-cover rounded"
          />
        )}

        <button
          onClick={verifyWithAI}
          disabled={loading}
          className="bg-indigo-600 px-6 py-2 rounded font-semibold"
        >
          {loading ? "🧠 Gemini scanning…" : "Verify with AI"}
        </button>

        {verifiedData && (
          <div className="bg-white text-black p-4 rounded">
            <p className="font-bold text-green-600">✔ AI Verified</p>
            <p><b>Headline:</b> {verifiedData.headline}</p>
            <p><b>Flex:</b> {verifiedData.flexValue}</p>

            <button
              onClick={submitToArena}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit to Arena
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

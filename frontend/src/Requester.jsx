import { useState } from "react";
import axios from "axios";
import { API_BASE } from "./config";

export default function Requester({ goBack, goRich }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifiedData, setVerifiedData] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Safe preview size
    setImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setImage(base64);
    };
  };

  const verifyWithAI = async () => {
    if (!text.trim()) {
      alert("Please enter a request description.");
      return;
    }

    setLoading(true);
    setVerifiedData(null);

    try {
      const res = await axios.post(`${API_BASE}/submit-request`, {
        text,
        image,
        amountNeeded: Number(amount) || 0
      });

      if (res.data.status === "verified") {
        setVerifiedData(res.data.aiResult);
      } else {
        alert("Rejected: " + res.data.reason);
      }
    } catch (err) {
      console.error("Verify failed:", err);
      alert("Verification failed — check backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const submitToArena = async () => {
    if (!verifiedData) return;

    try {
      await axios.post(`${API_BASE}/submit-to-arena`, {
        aiResult: verifiedData
      });

      alert("Stored in Arena!");

      // Reset form
      setText("");
      setAmount("");
      setImage(null);
      setImagePreview(null);
      setVerifiedData(null);
    } catch (err) {
      console.error("Store failed:", err);
      alert("Failed to store request.");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex gap-3 mb-4">
        <button
          onClick={goBack}
          className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
        >
          ← Back to Home
        </button>

        <button
          onClick={goRich}
          className="bg-yellow-500 text-black px-3 py-1 rounded text-sm"
        >
          Go to Rich Guy Arena →
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Submit a Request</h2>

      <textarea
        className="w-full border rounded p-2 mb-3"
        placeholder="Describe your need..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <input
        type="number"
        className="w-full border rounded p-2 mb-3"
        placeholder="Amount needed (₹)"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="mb-3"
        onChange={handleImageChange}
      />

      {imagePreview && (
        <div className="mb-3 border rounded p-2 inline-block">
          <img
            src={imagePreview}
            className="w-64 max-h-64 object-contain rounded"
            alt="preview"
          />
        </div>
      )}

      <button
        onClick={verifyWithAI}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Verifying..." : "Verify with AI"}
      </button>

      {verifiedData && (
        <button
          onClick={submitToArena}
          className="ml-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit to Arena
        </button>
      )}

      {verifiedData && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-bold">AI Preview</h3>
          <p><b>Headline:</b> {verifiedData.headline}</p>
          <p><b>Category:</b> {verifiedData.category}</p>
          <p><b>Flex:</b> {verifiedData.flexValue}</p>
          <p><b>Amount:</b> ₹{verifiedData.amountNeeded}</p>
        </div>
      )}
    </div>
  );
}

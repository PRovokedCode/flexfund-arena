import { useState } from "react";
import axios from "axios";
import { API_BASE } from "./config";

export default function Requester({ goBack, goRich }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [amount, setAmount] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result.split(",")[1]); // base64 only
    };

    if (file) reader.readAsDataURL(file);
  };

  const submitRequest = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(`${API_BASE}/submit-request`, {
        text,
        image,
        amountNeeded: Number(amount) || 0
      });

      setResult(res.data);
    } catch (err) {
      setResult({ error: "Server error — check backend console" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-8">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">

        <h2 className="text-xl font-bold mb-4">
          Submit Your Request
        </h2>

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
          onChange={handleImage}
        />

        <button
          onClick={submitRequest}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Verify with AI
        </button>

        {loading && (
          <div className="mt-4 text-indigo-600 font-medium">
            Scanning for Safety... 🤖
          </div>
        )}

        {result && (
          <div className="mt-4 p-3 border rounded bg-gray-50 text-sm">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}

      </div>
    </div>
  );
}

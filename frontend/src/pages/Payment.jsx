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
      <div className="h-screen flex items-center justify-center text-gray-600 page-transition">
        Invalid request.
      </div>
    );
  }

  const flexStyle =
    request.flexValue >= 70
      ? "bg-red-500/10 text-red-600 ring-1 ring-red-500/30"
      : request.flexValue >= 40
      ? "bg-yellow-400/10 text-yellow-700 ring-1 ring-yellow-400/30"
      : "bg-green-500/10 text-green-600 ring-1 ring-green-500/30";

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

      // 🎉 Trigger success animation
      setSuccess(true);

      // Auto redirect after animation
      setTimeout(() => {
        navigate("/rich-guy");
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 page-transition relative">
      {/* SUCCESS OVERLAY */}
      {success && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
              <span className="text-white text-3xl">✔</span>
            </div>
            <h2 className="text-xl font-bold mb-1">
              Payment Successful
            </h2>
            <p className="text-gray-500 text-sm">
              Redirecting to Arena…
            </p>
          </div>
        </div>
      )}

      {/* PAYMENT CARD */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-black mb-4"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold mb-1">
          💰 Fund an AI-Verified Request
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          You are supporting a request approved by Gemini
        </p>

        <div className="mb-4">
          <p className="font-semibold text-lg">
            {request.headline}
          </p>

          {request.text !== request.headline && (
            <p className="text-sm text-gray-600 mt-1">
              {request.text}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-green-600 font-medium">
            Needed: ₹{request.amountNeeded}
          </span>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${flexStyle}`}
          >
            ⚡ Flex {request.flexValue}
          </span>
        </div>

        <input
          type="text"
          value={payerName}
          onChange={(e) => setPayerName(e.target.value)}
          placeholder="Your name"
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          disabled={success}
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount to fund (₹)"
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          disabled={success}
        />

        <button
          onClick={handlePay}
          disabled={success}
          className="
            w-full py-3 rounded-xl
            bg-gradient-to-r from-yellow-400 to-yellow-300
            text-black font-semibold
            transition-all duration-300
            hover:from-yellow-300 hover:to-yellow-200
            hover:scale-[1.02]
            disabled:opacity-60
          "
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

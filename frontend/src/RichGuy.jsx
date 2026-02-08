import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "./config";

export default function RichGuy({ goBack, goRequester }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [payAmount, setPayAmount] = useState("");
  const [payerName, setPayerName] = useState("RichGuy");

  const fetchArena = async () => {
    try {
      const res = await axios.get(`${API_BASE}/arena`);
      setRequests(res.data.requests || []);
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
      <div className="h-screen flex items-center justify-center">
        Loading Arena...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex gap-3 mb-4">
        <button
          onClick={goBack}
          className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
        >
          ← Back to Home
        </button>

        <button
          onClick={goRequester}
          className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
        >
          Make a Request →
        </button>

        <button
          onClick={fetchArena}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          🔄 Reload Feed
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">🔥 Rich Guy Arena</h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {requests.length === 0 && (
          <p className="text-gray-400">No requests yet.</p>
        )}

        {requests.map(req => (
          <div
            key={req.id}
            className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 cursor-pointer hover:bg-gray-700"
            onClick={() => setSelected(req)}   // 🔥 THIS IS THE CRITICAL LINE
          >
            {req.image && (
              <img
                src={`data:image/png;base64,${req.image}`}
                className="w-full max-h-64 object-cover rounded mb-3"
                alt="request"
              />
            )}

            <div className="flex justify-between items-center mb-2">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                {req.category}
              </span>

              <span className="text-sm text-yellow-400">
                Flex: {req.flexValue}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2">
              {req.headline}
            </h3>

            <p className="text-gray-300 text-sm mb-2">
              {req.text}
            </p>

            <p className="text-green-400 font-medium">
              Needed: ₹{req.amountNeeded}
            </p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed bottom-0 left-0 w-full bg-black p-6 text-white border-t border-gray-700 z-50 shadow-2xl">
          <p className="text-yellow-400 font-bold mb-2">💰 PAYMENT PANEL OPEN</p>
          <h2 className="text-xl font-bold mb-2">{selected.headline}</h2>
          <p className="mb-3">{selected.text}</p>

          <p className="text-green-400 mb-2">
            Remaining: ₹{selected.amountNeeded}
          </p>

          <input
            type="text"
            placeholder="Your nickname"
            value={payerName}
            onChange={e => setPayerName(e.target.value)}
            className="p-2 text-black mb-2 w-1/3"
          />

          <br />

          <input
            type="number"
            min="1"
            placeholder="Amount to pay"
            value={payAmount}
            onChange={e => setPayAmount(e.target.value)}
            className="p-2 text-black"
          />

          <div className="mt-4">
            <button
              className="bg-green-500 text-black px-4 py-2 rounded"
              onClick={async () => {
                const amt = Number(payAmount);

                if (!amt || amt <= 0) {
                  alert("Enter valid amount");
                  return;
                }

                const res = await axios.post(`${API_BASE}/fund-request`, {
                  requestId: selected.id,
                  payAmount: amt,
                  payerName
                });

                if (res.data.status === "fully_funded") {
                  alert("Fully funded — removed from arena!");
                } else {
                  alert("Partially funded — remaining ₹" + res.data.remaining);
                }

                setSelected(null);
                setPayAmount("");

                // Reload feed to reflect changes
                await fetchArena();
              }}
            >
              Pay Now
            </button>

            <button
              className="ml-3 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

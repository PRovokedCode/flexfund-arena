import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "./config";

export default function RichGuy({ goBack, goRequester }) {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchArena() {
    try {
      const res = await axios.get(`${API_BASE}/arena`);
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error("Arena fetch failed:", err);
      setRequests([]);   // show empty state instead of freezing
    } finally {
      setLoading(false); // <-- critical fix so it never gets stuck
    }
  }

  fetchArena();                 // load immediately
  const interval = setInterval(fetchArena, 3000); // auto-refresh

  return () => clearInterval(interval);
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
      <h1 className="text-2xl font-bold mb-6"> Rich Guy Arena</h1>

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
      </div>


      <div className="max-w-3xl mx-auto space-y-4">
        {requests.length === 0 && (
          <p className="text-gray-400">No requests yet.</p>
        )}

        {requests.map(req => (
          <div
            key={req.id}
            className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700"
          >
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

            {req.fundedBy ? (
              <div className="mt-3 text-red-400 font-semibold">
                SMASHED BY {req.fundedBy}
              </div>
            ) : (
              <button
                className="mt-3 bg-yellow-500 text-black px-4 py-2 rounded"
              >
                FUND THIS
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

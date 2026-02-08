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
      <div className="h-screen flex items-center justify-center text-gray-400 animate-pulse page-transition">
        Loading AI-verified requests…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 page-transition">
      {/* Top navigation */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 hover:bg-gray-600 transition text-white px-3 py-1 rounded text-sm"
        >
          ← Home
        </button>

        <button
          onClick={() => navigate("/requester")}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-3 py-1 rounded text-sm"
        >
          Make a Request →
        </button>

        <button
          onClick={fetchArena}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-1 rounded text-sm"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Arena header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-extrabold mb-2">
          🔥 Rich Guy Arena
        </h1>
        <p className="text-gray-400 max-w-xl">
          Browse AI-verified requests and fund what you believe in.
          Every request below has passed Gemini’s moderation.
        </p>
      </div>

      {/* Feed */}
      <div className="max-w-3xl mx-auto space-y-8">
        {requests.length === 0 && (
          <p className="text-gray-500 text-center">
            No verified requests yet.
          </p>
        )}

        {requests.map((req) => (
          <div key={req.id} className="animate-fade-in">
            <RequestCard
              image={req.image ? `data:image/png;base64,${req.image}` : null}
              title={req.headline}
              tag={req.category.replace("#", "")}
              flexValue={req.flexValue}
              onFund={() =>
                navigate("/pay", { state: { request: req } })
              }
            />

            {/* Description (avoid duplicate headline/text) */}
            {req.text !== req.headline && (
              <div className="mt-2 text-sm text-gray-300 px-2">
                <p>{req.text}</p>
              </div>
            )}

            <div className="px-2 mt-1">
              <span className="text-green-400 text-sm">
                Needed: ₹{req.amountNeeded}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white page-transition">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-2 animate-fade-in">
        FlexFund Arena
      </h1>

      <p className="text-gray-400 mb-10 text-center max-w-md animate-fade-in-delay">
        Two roles. One arena.  
        AI decides what gets funded.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-5 w-72">
        <button
          onClick={() => navigate("/requester")}
          className="
            bg-indigo-600 py-4 rounded-xl font-semibold text-lg
            transition-all duration-300
            hover:scale-105 hover:bg-indigo-700
            shadow-lg
          "
        >
          🙋 I Have a Request
        </button>

        <button
          onClick={() => navigate("/rich-guy")}
          className="
            bg-yellow-400 text-black py-4 rounded-xl font-semibold text-lg
            transition-all duration-300
            hover:scale-105 hover:bg-yellow-300
            shadow-lg
          "
        >
          💰 I Am the Rich Guy
        </button>
      </div>

      <p className="mt-10 text-xs text-gray-500 animate-pulse">
        Powered by AI moderation
      </p>
    </div>
  );
}

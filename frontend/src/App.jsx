import { useState } from "react";
import Requester from "./Requester";

function App() {
  const [mode, setMode] = useState("landing");

  if (mode === "requester") {
    return <Requester />;
  }

  return (
    <div className="h-screen grid grid-cols-2">
      <div
        onClick={() => setMode("requester")}
        className="bg-indigo-600 text-white flex items-center justify-center text-2xl cursor-pointer"
      >
        I HAVE A REQUEST
      </div>

      <div className="bg-gray-900 text-yellow-400 flex items-center justify-center text-2xl cursor-pointer">
        I AM THE RICH GUY!!
      </div>
    </div>
  );
}

export default App;

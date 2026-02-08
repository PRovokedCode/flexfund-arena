import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RichGuy from "./pages/RichGuy";
import Requester from "./pages/Requester";
import Payment from "./pages/Payment";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rich-guy" element={<RichGuy />} />
        <Route path="/requester" element={<Requester />} />
        <Route path="/pay" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

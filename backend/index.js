import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import arenaRouter from "./routes/arena.js";


const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow images

app.use("/api", arenaRouter);

app.get("/", (req, res) => {
  res.send("FlexFund backend is running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

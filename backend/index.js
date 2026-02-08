import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import arenaRoutes from "./routes/arena.js";

dotenv.config();

const app = express();

app.use(cors());


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", arenaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

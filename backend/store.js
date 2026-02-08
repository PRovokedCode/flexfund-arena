import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert ESM paths properly (works on Windows + Vercel + Render)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to data file (this is the KEY fix)
const DATA_FILE = path.join(__dirname, "data", "requests.json");

export function loadRequests() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      console.log("requests.json missing — creating it at:", DATA_FILE);
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, "[]");
      return [];
    }

    const text = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(text || "[]");
  } catch (err) {
    console.error("❌ ERROR loading requests.json:", err);
    return [];
  }
}

export function saveRequests(requests) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2));
    console.log("✅ Saved to:", DATA_FILE);
  } catch (err) {
    console.error("❌ ERROR saving requests.json:", err);
  }
}

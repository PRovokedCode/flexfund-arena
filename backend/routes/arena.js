import express from "express";
import { moderateRequest } from "../services/gemini.js";
import { requests } from "../store.js";

const router = express.Router();

// POST /api/submit-request
router.post("/submit-request", async (req, res) => {
  const { text, image, amountNeeded } = req.body;

  const result = await moderateRequest(text, image);

  if (!result.approved) {
    return res.json({
      status: "rejected",
      reason: result.reason,
    });
  }

  const newRequest = {
  id: requests.length,
  text,
  image: image || null,
  amountNeeded: amountNeeded || 0,
  category: result.category,
  headline: result.headline,
  flexValue: result.flexValue,
  fundedBy: null,
};

  requests.push(newRequest);

  res.json({
    status: "approved",
    request: newRequest,
  });
});

export default router;

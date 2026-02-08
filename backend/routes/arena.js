import express from "express";
import { moderateRequest } from "../services/gemini.js";
import { loadRequests, saveRequests } from "../store.js";

const router = express.Router();

// Load existing requests from file when server starts
let requests = loadRequests();
let titans = [];   // leaderboard (still in-memory for now)

/* -------------------------------------------------------
   STAGE 1: VERIFY WITH AI (DOES NOT STORE YET)
------------------------------------------------------- */

router.post("/submit-request", async (req, res) => {
  const { text, image, amountNeeded } = req.body;

  const result = await moderateRequest(text, image);

  if (!result.approved) {
    return res.json({
      status: "rejected",
      reason: result.reason,
    });
  }

  // IMPORTANT: DO NOT STORE HERE
  res.json({
    status: "verified",
    aiResult: {
      category: result.category,
      headline: result.headline,
      flexValue: result.flexValue,
      amountNeeded: amountNeeded || 0,
      text,
      image: image || null
    }
  });
});

/* -------------------------------------------------------
   STAGE 2: STORE TO ARENA (PERSIST TO JSON FILE)
------------------------------------------------------- */

router.post("/submit-to-arena", (req, res) => {
  const { aiResult } = req.body;

  const newRequest = {
    id: requests.length,
    ...aiResult,
    fundedBy: null
  };

  requests.push(newRequest);
  saveRequests(requests);   // <-- persist to file

  res.json({
    status: "stored",
    request: newRequest
  });
});

/* -------------------------------------------------------
   GET ARENA FEED (RICH GUY PANEL)
------------------------------------------------------- */

router.get("/arena", (req, res) => {
  requests = loadRequests();  // always reload from file

  res.json({
    requests,
    leaderboard: titans
  });
});

router.post("/fund-request", (req, res) => {
  const { requestId, payAmount, payerName } = req.body;

  // Reload latest from file
  requests = loadRequests();

  const idx = requests.findIndex(r => r.id === requestId);

  if (idx === -1) {
    return res.status(400).json({ error: "Request not found" });
  }

  let reqItem = requests[idx];

  // Reduce amount
  reqItem.amountNeeded -= payAmount;

  if (reqItem.amountNeeded <= 0) {
    // Fully funded → REMOVE from file
    requests.splice(idx, 1);
    saveRequests(requests);

    return res.json({
      status: "fully_funded",
      message: "Request completed and removed from arena"
    });
  } else {
    // Partially funded → update file
    reqItem.fundedBy = payerName;
    saveRequests(requests);

    return res.json({
      status: "partially_funded",
      remaining: reqItem.amountNeeded
    });
  }
});

export default router;

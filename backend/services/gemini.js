import axios from "axios";

export async function moderateRequest(text, imageBase64) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const systemPrompt = `
You are a strict JSON-only responder.  
You MUST return valid JSON and NOTHING else — no explanation, no markdown, no text.

Your role:
1) Safety Bouncer — reject vulgar, hateful, explicit, or illegal content.
2) Librarian — categorize as #Funny, #Creative, #Essential, or #Luxury.
3) Hype-Man — write a short catchy headline.
4) Status Engine — assign a Flex Value from 10–100.
Also consider the requested amount when assigning flexValue.


You MUST return exactly this JSON structure:

{
  "approved": true,
  "reason": "one short sentence",
  "category": "#Funny | #Creative | #Essential | #Luxury",
  "headline": "short catchy headline",
  "flexValue": 10 to 100
}

If content is unsafe, set "approved": false and explain why in "reason".
`;


  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          { text: systemPrompt + "\nUser request: " + text },
          ...(imageBase64
            ? [{ inlineData: { mimeType: "image/png", data: imageBase64 } }]
            : []),
        ],
      },
    ],
  };

  const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`,
  payload
);

  const rawText =
    response.data.candidates[0].content.parts[0].text;

  try {
  return JSON.parse(rawText);
} catch (err) {
  const match = rawText.match(/\{[\s\S]*\}/);
  if (match) {
    return JSON.parse(match[0]);
  }

  return {
    approved: false,
    reason: "AI returned text instead of JSON — try again",
  };
}
}
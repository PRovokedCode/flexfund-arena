# 🧱 Recommended Tech Stack (Locked)

This tech stack is chosen to **maximize speed, real-time feel, stability, and demo reliability** for a hackathon environment.  
It keeps the focus on **AI moderation (Gemini 3) + live social interaction** instead of infrastructure complexity.

---

## 🖥️ Frontend — React + Vite

### Why this is best
- Super fast setup (minutes, not hours)  
- Clean Single Page App (SPA) → perfect for a single-flow arena demo  
- Minimal configuration and boilerplate  
- Smooth performance for animations and leaderboard updates  

### Add-ons
- **Tailwind CSS** → fastest way to build two visual modes:
  - Dark / premium (Rich Guy path)  
  - Clean / vibrant (Requester path)  
- **Framer Motion** → animated leaderboard jumps, glowing names, and “Smashed” effects  
- **Axios / Fetch** → API communication  
- **confetti-canvas (optional)** → visual flex when funding occurs  

### Why not Next.js?
- Overkill for this use case  
- Routing, SSR, and extra config waste time  
- No benefit for a demo-focused hackathon project  

---

## 🔧 Backend — Node.js + Express

### Why this is best
- Minimal boilerplate  
- Easy integration with Gemini 3 API  
- Fast iteration and debugging  
- Excellent for in-memory real-time state  

### Suggested Structure
/server
├─ index.js        // Main entry point
├─ store.js        // In-memory: requests[], titans[]
├─ routes/
│  └─ arena.js     // POST /submit-request, POST /fund-request
└─ services/
   └─ gemini.js    // Gemini moderation, tagging, and flex scoring

### Why not Firebase / Django / FastAPI?
- More setup time  
- No added benefit for this project  
- Increases complexity without improving demo quality  

---

## 🤖 AI — Gemini 3 API (Multimodal)

This is the **brain of the Arena**.

Gemini 3 is used for:
- Hard safety moderation (“Bouncer”)  
- Smart categorization (“Librarian”)  
- Punchy headline generation (“Hype-Man”)  
- Flex value assignment for leaderboard impact  

⚠️ **Important:**  
Gemini must be used as a **moderation + reasoning engine**, not a chatbot.

---

## 🗂️ Database — NONE (In-Memory Only)

Yes. None.

### Why?
- Zero-latency reads/writes to JavaScript arrays  
- Hackathon judges do **not** care about persistence  
- Adding a database = scope creep + bugs + demo risk  

State lives in server memory for the duration of the demo.

---

## ☁️ Deployment

### Frontend
- **Vercel** (preferred) or **Netlify**

### Backend
- **Render** (preferred) or **Railway**

### Why?
- Free tiers  
- Fast deployments  
- Keeps Node process alive for live leaderboard state  

---

## 🧠 Why This Stack Scores High With Judges

### Tech (40%)
- Clear AI moderation and reasoning with Gemini 3  
- Clean separation: UI → API → AI  

### Innovation (30%)
- Stack enables real-time social dynamics  
- AI is visible as bouncer, curator, and status engine  

### Demo (10%)
- Fast load times  
- No authentication friction  
- No payment gateway failures  

Judges hate demos that break.

---

## 🚫 Stacks You Should NOT Use

- ❌ Traditional Databases (SQL/NoSQL)  
- ❌ Authentication systems (Firebase/Auth0)  
- ❌ Real payment gateways (Razorpay, Stripe, etc.)  
- ❌ Blockchain / Web3 (irrelevant)  
- ❌ Microservices (unnecessary complexity)  

---

## 🔒 Final Locked Stack

- **Frontend:** React + Vite + Tailwind CSS (+ Framer Motion)  
- **Backend:** Node.js + Express  
- **AI:** Gemini 3 API (Moderation + Categorization)  
- **Storage:** In-Memory JavaScript Arrays  
- **Deployment:** Vercel (Frontend) + Render (Backend)

This stack is **final** — optimized for speed, stability, and a bulletproof live demo.

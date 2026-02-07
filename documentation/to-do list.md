# ✅ BUILD PLAN — FlexFund Arena (To-Do List)

## Phase 1 — Foundation & AI “Bouncer” Setup 🛠️

- [ ] Initialize **Vite + React** frontend  
- [ ] Initialize **Node.js + Express** backend  
- [ ] Create basic client–server connection (test ping endpoint)  

### Gemini 3 Integration  
- [ ] Set up Gemini 3 API keys in backend  
- [ ] Create `services/gemini.js`  
- [ ] Write system prompt for:
  - safety filtering  
  - categorization  
  - headline generation  

### In-Memory State  
- [ ] Create `store.js` with:
  - `const requests = []`
  - `const titans = []`

### API Architecture  
- [ ] Create endpoint:  
  - `POST /submit-request`  
- [ ] Connect this endpoint to Gemini moderation flow  

---

## Phase 2 — Requester Path (Submission & AI Logic) 📝  

### UI  
- [ ] Build split landing page:
  - “I have some REQUESTS”
  - “I AM THE RICH GUY!!”

- [ ] Create Requester submission card with:
  - text input  
  - image upload  
  - submit button  

### AI Feedback UI  
- [ ] Add “Moderation in Progress” overlay  
- [ ] Show animated dots / spinner while Gemini processes  

### Results Display  
- [ ] Display AI-assigned category:
  - `#Funny`, `#Essential`, `#Creative`, etc.  
- [ ] Show short AI headline for approved requests  
- [ ] Push approved requests to Arena Feed  

---

## Phase 3 — Rich Guy Path (Feed & Leaderboard) 💰  

### Arena Feed  
- [ ] Build vertical scrolling feed  
- [ ] Each card shows:
  - image  
  - AI headline  
  - category tag  
  - “Fund” button  

### Leaderboard  
- [ ] Create **Titan Leaderboard** component  
- [ ] Show top 10 nicknames + Flex Score  
- [ ] Keep leaderboard visible at all times  

### Funding Logic  
- [ ] Add endpoint:
  - `POST /fund-request`  
- [ ] Update `titans[]` in memory  
- [ ] Recalculate rankings on each fund  

### Visual Updates  
- [ ] Mark funded cards as:
  - “Smashed by [Nickname]”  
- [ ] Prevent double funding of same request  

---

## Phase 4 — Visual Polish & “Flex” Factor ✨  

### Themes  
- [ ] Dark Mode + Gold/Emerald accents for Rich Guy path  
- [ ] Blue/Indigo vibrant theme for Requester path  

### Animations  
- [ ] Add Framer Motion:
  - leaderboard rank jumps  
  - card transitions  
  - glowing names  

### Confetti / Celebration  
- [ ] Trigger gold confetti when:
  - user reaches #1  
- [ ] Subtle animation when funding any request  

### AI Edge Cases  
- [ ] Test with:
  - a clearly vulgar request → must be rejected  
  - a weird but safe request → should pass  
  - a normal essential request → approved  

---

## Phase 5 — Deployment & Demo Ready 🏁  

### Hosting  
- [ ] Deploy backend to **Render**  
- [ ] Verify in-memory state persists while server is live  

- [ ] Deploy frontend to **Vercel**  
- [ ] Connect frontend to deployed backend  

### Demo Scenarios (Prepare in advance)  
- [ ] Scenario 1 — **Essential request**  
- [ ] Scenario 2 — **Funny request**  
- [ ] Scenario 3 — **Vulgar request (rejected)**  

### Final Checks  
- [ ] No crashes when funding multiple times  
- [ ] Leaderboard updates instantly  
- [ ] AI moderation feels visible  
- [ ] Animations are smooth  
- [ ] Page loads fast  


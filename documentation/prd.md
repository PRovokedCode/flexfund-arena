# 📄 PRD — FlexFund: The AI Request Arena

> A two-sided, AI-moderated social arena where funding requests become a game of status, competition, and visibility.

---

## 1. Problem Statement

Existing request and crowdfunding platforms fall into two extremes:

- **Overly serious** — clinical, charity-focused, emotionally heavy
- **Completely unmoderated** — chaotic, unsafe, and low-quality

### Key Gaps

- **Requesters** lack a low-friction sandbox where they can ask for *anything*  
  (from essential tools to creative or funny requests) **without begging**.

- **Wealthy or high-spending users** lack an engaging, high-visibility way to:
  - compete socially
  - gain recognition
  - “flex” their ability to fund others

There is no platform where **AI moderates quality** while **social status drives engagement**.

---

## 2. Solution Overview

**FlexFund** is a dual-path web application designed as a **social request arena**, not a charity platform.

### Two Parallel Experiences

#### 👑 The Rich Guy Path (Payers)
A competitive, high-energy environment where funding requests is a **status game**.
Users climb a public leaderboard by funding AI-curated requests.

#### 📝 The Requester Path
A creative, low-pressure space where users submit *any request* and let AI decide:
- if it’s allowed
- how it’s categorized
- how it’s presented

### 🤖 The Gemini Filter
**Gemini 3** acts as:
- a **Bouncer** → safety & moderation
- a **Librarian** → categorization & summarization
- a **Status Engine** → assigns clout value

---

## 3. Target Users

### 👑 The “Rich Guys” (Payers)

**Profile**
- Individuals seeking social recognition or entertainment
- Not motivated by charity, but by visibility and competition

**Motivation**
- Dominating the leaderboard
- Public recognition (“Smashed by X”)
- The social *flex* of funding requests

---

### 📝 The Requesters

**Profile**
- Students, creators, pranksters, or anyone with a small idea or need

**Motivation**
- Fast funding without emotional manipulation
- Creative freedom
- No stigma of begging or charity framing

---

## 4. Core User Flows

### Flow A — The Split (Entry Point)

User lands on a bold split-screen entry:

- **Left:** “I have some REQUESTS”
- **Right:** “I AM THE RICH GUY!!”

Each choice leads to a distinct experience.

---

### Flow B — The Requester (Input & AI Moderation)

1. User submits:
   - text
   - image (optional)

2. **Gemini 3 processes the request in real time**:

   - **Safety Check**
     - Blocks vulgarity, hate speech, explicit or illegal content

   - **Categorization**
     - Tags request (e.g. `#Funny`, `#Creative`, `#Essential`, `#Luxury`)

   - **Summarization**
     - Converts raw input into a short, feed-friendly headline

3. If approved, the request is published to the **Arena Feed**.

---

### Flow C — The Rich Guy (Browsing & Dominating)

1. User enters the **VIP Arena Feed** (social-media style scroll)

2. User sees the **Titan Leaderboard**
   - Top 10 Rich Guys ranked by total **Flex Score**

3. User clicks **“Fund”** on a request card

4. **Instant Feedback**
   - Leaderboard rank updates
   - Username glows / animates
   - Request marked:
     > “Smashed by [User Name]”

---

## 5. Gemini 3 Responsibilities (CRITICAL)

Gemini is the **core infrastructure**, not a chatbot.

### Mandatory Responsibilities

- **The No-Go Filter**
  - Hard rejection of harmful, explicit, hateful, or illegal content

- **Contextual Judgment**
  - Distinguishes:
    - Funny vs Vulgar
    - Weird vs Unsafe

- **Tone Matching**
  - Rewrites dull user input into punchy, feed-ready hooks

- **Categorization**
  - Assigns meaningful tags for browsing and discovery

- **Status Assignment**
  - Calculates a **Flex Value**
  - Higher Flex Value = more leaderboard impact when funded

---

## 6. Non-Goals (Explicit)

To keep the hackathon scope tight:

- ❌ Real payments (all funding is simulated)
- ❌ KYC or authentication
- ❌ Persistent accounts
- ❌ Databases or long-term storage
- ❌ Financial compliance features

Users choose a nickname; data lives only for the demo session.

---

## 7. Success Criteria (Judging-Focused)

### 🔥 Wow Factor
- A Rich Guy funds a request
- Their name jumps to the top of the leaderboard
- Gold animations and instant feedback

### 🛡️ Safety Factor
- Gemini rejects a clearly bad request
- Gemini approves a weird but safe one
- Moderation is visible and explainable

### 🚀 Innovation
- AI acts as:
  - social bouncer
  - content curator
  - status engine
- Not just text generation

---

## ⚠️ Disclaimer

FlexFund uses **AI-assisted moderation and categorization**.  
All funding is simulated and intended solely for hackathon demonstration.

---

**FlexFund reimagines requests not as charity — but as a competitive, AI-moderated social arena.**

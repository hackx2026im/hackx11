# hackX 11.0 🚀

> **Sri Lanka's Premier Inter-University Startup Challenge**  
> Organized by the Industrial Management Science Students' Association (IMSSA) at the Department of Industrial Management, University of Kelaniya.

hackX 11.0 is a state-of-the-art landing page website built with **Next.js (v16.2.9)**, **Tailwind CSS (v4.0)**, **TypeScript**, and **Framer Motion**. It features premium glassmorphic UI components, smooth animations, an interactive AI chatbot, and a custom-built chromeless video player.

---

## 🌟 Key Features

### 1. Custom Vimeo Video Player
* **Chromeless Layout:** The player is embedded with `controls=0` to hide native playbars and the default "Click to Unmute" banner, leaving a completely clean video frame.
* **Interactive Control Overlay:** Features custom glassmorphic controls (Play/Pause, Mute/Unmute, and Fullscreen toggle) styled to match the dark neon website theme.
* **Timeline scrubbing:** Includes an interactive timeline progress bar with a hover dot thumb, allowing users to scrub to specific video timestamps.
* **Synchronized Timestamps:** Displays real-time digital duration counters (e.g., `1:24 / 3:45`) calculated via the Vimeo postMessage events.
* **Reliable Handshake Polling:** Connects via postMessage with an active startup loop that polls the iframe every `800ms` to resolve loading races and hydrate securely.

### 2. Intelligent AI Chatbot
* **Contextual API Integration:** Communicates with the `hackx-bot` backend service (`POST /api/chat/x` endpoint) using unique session tokens.
* **Welcoming Greetings:** Displays a professional onboarding message from the AI on startup.
* **Offline Smart Fallbacks:** Includes local keyword-matching backup logic (covering rules, fees, dates, registration, and coordinators) to maintain visitor engagement when the API backend is offline.
* **Rich Text Formatting:** Custom client-side markdown formatter rendering bold statements (`**text**`) and external anchor links safely.

### 3. Infinite Organizers Carousel
* **Auto-Scrolling Grid:** Displays the Organizing Committee in a custom native infinite scroll carousel with automatic time-based advancement.
* **Border Glow Effects:** The cards are wrapped in a high-fidelity border glow component (`BorderGlow.tsx`) that reacts dynamically.

### 4. Interactive Preloader
* **Smooth Intro:** Integrates a preloader component (`SitePreloader.tsx`) to guarantee a premium entry transition when visitors load the homepage.

---

## 🛠️ Technology Stack

* **Framework:** Next.js 16.2.9 (App Router)
* **Runtime / Compiler:** React 19.2.4 & Turbopack
* **Styling:** Tailwind CSS 4.3.2 & PostCSS
* **Animation:** Framer Motion 12.42.1
* **Smooth Scrolling:** Lenis 1.3.25
* **Player Integration:** Vimeo Player API (`@vimeo/player` & postMessage)
* **Language:** TypeScript 5.9.3

---

## 📂 Directory Structure Highlights

```text
├── public/                 # Static assets (images, logos, PDF booklet)
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styling, Lenis overrides, & custom scrollbars
│   │   ├── layout.tsx      # Root metadata & Clarity analytics script
│   │   └── page.tsx        # Section structure & landing entry point
│   ├── components/
│   │   ├── NavBar.tsx      # Responsive header with smooth anchor navigation
│   │   ├── Hero.tsx        # Title block with Learn More scroll CTA
│   │   ├── NewSection2.tsx # About hackX narrative, stats, and Vimeo video player
│   │   ├── AskAISection.tsx# Chatbot UI interface & markdown formatter
│   │   ├── TeamSection.tsx # Organizing committee carousel with BorderGlow cards
│   │   └── ui/
│   │       ├── VimeoPlayer.tsx # Vimeo controller logic
│   │       └── BorderGlow.tsx  # Dynamic custom cards border canvas
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory by copying the `.env.example` template:

```bash
cp .env.example .env
```

Define the following environment variables:

```ini
# Registration Portal Redirection
NEXT_PUBLIC_REGISTRATION_URL=https://portal.hackx.lk/register

# Campus Ambassador Redirection
NEXT_PUBLIC_AMBASSADOR_URL=https://portal.hackx.lk/ambassador

# Chatbot API base URL (Backend app main:app running on port 8000)
NEXT_PUBLIC_CHATBOT_API_URL=http://127.0.0.1:8000
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* pnpm (recommended) or npm / yarn

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/jtharindudhanushka/hackx11.git
   cd hackx11
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running Locally

To launch the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

To build the project for production deployment:

```bash
pnpm build
```

To run the built production bundle locally:

```bash
pnpm start
```

---

## 📄 License & Ownership

This website, including its design, codebase, media assets, graphics, and interactive components, is the exclusive proprietary property of the **Industrial Management Science Students' Association (IMSSA)**, University of Kelaniya.

* **Proprietary & Confidential:** All rights are strictly reserved.
* **Usage Restrictions:** You may not copy, modify, distribute, clone, or repurpose this website, its source code, or any of its design elements for another event, hackathon, or commercial purpose without prior explicit written permission from IMSSA.

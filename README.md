# ⚡ CreLynk — Early Access (v1)

<div align="center">

  [![Live Version](https://img.shields.io/badge/🌐%20Production%20Website-crelynk.in-00D9FF?style=for-the-badge&logo=googlechrome&logoColor=black)](https://crelynk.in)
  [![V1 Deployment](https://img.shields.io/badge/🚀%20V1%20Early%20Access%20App-Vercel%20Live-FF2D78?style=for-the-badge&logo=vercel&logoColor=white)](https://crelynk-pre-launch-landing-page-1-5rjn4us1z.vercel.app)
  [![License](https://img.shields.io/badge/License-Proprietary-C6FF00?style=for-the-badge&logo=shield&logoColor=black)](LICENSE)

  <p align="center">
    <strong>The next-generation creator-brand-localite matchmaking and collaboration ecosystem built for the Indian Creator Economy.</strong>
  </p>

  <p align="center">
    <a href="#-live-deployments">Live Deployments</a> •
    <a href="#-about-the-platform">About</a> •
    <a href="#-use-cases">Use Cases</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-architecture--key-features">Architecture</a> •
    <a href="#-local-development">Development</a> •
    <a href="#-founder--engineering">Founder Note</a>
  </p>

  <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />

</div>

---

## 🌐 Live Deployments

| Environment | Description | Link |
| :--- | :--- | :--- |
| **Production (Latest Version)** | Official live website with expanded features & brand presence | 🔗 **[crelynk.in](https://crelynk.in)** |
| **V1 Early Access (This Repo)** | Pre-launch early access portal with waitlist & interactive onboarding | 🔗 **[crelynk-pre-launch-landing-page-1-5rjn4us1z.vercel.app](https://crelynk-pre-launch-landing-page-1-5rjn4us1z.vercel.app)** |

---

## 💡 About CreLynk

Today's creator-brand collaboration in India is fragmented, inefficient, and opaque:
- Creators get ghosted, face delayed payments, and lack structured financial bookkeeping.
- Startups and D2C brands pay legacy agencies exorbitant fees (₹1L–₹3L/month) for simple matchmaking that should cost a fraction.
- Local brick-and-mortar businesses (cafes, gyms, salons) struggle to reach real neighbourhood creators without getting scammed by bot-heavy profiles.

**CreLynk solves this from the ground up:**
1. **Direct Matchmaking Engine**: Algorithmically pairs creators with brands and local businesses by niche, geography, and authentic engagement.
2. **Escrow-Secured Payments**: Instant payout guarantees eliminating payment delays and fraud on both sides.
3. **Automated Creator Financials**: Integrated income tracking, referral incentives, and ready-to-file GST invoicing.
4. **Hyper-Local Focus**: Tailored specifically for creators and localites across Tier 1, Tier 2, and emerging Indian hubs.

---

## 🎯 Use Cases

```
                        ┌─────────────────────────────────┐
                        │      CreLynk Core Platform      │
                        └───────────────┬─────────────────┘
         ┌──────────────────────────────┼──────────────────────────────┐
         ▼                              ▼                              ▼
┌───────────────────┐        ┌───────────────────┐        ┌───────────────────┐
│     Creators      │        │  Brands & D2C     │        │   Localites       │
├───────────────────┤        ├───────────────────┤        ├───────────────────┤
│ • Early Waitlist  │        │ • Creator Search  │        │ • Hyperlocal ads  │
│ • Escrow Payouts  │        │ • Escrow Campaigns│        │ • Store Footfall  │
│ • Pitch Decks     │        │ • Fraud Detection │        │ • Verified Collabs│
│ • Income Invoices │        │ • Budget Control  │        │ • Neighborhood PR │
└───────────────────┘        └───────────────────┘        └───────────────────┘
```

### 1. 🎨 Creators & Influencers
- Build high-converting profiles and join the verified early access network.
- Receive direct pitches and collaboration requests from vetted brands.
- Automatic milestone tracking with escrow releases — no more unpaid deliverables.
- Built-in referral tracking and exclusive early adopter perks.

### 2. 🏢 Brands & Startups
- Eliminate agency commissions and discover genuine creators filtered by target audience and verified metrics.
- Launch targeted campaigns with milestone-based budget allocation.
- Manage deliverables, approvals, and performance metrics in one unified dashboard.

### 3. ☕ Localites (Neighborhood Businesses)
- Connect cafes, gyms, boutique studios, and retail outlets with hyper-local content creators in their immediate vicinity.
- Drive verifiable footfall through geo-targeted micro-influencer campaigns.

### 4. 🎓 Campus & Community Ambassadors
- Empowers student leaders across universities to onboard regional talent, run campus campaigns, and earn platform incentives.

---

## 🛠 Tech Stack

### Frontend & UI Engineering
- **Core Library**: [React 19](https://react.dev/) (Concurrent rendering, server components readiness, optimized state transitions)
- **Build Tool**: [Vite 7](https://vitejs.dev/) with lightning-fast HMR and ESM bundling
- **Type Safety**: [TypeScript 5.9](https://www.typescriptlang.org/) with strict type boundaries
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom neo-brutalist theme tokens and responsive layouts
- **Motion & Micro-Interactions**:
  - [Framer Motion 12](https://www.framer.com/motion/) for declarative page transitions, card gestures, and layout morphing
  - [GSAP 3](https://greensock.com/gsap/) for high-performance scroll triggers and bespoke timelines
- **Icons & UI Components**: [Lucide React](https://lucide.dev/), [Swiper](https://swiperjs.com/) for fluid touch carousels

### Backend & Cloud Infrastructure
- **Database & Auth**: [Supabase](https://supabase.com/) (Managed PostgreSQL)
- **Database Security**: Granular PostgreSQL Row-Level Security (RLS) policies for waitlist registrations, coupon codes, and referral tracking
- **Hosting & Deployment**: [Vercel](https://vercel.com/) with global edge network distribution and automated CI/CD

---

## 🏛 Architecture & Engineering Highlights

- **Neo-Brutalist Visual Design System**:
  High-contrast borders (`#111`), vibrant retro-modern accents (`#00D9FF` cyan, `#FF2D78` magenta, `#C6FF00` lime, `#7B61FF` purple), and tactile sticker badges.
- **Route-Level Code Splitting**:
  Configured with `React.lazy` and an animated `RouteFallback` boundary to ensure minimal initial bundle sizes and fast First Contentful Paint (FCP).
- **Hardened Database Policies**:
  Custom SQL migrations (`database/rls-hardening.sql`, `database/schema-alignment.sql`, `database/setup-referral-policies.sql`) guaranteeing that user submissions and referral counts are securely isolated.
- **Strict Environment Zero-Exposure**:
  Configured `.gitignore` guarantees that all live keys (`.env`, `.env.local`, `.env.*.local`) remain strictly local and are never committed to public or private version control.

---

## 💻 Local Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm, yarn, or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/Parth-1808/crelynk-early-acess.git
cd crelynk-early-acess
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Copy the `.env.example` file to create your local environment file:
```bash
cp .env.example .env.local
```

Configure your Supabase credentials in `.env.local`:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 5. Production build
```bash
npm run build
npm run preview
```

---

## 👨‍💻 Founder & Engineering

<div align="center">

### Built & Solo-Engineered by **Parth Bachhav**
**Founder, CEO & CTO — CreLynk**

*Architected, designed, and developed end-to-end: from UI/UX design and motion system to frontend architecture, database schema design, and cloud deployment.*

> *"If it takes > 2 clicks, I'm rewriting the code. 💻⚡"*

[![Instagram](https://img.shields.io/badge/Instagram-@l__parthhh-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/l__parthhh?igsh=N2RzcXh5YmMwYW91)
[![Email](https://img.shields.io/badge/Contact-crelynk.in@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:crelynk.in@gmail.com?subject=Crelynk%20Founder%20Access)

</div>

---

<div align="center">
  <p><strong>© 2026 CreLynk Technologies. All Rights Reserved.</strong></p>
  <p>Building with the community, not above it.</p>
</div>

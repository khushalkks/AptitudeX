<div align="center">

# 🧠 AptitudeX

### *Your AI-Powered Career Command Center*

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)

<br/>

> **Land your dream job 10x faster.**  
> AptitudeX combines AI-driven resume analysis, intelligent job tracking, real-time salary insights, personalized learning roadmaps, and mock interviews — all in one beautifully crafted platform.

<br/>

[🚀 Get Started](#-getting-started) · [✨ Features](#-features) · [🏗️ Architecture](#%EF%B8%8F-architecture) · [📡 API Reference](#-api-reference) · [🤝 Contributing](#-contributing)

---

</div>

<br/>

## 🎯 What is AptitudeX?

AptitudeX is a **full-stack career acceleration platform** built for job seekers, students, and professionals who want to stand out in a competitive job market. It leverages cutting-edge AI models from **OpenAI, Cohere, Google Gemini, and Groq** to provide actionable insights at every step of your career journey.

<br/>

## ✨ Features

<table>
<tr>
<td width="50%">

### 📄 AI Resume Analysis
- **ATS Scoring** — Get instant compatibility scores against job descriptions
- **Smart Keyword Extraction** — Identify missing keywords that matter
- **Semantic Matching** — Context-aware analysis beyond simple keyword matching
- **Intelligent Suggestions** — AI-powered bullet point rewrites and section improvements

</td>
<td width="50%">

### 🎯 Job Application Tracker
- **Centralized Dashboard** — Track every application status in one place
- **Visual Pipeline** — See your applications flow through stages
- **Trend Analytics** — Understand your application patterns and success rates
- **Real-Time Updates** — Socket.io powered live notifications

</td>
</tr>
<tr>
<td width="50%">

### 💰 Salary Intelligence
- **Real-Time Estimates** — Market salary data powered by RapidAPI JSearch
- **Role Comparison** — Compare salaries across roles, locations, and experience levels
- **Negotiation Insights** — Know your worth before walking into an interview

</td>
<td width="50%">

### 🗺️ Personalized Learning Roadmaps
- **AI-Generated Paths** — Tailored learning journeys for your target role
- **Curated Resources** — YouTube tutorials, Udemy courses, and more
- **Progress Tracking** — Monitor your skill mastery over time

</td>
</tr>
<tr>
<td width="50%">

### 🎤 Mock Interviews
- **AI Question Generation** — Role-specific technical and behavioral questions
- **Instant Feedback** — Get scored and evaluated in real-time
- **Multi-Role Support** — Frontend, Backend, Full Stack, Data Science, DevOps, UI/UX, and more

</td>
<td width="50%">

### 📊 Analytics Dashboard
- **Career Insights** — Visualize job search progress and skill trends
- **Resume Performance** — Track how your resume improves over time
- **Strengths & Gaps** — Identify areas for growth with data-driven insights

</td>
</tr>
<tr>
<td width="50%">

### 🐙 GitHub Portfolio Analyzer
- **Metrics Aggregation** — Aggregate repository counts, stars, and cloned fork statistics
- **Language Breakdown** — Interactive breakdown showing language distribution percentages
- **Highlight Projects** — Showcase top repositories with direct codebase source links
- **AI Code Audit** — Leverage Gemini and Cohere AI to generate complete career audits and role suggestions

</td>
<td width="50%">

### 📱 Mobile Responsive Layout
- **Adaptive Sidebar** — Collapsible sidebar rail on desktop that translates into a slide-drawer overlay on mobile
- **Floating Mobile Toggle** — Clean floating toggle buttons appearing automatically under narrow viewports
- **Fluid Grid Scaling** — Custom paddings and layout scaling to make all insights card containers look professional on any device width

</td>
</tr>
</table>

<br/>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|:---:|:---|
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socket.io&logoColor=white) |
| **AI / ML** | ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white) ![Google](https://img.shields.io/badge/Gemini-4285F4?style=flat-square&logo=google&logoColor=white) ![Cohere](https://img.shields.io/badge/Cohere-FF6F61?style=flat-square) ![Groq](https://img.shields.io/badge/Groq-000000?style=flat-square) |
| **Auth** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) ![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=flat-square&logo=google&logoColor=white) |
| **APIs** | ![RapidAPI](https://img.shields.io/badge/RapidAPI-0055DA?style=flat-square&logo=rapidapi&logoColor=white) ![YouTube](https://img.shields.io/badge/YouTube_API-FF0000?style=flat-square&logo=youtube&logoColor=white) |

</div>

<br/>

## 🏗️ Architecture

```
AptitudeX/
├── 📁 frontend/          # Landing page & auth (React + Vite)
│   ├── src/components/   # Hero, Features, Login, SignUp, ChatBot
│   └── src/utils/        # API helpers
│
├── 📁 dashboard/         # Main app dashboard (React + Vite)
│   ├── src/pages/        # Dashboard, ResumeTracker, MockInterviews, etc.
│   ├── src/components/   # Sidebar, Charts, Cards, ChatBot
│   └── src/hooks/        # Auth & API hooks
│
├── 📁 backend/           # Express API server
│   ├── controllers/      # Auth, Resume, Interview, Job controllers
│   ├── models/           # Mongoose schemas (User, Resume, JobRole, etc.)
│   ├── routes/           # RESTful API routes
│   ├── middleware/       # JWT auth middleware
│   └── utils/            # AI processors, ATS calculator, file parsers
│
└── 📄 README.md
```

<br/>

## 🌐 Production Deployment
For complete production deployment guidelines using services like MongoDB Atlas, Render, and Vercel, check out our detailed [Deployment & Connection Guide](deployment_guide.md).

<br/>

## ⚡ Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **MongoDB Atlas** account (or local MongoDB)
- API keys for AI services (see [Environment Variables](#-environment-variables))

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/khushalkks/AptitudeX.git
cd AptitudeX
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env    # Fill in your API keys
npm run dev             # Starts on http://localhost:5000
```

### 3️⃣ Frontend (Landing Page)

```bash
cd frontend
npm install
npm run dev             # Starts on http://localhost:5173
```

### 4️⃣ Dashboard

```bash
cd dashboard
npm install
npm run dev             # Starts on http://localhost:5174
```

<br/>

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory (see `.env.example`):

| Variable | Description | Required |
|:---|:---|:---:|
| `MONGODB_URI` | MongoDB Atlas connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT token signing | ✅ |
| `OPENROUTER_API_KEY` | OpenRouter API for ChatBot | ✅ |
| `COHERE_API_KEY` | Cohere API for ATS analysis | ✅ |
| `OPENAI_API_KEY` | OpenAI API for resume parsing | ⬚ |
| `GEMINI_API_KEY` | Google Gemini for mock interviews | ⬚ |
| `GROQ_API_KEY` | Groq API for LLaMA feedback | ⬚ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ⬚ |
| `RAPIDAPI_KEY` | RapidAPI for salary & job data | ⬚ |
| `YOUTUBE_API_KEY` | YouTube Data API for learning resources | ⬚ |

<br/>

## 📡 API Reference

<details>
<summary><b>🔐 Authentication</b></summary>

| Method | Endpoint | Description |
|:---:|:---|:---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login with email & password |
| `POST` | `/api/auth/google` | Login with Google OAuth |

</details>

<details>
<summary><b>📄 Resume Analysis</b></summary>

| Method | Endpoint | Description |
|:---:|:---|:---|
| `POST` | `/api/resumes/upload` | Upload a resume (PDF/DOCX) |
| `GET` | `/api/resumes/:id/analyze/:jobRoleId` | Analyze resume against a job role |

</details>

<details>
<summary><b>💼 Jobs & Salary</b></summary>

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/jobs` | Search job listings |
| `POST` | `/api/salary/estimate` | Get salary estimates |
| `GET` | `/api/salary/search` | Search salary data |

</details>

<details>
<summary><b>🎤 Mock Interviews</b></summary>

| Method | Endpoint | Description |
|:---:|:---|:---|
| `POST` | `/api/mock/generate-question` | Generate interview questions |
| `POST` | `/api/mock/evaluate-answer` | Evaluate an answer with AI |

</details>

<details>
<summary><b>📚 Learning & Analytics</b></summary>

| Method | Endpoint | Description |
|:---:|:---|:---|
| `POST` | `/api/learning/generate-roadmap` | Generate personalized roadmap |
| `GET` | `/api/analytics/dashboard` | Get analytics data |
| `GET` | `/api/job-roles` | List all job roles |

</details>

<details>
<summary><b>🐙 GitHub Portfolio Analyzer</b></summary>

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/github/analyze/:username` | Query live GitHub statistics and generate AI career audit |

</details>

<br/>

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

<br/>

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<br/>

## 🙏 Acknowledgements

<div align="center">

[OpenAI](https://openai.com) · [Cohere](https://cohere.com) · [Google Gemini](https://ai.google.dev) · [Groq](https://groq.com) · [RapidAPI](https://rapidapi.com) · [MongoDB Atlas](https://mongodb.com/atlas) · [Socket.io](https://socket.io)

</div>

---

<div align="center">

**Built with ❤️ by [Khushal](https://github.com/khushalkks)**

⭐ Star this repo if you found it useful!

</div>

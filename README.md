# FinPulse AI — Smart Personal Finance Tracker

A full-stack, AI-assisted personal finance web app: track income and expenses, set budgets, chase savings goals, scan receipts, get spending insights generated from your own transaction history, and export monthly reports — all wrapped in a glassmorphism fintech UI with light/dark mode.

![Stack](https://img.shields.io/badge/stack-MERN-6C5CE7)

---

## ✨ Features

| Area | What it does |
|---|---|
| **Auth** | JWT-based register/login, protected routes, change password, delete account (cascades all user data) |
| **Dashboard** | Balance, income/expense, savings, Financial Health Score, 6-month trend chart, category pie chart, savings growth, recent transactions, quick-add actions |
| **Transactions** | Full CRUD, search (description/category/merchant), filter by type/category/payment method/amount/date range, sortable columns, pagination |
| **Budgets** | Per-category or overall monthly budgets, live usage tracking, 80% warning + exceeded states, month/year selector |
| **Savings Goals** | Create/track/contribute to goals, progress bars, estimated completion date |
| **Receipt Scanner** | Client-side OCR (Tesseract.js) — upload a photo, auto-extracts merchant/amount/date/category into the transaction form |
| **AI Spending Coach** | 100% rule-based, computed from *your* data — no external API key needed. Month-over-month category comparisons, budget adherence, savings-potential tips, recurring-overspend detection, weekly suggestions |
| **Financial Health Score** | 0–100 score from savings rate, budget adherence, expense consistency, income stability, and emergency-fund coverage, with strengths/weaknesses/suggestions |
| **Expense Prediction** | Weighted 3-month average forecast per category, shown as a bar chart |
| **Bill Reminders** | Recurring bills (weekly/monthly/yearly/one-time), reminder stages at 7 days / 3 days / due today / overdue, "mark as paid" advances the next due date |
| **Notifications** | Live-synced (no cron needed): budget exceeded/warning, goal achieved, bill due soon, large expense alert, top AI recommendation — with read/unread state |
| **Reports** | Monthly + yearly summaries, charts, and one-click **PDF** and **Excel** export (transactions, budgets, savings, insights) generated entirely client-side |
| **Settings** | Profile, currency, dark mode toggle, change password, delete account |
| **UI** | Glassmorphism cards, gradient accents, dark/light mode, mobile-first responsive layout, tabular-numeral money formatting |

---

## 🧱 Tech Stack

**Frontend:** React 18 (Vite), Tailwind CSS, React Router, Recharts, Axios, Lucide icons, Tesseract.js (OCR), jsPDF + jspdf-autotable, SheetJS (xlsx)
**Backend:** Node.js, Express, Mongoose (MongoDB), JWT, bcryptjs
**Database:** MongoDB (Atlas or local)

---

## 📁 Project Structure

```
finpulse-ai/
├── backend/
│   ├── config/db.js                 # MongoDB connection
│   ├── models/                      # User, Transaction, Budget, SavingsGoal, Bill, Notification
│   ├── controllers/                 # Route handlers (business logic)
│   ├── routes/                      # Express routers
│   ├── middleware/                  # auth (JWT), errorHandler
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── insightsEngine.js        # Rule-based AI insights + health score + predictions
│   ├── seed/seedData.js             # Demo user + realistic sample data
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/axios.js             # Axios instance + JWT interceptor
│   │   ├── context/                 # AuthContext, ThemeContext
│   │   ├── components/
│   │   │   ├── layout/               # Sidebar, Navbar, DashboardLayout
│   │   │   ├── charts/               # Trend / Pie / Savings / Prediction charts
│   │   │   └── ui/                   # Modals, cards, forms
│   │   ├── pages/                    # Dashboard, Transactions, Budgets, SavingsGoals,
│   │   │                             # Bills, AIInsights, Reports, Settings, Login, Register
│   │   ├── utils/reportExport.js     # Client-side PDF/Excel report builder
│   │   ├── App.jsx / main.jsx / index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB connection string — either a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster or a local `mongod` instance.

### 1. Clone and install

```bash
git clone <your-repo-url> finpulse-ai
cd finpulse-ai

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment variables

**backend/.env** (copy from `backend/.env.example`):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/finpulse
JWT_SECRET=replace_with_a_long_random_secret_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**frontend/.env** (copy from `frontend/.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. (Optional) Seed demo data

Populates a demo account with ~4 months of realistic transactions, budgets, and savings goals so the dashboard, charts, and AI insights all have something to show immediately.

```bash
cd backend
npm run seed
```
This creates:
- **Email:** `demo@finpulse.ai`
- **Password:** `Demo@1234`

### 4. Run the app

```bash
# Terminal 1 — backend (http://localhost:5000)
cd backend
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd frontend
npm run dev
```

Open `http://localhost:5173`, log in with the demo account (or register your own), and explore.

---

## 🔌 API Overview

All routes below (except `/auth/register` and `/auth/login`) require an `Authorization: Bearer <token>` header.

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in, returns JWT |
| GET/PUT | `/api/auth/me` | Get / update profile |
| PUT | `/api/auth/change-password` | Change password |
| DELETE | `/api/auth/me` | Delete account (cascades data) |
| GET/POST | `/api/transactions` | List (search/filter/sort/paginate) or create |
| GET/PUT/DELETE | `/api/transactions/:id` | Get, update, or delete one |
| GET/POST | `/api/budgets` | List (with live usage) or set a budget |
| DELETE | `/api/budgets/:id` | Delete a budget |
| GET/POST | `/api/savings` | List or create a savings goal |
| PUT/DELETE | `/api/savings/:id` | Update (e.g. contribute) or delete |
| GET | `/api/bills`, `/api/bills/upcoming` | List bills / bills needing a reminder |
| POST/PUT/DELETE | `/api/bills...` | Create, update, mark paid, delete |
| GET | `/api/dashboard` | Aggregated cards + chart data |
| GET | `/api/insights` | AI insight cards, weekly suggestions, monthly summary |
| GET | `/api/insights/health-score` | Financial Health Score breakdown |
| GET | `/api/insights/predictions` | Next-month expense predictions |
| GET/PUT | `/api/notifications` | List / mark-as-read notifications |

---

## 🧠 How the "AI" works

There's no external LLM call — the **AI Spending Coach** and **Financial Health Score** are deterministic, explainable rules run over your own transactions in `backend/utils/insightsEngine.js`:
- Month-over-month category deltas (±20% triggers an insight)
- Budget adherence (80% warning, 100%+ exceeded)
- Top-category savings-potential tip (15% trim suggestion)
- Recurring-overspend detection across consecutive months
- Health score = weighted savings rate + budget adherence + expense consistency + income stability + emergency-fund coverage

This keeps the feature fully functional out of the box, with no API key required. If you'd like to swap in a real LLM later, `getInsights` in `insightsController.js` is the place to do it.

---

## 🌍 Deployment

**Database — MongoDB Atlas**
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas/register).
2. Add a database user and allow network access (or `0.0.0.0/0` for simplicity).
3. Copy the connection string into `MONGO_URI`.

**Backend — Render**
1. Push this repo to GitHub.
2. On [Render](https://render.com), create a **Web Service** pointing at the `backend/` folder.
3. Build command: `npm install` · Start command: `npm start`.
4. Add the environment variables from `backend/.env.example` (use your real `MONGO_URI`, a strong `JWT_SECRET`, and set `CLIENT_URL` to your deployed frontend URL).

**Frontend — Vercel**
1. On [Vercel](https://vercel.com), import the repo, set the root directory to `frontend/`.
2. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
3. Add the environment variable `VITE_API_URL` pointing to your deployed backend, e.g. `https://your-api.onrender.com/api`.
4. Redeploy after setting env vars.

Once both are live, update `CLIENT_URL` in the backend env to the final Vercel URL (for CORS) and redeploy the backend.

---

## 🗺️ Roadmap / Not Yet Implemented

- Server-side receipt image storage (OCR currently runs entirely client-side; nothing is uploaded)
- Push/email notifications (in-app notifications are fully implemented; there's no external delivery channel yet)
- Multi-currency conversion (currency is stored per user but not auto-converted)
- Automated recurring-bill → transaction creation

---

## 📄 License

MIT — free to use for learning, portfolio, or as a starting point for your own product.

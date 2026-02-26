# 🚀 GoTrip Pro — AI Smart Travel Planner

An AI-powered travel itinerary planner built with **React + Vite** (frontend) and **Express + MongoDB** (backend), using **Google Gemini AI** for itinerary generation.

---

## 🏗️ Project Structure

```
GoTrip/
├── api/
│   └── index.js          ← Vercel serverless entry point
├── client/               ← React + Vite frontend
│   ├── src/
│   └── vite.config.js
├── server/               ← Express backend
│   ├── config/db.js      ← MongoDB connection (cached for serverless)
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js         ← Express app (exports for Vercel)
├── vercel.json           ← Vercel routing & build config
└── package.json
```

---

## 💻 Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Gemini API key
- Google Maps API key

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/YOUR_USERNAME/GoTrip.git
   cd GoTrip
   ```

2. **Install dependencies**
   ```bash
   # Server
   cd server && npm install

   # Client
   cd ../client && npm install
   ```

3. **Configure environment** — Create `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://YOUR_CONNECTION_STRING
   JWT_SECRET=your_super_secret_key_here
   GEMINI_API_KEY=your_gemini_api_key
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Run locally**
   ```bash
   # Terminal 1 — Start backend
   cd server && npm run dev

   # Terminal 2 — Start frontend
   cd client && npm run dev
   ```

   Frontend: `http://localhost:5173` | Backend: `http://localhost:5000`

---

## ☁️ Deploy to Vercel

### Step 1 — Push to GitHub

Make sure your code is committed and pushed:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

> ⚠️ **IMPORTANT**: The `.gitignore` file excludes `.env` files. Your secrets will NOT be pushed to GitHub. This is expected — you'll add them in Vercel's Dashboard.

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub login recommended)
2. Click **"Add New Project"**
3. **Import** your GoTrip GitHub repository
4. Vercel will auto-detect settings from `vercel.json` — **no changes needed**
5. Click **Deploy** (it will fail the first time — that's OK, we need to add env vars)

### Step 3 — Add Environment Variables

Go to your project in Vercel → **Settings** → **Environment Variables** and add:

| Variable | Value |
|---|---|
| `MONGODB_URI` | `mongodb+srv://your_connection_string` |
| `JWT_SECRET` | A strong random string (e.g. `openssl rand -base64 32`) |
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `GOOGLE_MAPS_API_KEY` | Your Google Maps API key |

> 💡 **Tip**: Use a different `JWT_SECRET` for production than development.

### Step 4 — Redeploy

After adding env vars, go to **Deployments** → click the 3-dot menu on the latest → **Redeploy**.

### Step 5 — Configure MongoDB Atlas Network Access

Your MongoDB Atlas cluster must allow connections from Vercel's servers:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) → your cluster → **Network Access**
2. Click **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`)
3. Click **Confirm**

> This is required because Vercel serverless functions run on dynamic IPs.

### Step 6 — Test

Visit your deployment URL and test:
- ✅ Homepage loads
- ✅ Register a new account
- ✅ Login works
- ✅ Generate a trip itinerary
- ✅ Save a trip to dashboard
- ✅ View saved trips

---

## 🔧 What Was Changed for Vercel

| File | Change |
|---|---|
| `api/index.js` | **NEW** — Vercel serverless function entry point |
| `server/server.js` | Exports Express app, `app.listen()` only runs locally |
| `server/config/db.js` | Mongoose connection caching for serverless cold starts |
| `client/src/services/api.js` | API base URL configurable via `VITE_API_URL` env var |
| `vercel.json` | **NEW** — Build, routing, and SPA fallback config |
| `.gitignore` | **NEW** — Excludes `.env`, `node_modules`, build artifacts |
| `package.json` | Updated with proper scripts and metadata |

---

## 📝 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7, Tailwind CSS 4, React Router 7 |
| Backend | Express 4, Node.js |
| Database | MongoDB Atlas + Mongoose |
| AI | Google Gemini 2.5 Flash |
| APIs | Google Maps, Google Places, Wikipedia (fallback) |
| Auth | JWT + bcrypt |
| Hosting | Vercel (Serverless Functions + Static) |

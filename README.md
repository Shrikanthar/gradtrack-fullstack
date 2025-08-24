
# GradTrack — Full‑Stack Job Applications Tracker

**FastAPI + SQLite backend** and **React (Vite) frontend** to track graduate job applications.  
Designed for **Shrikanth** to showcase software engineering depth: clean REST API, auth, Docker, tests, CI, and a modern UI.

## ✨ Features
- REST API (FastAPI) with CRUD for applications + `/stats/summary`
- SQLite via SQLModel (Pydantic v2 compatible)
- API‑Key authentication (`x-api-key` header, default `devkey`)
- CORS enabled for the React app
- React (Vite) UI: create/list applications, filter, and see stats
- Dockerfiles for both services + `docker-compose.yml`
- Pytest unit tests for backend + GitHub Actions CI

---

## 🚀 Quick Start (local)

### 1) Backend
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Open docs: http://127.0.0.1:8000/docs  
Default API key: `devkey`

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```
Vite dev server: http://127.0.0.1:5173

> If your API runs elsewhere, create a `.env` file with:  
> `VITE_API_BASE=http://localhost:8000`

---

## 🐳 Docker (both services)
```bash
docker compose up --build
```
- API → http://127.0.0.1:8000
- Frontend → http://127.0.0.1:5173

---

## 🧪 Run tests (backend)
```bash
cd backend
pip install -r requirements.txt
pytest -q
```

---

## 🔧 Environment Variables
- API service:
  - `API_KEY` (default: `devkey`)
  - `DATABASE_URL` (default: `sqlite:///./gradtrack.db`)
- Frontend:
  - `VITE_API_BASE` (default: `http://localhost:8000`)

---

## 📚 API Endpoints
- `GET /health`
- `GET /applications` (filters: `status`, `company`, `q`)
- `POST /applications`
- `GET /applications/{id}`
- `PUT /applications/{id}`
- `DELETE /applications/{id}`
- `GET /stats/summary`

---

## 🧾 What Shrikanth can say on his CV
“Built a full‑stack job tracker: **FastAPI** backend with SQLModel and API‑key auth, **React/Vite** frontend, **Docker‑compose** orchestration, unit tests, and GitHub Actions CI.”

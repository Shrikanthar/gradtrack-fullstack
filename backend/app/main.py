
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict
from datetime import datetime
from sqlmodel import select
from .db import init_db, get_session
from .models import Application
from .schemas import ApplicationCreate, ApplicationRead, ApplicationUpdate
from .security import verify_api_key

app = FastAPI(title="GradTrack API", version="1.0.0")

# Allow local dev and docker-compose
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/applications", response_model=List[ApplicationRead], dependencies=[Depends(verify_api_key)])
def list_applications(status: Optional[str] = None, company: Optional[str] = None, q: Optional[str] = Query(None), session=Depends(get_session)):
    statement = select(Application)
    results = session.exec(statement).all()
    if status:
        results = [r for r in results if r.status == status]
    if company:
        results = [r for r in results if r.company.lower() == company.lower()]
    if q:
        results = [r for r in results if q.lower() in (r.company + ' ' + r.role + ' ' + (r.notes or '')).lower()]
    return results

@app.post("/applications", response_model=ApplicationRead, status_code=201, dependencies=[Depends(verify_api_key)])
def create_application(payload: ApplicationCreate, session=Depends(get_session)):
    row = Application(**payload.dict())
    session.add(row)
    session.commit()
    session.refresh(row)
    return row

@app.get("/applications/{app_id}", response_model=ApplicationRead, dependencies=[Depends(verify_api_key)])
def get_application(app_id: int, session=Depends(get_session)):
    obj = session.get(Application, app_id)
    if not obj:
        raise HTTPException(404, "Not found")
    return obj

@app.put("/applications/{app_id}", response_model=ApplicationRead, dependencies=[Depends(verify_api_key)])
def update_application(app_id: int, payload: ApplicationUpdate, session=Depends(get_session)):
    obj = session.get(Application, app_id)
    if not obj:
        raise HTTPException(404, "Not found")
    data = payload.dict(exclude_unset=True)
    for k, v in data.items():
        setattr(obj, k, v)
    obj.updated_at = datetime.utcnow()
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj

@app.delete("/applications/{app_id}", status_code=204, dependencies=[Depends(verify_api_key)])
def delete_application(app_id: int, session=Depends(get_session)):
    obj = session.get(Application, app_id)
    if not obj:
        raise HTTPException(404, "Not found")
    session.delete(obj)
    session.commit()
    return

@app.get("/stats/summary", dependencies=[Depends(verify_api_key)])
def stats_summary(session=Depends(get_session)) -> Dict[str, dict]:
    rows = session.exec(select(Application)).all()
    by_status, by_company = {}, {}
    for r in rows:
        by_status[r.status] = by_status.get(r.status, 0) + 1
        by_company[r.company] = by_company.get(r.company, 0) + 1
    return {"total": len(rows), "by_status": by_status, "by_company": by_company}

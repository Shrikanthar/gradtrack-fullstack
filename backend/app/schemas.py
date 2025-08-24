
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class ApplicationCreate(BaseModel):
    company: str
    role: str
    location: Optional[str] = None
    status: str = "applied"
    source: Optional[str] = None
    notes: Optional[str] = None

class ApplicationRead(BaseModel):
    id: int
    company: str
    role: str
    location: Optional[str] = None
    status: str
    source: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

class ApplicationUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None
    source: Optional[str] = None
    notes: Optional[str] = None

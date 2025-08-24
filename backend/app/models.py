
from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class Application(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    company: str
    role: str
    location: Optional[str] = None
    status: str = "applied"  # applied/interview/offer/rejected/hired
    source: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

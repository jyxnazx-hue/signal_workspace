from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class Entry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    text: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    source: str = "text"  # or "voice"
    pipelines: List[str] = []
    metadata: dict = Field(default_factory=dict)

class Snapshot(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    task: str
    last_thoughts: List[str]
    emotional_state: Optional[str] = None
    linked_entry_ids: List[str] = Field(default_factory=list)
from ..models.entry import Entry

async def capture_thought(raw_input: str, source: str = "text") -> Entry:
    cleaned = raw_input.strip()
    if not cleaned:
        raise ValueError("Thought cannot be empty")
    return Entry(text=cleaned, source=source, pipelines=[], metadata={})
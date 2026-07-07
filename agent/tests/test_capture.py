"""
Test the Capture Agent.
Shows that raw user input is cleaned and transformed into a structured Entry.
"""
import asyncio
from agent.agents.capture import capture_thought

async def main():
    raw = "  I saw a beautiful sunset.  "
    entry = await capture_thought(raw)
    print("Input:", repr(raw))
    print("Cleaned text:", entry.text)
    print("Source:", entry.source)
    print("Pipelines (empty before categorization):", entry.pipelines)
    print("Entry ID:", entry.id)

if __name__ == "__main__":
    asyncio.run(main())
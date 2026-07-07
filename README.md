
# 📡 Signal – Your External Continuity System

**Capstone project for Google’s Intensive Vibe Coding course on Kaggle.**

Signal is a multi‑agent AI system that captures your fleeting thoughts, auto‑categorises them, links them into a personal knowledge graph, and lets you save / resume your mental state. It also surfaces joyful memories when you need a lift, all wrapped in a warm radio‑signal retro interface.

---

## The Problem

We lose brilliant ideas, creative sparks, and emotional context every day. Existing tools force manual organisation. There’s no way to “save your brain’s RAM” and resume exactly where you left off.

## The Solution

Signal acts as an **external continuity system**:
- **Zero‑friction capture** – type or speak; no tags, no folders.
- **Auto‑categorisation** – thoughts are sorted into pipelines (Creative Spark, Memory/Joy, Gratitude, Academic…).
- **Contextual Threading** – every thought is semantically linked to past ones via a knowledge graph.
- **State Recovery Loop** – log off a task, come back later, and resume with full mental context.
- **Joy Dose** – ask for a mood lift, and the agent retrieves your past joyful moments.

---

## Architecture

```mermaid
graph TD
    App Interface -->|Text / Voice| ROUTER[Deterministic Router]
    ROUTER --> SAFETY[Safety Agent]
    ROUTER --> CATEGORY[Categorization Agent]
    ROUTER --> THREAD[Threading Agent]
    ROUTER --> RECOVER[Recovery Agent]
    ROUTER --> REFLECT[Reflection Agent]
    subgraph "Memory Layer (MCP)"
        VECTOR[(ChromaDB Vector Store)]
        GRAPH[(NetworkX Graph Store)]
        SNAPSHOTS[(Snapshot JSON)]
    end
    THREAD --> VECTOR
    THREAD --> GRAPH
    RECOVER --> SNAPSHOTS
    REFLECT --> VECTOR
    REFLECT --> GRAPH

**Tech Stack:**
- **Agent Framework:** Google ADK (Agent Development Kit)
- **Models:** Gemini 2.5 Pro (via ADK)
- **Memory:** ChromaDB (vector search) + NetworkX (knowledge graph) exposed as MCP tools
- **Backend:** Python, FastAPI (API endpoints ready for wiring)
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion

---

## Project Structure

```
signal-workspace/
├── agent/                  # Python agent backend
│   ├── agents/             # Safety, Categorization, Threading, Recovery, Reflection
│   ├── orchestrator/       # Deterministic router
│   ├── memory/             # MCP server (ChromaDB, graph store, tools)
│   ├── models/             # Pydantic models (Entry, Snapshot)
│   ├── tests/              # Individual agent tests
│   └── initialize.py       # Memory system setup
├── web/                    # Next.js frontend
│   └── src/
│       ├── components/     # BroadcastInput, Timeline, RecoveryCard, JoyDose
│       └── lib/            # API client
└── docs/                   # Architecture diagram
```

---

## Screenshots

### Main Interface
![Broadcast Input](screenshots/ui.png)

### Timeline / Transmission Log
![Timeline](screenshots/timeline.png)

### Agent Test (Recovery)
![Terminal Test](screenshots/test-terminal.png)

---

## Getting Started

### Backend
```bash
python -m agent.initialize
python -m agent.tests.test_recovery   # example test
adk web                               # interactive debug UI
```

### Frontend
```bash
cd web
npm install
npm run dev
```

---

## Key Agent Tests

```bash
python -m agent.tests.test_capture
python -m agent.tests.test_safety
python -m agent.tests.test_categorization
python -m agent.tests.test_threading
python -m agent.tests.test_recovery
python -m agent.tests.test_reflection
```

---

## Capstone Submission

- **Track:** Freestyle
- **Kaggle:** [Link to competition](https://www.kaggle.com/competitions/vibecoding-agents-capstone-project)
- **Portfolio Write-up:** Included in Kaggle submission form

---

## Status

All specialist agents are individually tested and functional. The deterministic root router is implemented; final end‑to‑end integration with the frontend is in progress. The frontend UI is complete and ready for API connection.

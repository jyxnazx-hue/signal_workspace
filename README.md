# signal_workspace
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
    App/Interface -->|Text / Voice| ROUTER[Deterministic Router]
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

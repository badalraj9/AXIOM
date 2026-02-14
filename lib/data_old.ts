import {
  Shield,
  Brain,
  Eye,
  Microscope,
  Box,
  LucideIcon,
  Terminal,
} from "lucide-react";

export type ProjectId = "sentry" | "mt" | "marey" | "ore" | "capsule";

export interface Project {
  id: ProjectId;
  name: string;
  alias: string;
  description: string;
  fullDescription: string;
  icon: LucideIcon;
  color: string;
  status: "ONLINE" | "OFFLINE" | "MAINTENANCE" | "ACTIVE";
  stats: Record<string, string>;
  features: string[];
  techStack: string[];
  documentation?: string; // Markdown Content
}

export const PROJECTS: Record<ProjectId, Project> = {
  sentry: {
    id: "sentry",
    name: "SENTRY",
    alias: "LOGIC__CORE",
description:
      "A distributed authentication and authorization gatekeeper for the Axiom ecosystem.",
    fullDescription:
      "SENTRY serves as the primary ingress point for the Axiom network. " +
      "It creates a secure session layer that persists across all cognitive modules. " +
      "Utilizing a custom JWT implementation and role-based access control (RBAC), " +
      "SENTRY ensures that only authorized operators can interface with sensitive subsystems like MT or ORE.",
    icon: Shield,
    color: "neural",
    status: "ONLINE",
    stats: {
      latency: "12ms",
      uptime: "99.99%",
      auth_rate: "450/s",
    },
    features: [
      "Distributed Session Management",
      "Key-Rotation Policies",
      "Anomaly Detection",
      "Role-Based Access Control",
    ],
    techStack: ["Next.js", "Redis", "JWT", "Edge Functions"],
documentation: `# SENTRY

> **Developer Collaboration OS** — A decision intelligence platform where thinking happens.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

---

## What is SENTRY?

SENTRY is a **standalone, developer-first collaboration platform** where everything except coding lives. It provides:

- 🎯 **Structured Communication** — Chats, discussions, and workshops with intent
- 🧠 **Intelligent Decision Capture** — Automatic detection and recall of decisions
- 📚 **Knowledge Accumulation** — Without documentation overhead
- 🔒 **Personal & Collaborative Workspaces** — With fine-grained permissions
- ⚡ **Adaptive Assistance** — Rule-based intelligence that learns your patterns

### What SENTRY is NOT

- ❌ Not a code repository (no Git functionality)
- ❌ Not a project management tool (no sprints, tickets, burndown charts)
- ❌ Not a social network (no followers, likes, viral content)
- ❌ Not an LLM-powered chatbot (no generative AI, no hallucinations)

---

## Core Philosophy

| Principle                           | Description                                                               |
| ----------------------------------- | ------------------------------------------------------------------------- |
| **Projects are living entities**    | Not just folders — they have pulse, history, knowledge                    |
| **Knowledge is first-class**        | Decisions aren't buried in chats — they're structured, searchable, linked |
| **Collaboration is structured**     | Intent-driven discussions, not noisy channels                             |
| **Automation is ambient**           | Silent by default, never intrusive                                        |
| **One intelligence, many contexts** | The Neural Hub adapts to each user and project                            |

---

## Key Features

### 🎯 Intent Checkpoints

Set explicit goals for discussions. The system scopes all analysis to your current intent.

\`\`\`
/intent "Design caching strategy for API v2"
\`\`\`

### 🧠 Decision Detection

The Neural Hub detects decisions in natural conversation:

\`\`\`
Message: "Let's go with Redis for session storage"
         ↓
System:  [Decision Detected: Confidence 0.82]
         "Use Redis for session storage?"
         [Confirm] [Edit] [Dismiss]
\`\`\`

### 🔍 Decision Recall

Instantly retrieve past decisions with context:

\`\`\`
@assist why redis?
→ "You decided to use Redis for session storage (3 days ago)
   Rationale: Better persistence than Memcached
   Participants: @alice, @bob"
\`\`\`

### 🏭 Workshops

Time-bounded, goal-oriented collaboration sessions with mandatory outcomes.

### 📄 Living Documents

Structured papers that link to decisions, discussions, and files.

---

## Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Interface Layer                      │
│         Web App  •  CLI  •  Mobile (Future)             │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                    API Gateway                          │
│              REST + WebSocket (Socket.io)               │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                   Platform Core                         │
│  ┌────────────────────────────────────────────────────┐ │
│  │              Business Logic Layer                   │ │
│  │  Users • Projects • Chats • Decisions • Workshops  │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │           Neural Hub (Intelligence)                 │ │
│  │  Sensors → Aggregation → Activation → Learning     │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                    Data Layer                           │
│         PostgreSQL  •  Redis  •  S3/Blob                │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## Neural Hub: AI-Inspired Intelligence (Zero ML)

The intelligence engine uses mathematical foundations from neural network theory — but implemented as **pure deterministic algorithms**. No models, no training, no black boxes.

| Concept            | Implementation                         |
| ------------------ | -------------------------------------- |
| Weighted Sums      | \`z = Σ(signal × weight)\`               |
| Sigmoid Activation | \`σ(z) = 1/(1+e^(-k(z-θ)))\`             |
| Hebbian Learning   | \`Δw = η × signal × outcome\`            |
| Exponential Decay  | \`w(t) = w₀×e^(-λt) + base×(1-e^(-λt))\` |

**Every decision is 100% traceable and explainable.**

---

## Tech Stack

| Layer        | Technology                                 |
| ------------ | ------------------------------------------ |
| **Backend**  | Node.js + TypeScript + Express + Socket.io |
| **Database** | PostgreSQL 14+                             |
| **Cache/RT** | Redis 7+                                   |
| **Frontend** | React + Vite + TypeScript                  |
| **CLI**      | Node.js + Commander.js                     |

---

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Git

### Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/your-org/sentry.git
cd sentry

# Start infrastructure (PostgreSQL + Redis)
docker-compose up -d

# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Start development servers
npm run dev
\`\`\`

### Access Points

| Service   | URL                   |
| --------- | --------------------- |
| Web App   | http://localhost:5173 |
| API       | http://localhost:3000 |
| WebSocket | ws://localhost:3000   |

---

## Project Structure

\`\`\`
sentry/
├── packages/
│   ├── backend/          # Express API + Neural Hub
│   ├── web/              # React web application (renamed from frontend)
│   ├── cli/              # Command-line tool
│   └── shared/           # Shared types & utilities
├── database/
│   └── migrations/       # SQL migration files
├── docker-compose.yml    # Infrastructure setup
├── docs/
│   ├── DEVELOPMENT.md    # Development guide
│   ├── API.md            # API documentation
│   ├── ARCHITECTURE.md   # Detailed architecture
│   ├── USER_GUIDE.md     # End-user documentation
│   └── DEPLOYMENT.md     # Production deployment guide
├── figma-mcp-server/     # Figma MCP integration server
└── README.md
\`\`\`

---

## Documentation

| Document                                  | Description                                           |
| ----------------------------------------- | ----------------------------------------------------- |
| [DEVELOPMENT.md](./docs/DEVELOPMENT.md)   | Setup, development workflow, contribution guide       |
| [API.md](./docs/API.md)                   | REST & WebSocket API reference                        |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Detailed system architecture                          |
| [NEURAL_HUB.md](./docs/NEURAL_HUB.md)     | Complete Neural Hub intelligence engine documentation |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md)     | Production deployment guide                           |
| [USER_GUIDE.md](./docs/USER_GUIDE.md)     | End-user documentation                                |

---

## Performance Targets

| Metric                 | Target  |
| ---------------------- | ------- |
| Neural Hub per-message | < 1ms   |
| API p95 response       | < 100ms |
| WebSocket latency      | < 30ms  |
| Decision detection F1  | > 0.75  |

---

## Team

Built by the SENTRY team.

---

## License

Proprietary. All rights reserved.`,
  },
  mt: {
    id: "mt",
    name: "MEMORY_THREAD",
    alias: "HIPPOCAMPUS",
description:
      "Contextual storage and retrieval system preserving state across sessions.",
    fullDescription:
      "The Memory Thread (MT) functions as the hippocampus of the system. " +
      "It serializes conversation threads, user preferences, and system states into a vector database. " +
      "This allows other modules to query 'past experiences' to inform current decisions, " +
      "effectively giving the system long-term memory.",
    icon: Brain,
    color: "memory",
    status: "ONLINE",
    stats: {
      vectors: "1.2M",
      recall: "0.4s",
      growth: "+2gb/d",
    },
    features: [
      "Vector Embeddings (OpenAI)",
      "Semantic Search",
      "Context Window Management",
      "Automatic Summarization",
    ],
    techStack: ["Pinecone", "Python", "LangChain", "Postgres"],
    documentation: `
# Memory Thread 🧠

**The Truth-Aware Memory Engine for AI Agents**

Memory Thread (MT) is an event-sourced memory system that gives AI agents the ability to remember facts, handle contradictions, and know when to say "I don't know."

> _Not a vector database. Not a chatbot. A Truth Maintenance System._

---

## 🎯 What Makes MT Different

| Feature            | Typical AI Memory   | Memory Thread             |
| ------------------ | ------------------- | ------------------------- |
| **Data Model**     | Key-value / Vectors | Events → States           |
| **Uncertainty**    | Hidden or none      | Explicit (Truth Vectors)  |
| **Contradictions** | Last-write-wins     | Higher authority wins     |
| **"I don't know"** | Empty response      | Formal \`None\` with reason |
| **Audit Trail**    | Logs (maybe)        | Immutable event log       |

### Core Capabilities

- **🔄 Deterministic Replay** — Reconstruct any entity's state at any point in time
- **📊 Truth Vectors** — 4D truth scoring: (Confidence, Authority, Freshness, Corroboration)
- **⏱️ Memory Decay** — Facts fade naturally based on configurable decay curves
- **🔀 Contradiction Resolution** — Mathematical resolution based on authority
- **⚡ High Performance** — ~3,600 EPS full pipeline, ~40,000+ transport layer

---

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- PostgreSQL 14+ (event store)
- Qdrant (optional, for vector search)

### Installation

\`\`\`bash
git clone https://github.com/badalraj9/MemoryThread.git
cd MemoryThread
pip install -r requirements.txt
\`\`\`

### Set Up Database

\`\`\`bash
# Create database
psql -U postgres -c "CREATE DATABASE memory_thread_db;"

# Apply schema
psql -U postgres -d memory_thread_db -f memory_thread/db/schema_phase_3_4.sql
\`\`\`

### Configure Environment

\`\`\`bash
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=your_password
export POSTGRES_DB=memory_thread_db
export POSTGRES_HOST=localhost
\`\`\`

### Run the API

\`\`\`bash
uvicorn memory_thread.api.main:app --host 0.0.0.0 --port 8000
\`\`\`

### Test It

\`\`\`bash
# Health check
curl http://localhost:8000/health

# Ingest a memory
curl -X POST http://localhost:8000/ingest \\
  -H "Content-Type: application/json" \\
  -d '{
    "producer_id": "agent-001",
    "events": [{
      "content": "User prefers dark mode",
      "timestamp": "2025-01-01T10:00:00Z"
    }]
  }'
\`\`\`

---

## 📡 API Reference

### Health & Monitoring

| Endpoint            | Method | Description                           |
| ------------------- | ------ | ------------------------------------- |
| \`GET /\`             | GET    | Quick health check                    |
| \`GET /health\`       | GET    | Detailed health with service statuses |
| \`GET /health/ready\` | GET    | Kubernetes readiness probe            |
| \`GET /health/live\`  | GET    | Kubernetes liveness probe             |
| \`GET /metrics\`      | GET    | Prometheus-compatible metrics         |
| \`GET /version\`      | GET    | Version and build info                |

### Event Ingestion

| Endpoint                | Method | Description                 |
| ----------------------- | ------ | --------------------------- |
| \`POST /register\`        | POST   | Register a producer         |
| \`POST /ingest\`          | POST   | Ingest a batch of events    |
| \`GET /control/throttle\` | GET    | Get current system pressure |

### Maintenance

| Endpoint                          | Method | Description                   |
| --------------------------------- | ------ | ----------------------------- |
| \`GET /maintenance/proposals\`      | GET    | Get duplicate merge proposals |
| \`POST /maintenance/approve/merge\` | POST   | Approve a merge proposal      |
| \`GET /maintenance/health/stats\`   | GET    | Dashboard metrics             |

---

## 🏗️ Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                      MEMORY THREAD                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ FastAPI     │  │ ZMQ Fabric  │  │ Slab        │        │
│  │ Gateway     │→ │ (Transport) │→ │ Allocator   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│         │                                  │                │
│         ▼                                  ▼                │
│  ┌─────────────────────────────────────────────────┐      │
│  │          TRUTH MANAGEMENT SYSTEM (TMS)          │      │
│  │  • Truth Vector Scoring                         │      │
│  │  • State Derivation                             │      │
│  │  • Freshness Decay                              │      │
│  └─────────────────────────────────────────────────┘      │
│         │                                                   │
│         ▼                                                   │
│  ┌──────────────┐  ┌──────────────┐                       │
│  │ PostgreSQL   │  │ Qdrant       │                       │
│  │ (Events)     │  │ (Vectors)    │                       │
│  └──────────────┘  └──────────────┘                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 📚 Documentation

| Document                                                                               | Description                        |
| -------------------------------------------------------------------------------------- | ---------------------------------- |
| [Unified System Overview](docs/thesis_reference/00_Unified_System_Overview.md)         | Philosophy and high-level concepts |
| [Architectural Layers](docs/thesis_reference/02_Architectural_Layers.md)               | Deep dive into system layers       |
| [Mathematical Specifications](docs/thesis_reference/06_Mathematical_Specifications.md) | Truth Vector algebra               |
| [End-to-End Workflow](docs/thesis_reference/07_End_to_End_Workflow.md)                 | Data flow from API to storage      |

---

## 🧪 Running Tests

\`\`\`bash
# All tests
pytest tests/ -v

# Specific test suites
pytest tests/test_tms_complete.py -v      # TMS logic
pytest tests/test_realworld_scenarios.py -v  # AI agent simulation
pytest tests/test_persistence_roundtrip.py -v  # Database persistence
\`\`\`

---

## 📊 Benchmarks

\`\`\`bash
# Full pipeline benchmark
python benchmarks/benchmark_realworld.py

# Expected results (i5-12450H):
# • Event Creation: ~50,000 EPS
# • State Derivation: ~30,000 EPS
# • Full Pipeline: ~3,600 EPS
\`\`\`

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting.

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

**Built for AI that needs to remember.** 🚀
`,
  },
  marey: {
    id: "marey",
    name: "MAREY_VISUAL",
    alias: "VISUAL__CORTEX",
description:
      "High-fidelity rendering pipeline for generative visual synthesis.",
    fullDescription:
      "Named after Étienne-Jules Marey, this module handles all visual outputs. " +
      "It connects to generative models to synthesize images and UI components on the fly. " +
      "MAREY also manages the aesthetic stability of the frontend, ensuring that generated content " +
      "adheres to the strict 'Design OS' guidelines.",
    icon: Eye,
    color: "visual",
    status: "ACTIVE",
    stats: {
      fps: "60",
      render: "1.2s",
      gpu_load: "34%",
    },
    features: [
      "Generative UI Streaming",
      "Stable Diffusion Integration",
      "Canvas & WebGL Rendering",
      "Style Transfer Pipelines",
    ],
    techStack: ["Three.js", "React Three Fiber", "SDXL", "WebGL"],
    documentation: `
# MAREY

## Technological Apex Development Plan

> "If your system can run, MAREY can run better."

MAREY (formerly Optimus Ultra) is an adaptive media processing system designed to run on any hardware, from legacy laptops to supercomputer clusters.

## Core Philosophy: Absolute Adaptability

*   **Zero Compromise:** Runs on anything.
*   **Maximum Adaptation:** Self-optimizing in real-time.
*   **Universal Execution:** CPU, GPU, DSP, NPU - if it computes, we use it.

## Architecture

The system is built as a **Modular Monolith** with distributed-ready interfaces.

### Core Modules
*   **Hardware Intelligence Layer (Phase 0):** Deep system profiling.
*   **Model Capability Abstraction (Phase 1):** Matching models to hardware.
*   **Video Processing (Phase 2):** Adaptive frame pipelines (Coming Soon).
*   **Orchestration (Phase 4):** Distributed workload management (Coming Soon).

## Setup

1.  Install dependencies: \`pip install -r requirements.txt\`
2.  Run hardware detection: \`python -m marey.cli detect\`
3.  Manage models: \`python -m marey.cli_models list\`
`,
  },
  ore: {
    id: "ore",
    name: "ORE_LABS",
    alias: "R&D__SECTOR",
description:
      "Deep analysis engine for pattern recognition and algorithmic research.",
    fullDescription:
      "ORE (Optimized Research Engine) is the analytical left-brain. " +
      "It processes large datasets to find patterns, anomalies, and correlations. " +
      "Used primarily for market analysis and system optimization, ORE runs background jobs " +
      "that continuously refine the efficiency of the other modules.",
    icon: Microscope,
    color: "research",
    status: "MAINTENANCE",
    stats: {
      jobs: "42",
      accuracy: "94.2%",
      compute: "HIGH",
    },
    features: [
      "Time-Series Forecasting",
      "Sentiment Analysis",
      "Clustering Algorithms",
      "Automated Reporting",
    ],
    techStack: ["Python", "Pandas", "Scikit-Learn", "FastAPI"],
    documentation: `
# ORE: Open Research Engine

ORE is an algorithmic, LLM-free system for large-scale scientific reasoning.

## Phases Implemented
- **Phase 0**: System Bootstrapping (FastAPI + React + SQLite).
- **Phase 1**: Intelligent Query Understanding (NLP pipeline).
- **Phase 2**: Intelligent Ingestion (ArXiv Fetcher + Async Engine).
- **Phase 3**: Content Extraction (PDF -> Structured JSON).
- **Phase 4**: Processing (Chunking, Canonicalization, Deduplication).
- **Phase 5**: Retrieval Engine (Hybrid Sparse + Dense).
- **Phase 6**: Clustering (TF-IDF + K-Means).
- **Phase 7**: Contradiction Detection (Polarity Analysis).
- **Phase 8**: Citation Graph (NetworkX + Louvain).
- **Phase 9**: Research Gap Identification (Method-Dataset Matrix).

## Robustness Features
- **Retry Logic**: ArXiv fetcher retries 3 times with exponential backoff.
- **Concurrency**: Asyncio-based ingestion with SQLite locking for thread safety.
- **NLP Handling**: Slang mapping ("stuff" -> "methods"), noise removal ("idk"), and intent classification.

## Setup

### Backend
1. Navigate to \`ore-backend/\`:
   \`\`\`bash
   cd ore-backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`
3. Download NLP models:
   \`\`\`bash
   python -m spacy download en_core_web_sm
   python -m nltk.downloader wordnet omw-1.4
   \`\`\`
4. Run the server:
   \`\`\`bash
   uvicorn main:app --reload
   \`\`\`

### Frontend
1. Navigate to \`ore-frontend/\`:
   \`\`\`bash
   cd ore-frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the dev server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Testing
Run the comprehensive stress test suite to verify robustness:
\`\`\`bash
python scripts/stress_test.py
\`\`\`
4. **Test Processing (Phase 4)**:
   \`\`\`bash
   python scripts/test_phase4.py
   \`\`\`
5. **Test Phases 5-7**:
   \`\`\`bash
   python scripts/test_phases_5_7.py
   \`\`\`
6. **Test Phases 8-9 (Final)**:
   \`\`\`bash
   python scripts/stress_test_final.py
   \`\`\`
This runs 10 scenarios including network failure simulation, concurrent load, and edge-case query parsing.
`,
  },
  capsule: {
    id: "capsule",
    name: "CAPSULE_SYS",
    alias: "AUX__DOCK",
description: "Modular plugin architecture for external tool integration.",
    fullDescription:
      "CAPSULE is the expansion bay of Axiom. " +
      "It defines a standard protocol for third-party tools to 'dock' with the system. " +
      "Whether it's a code editor, a terminal interface, or a music player, CAPSULE surrounds it with a secure sandbox " +
      "and creates a bridge for it to communicate with the Core Bus.",
    icon: Box,
    color: "tools",
    status: "ONLINE",
    stats: {
      plugins: "7",
      sandbox: "SECURE",
      api_ver: "v2.1",
    },
    features: [
      "Iframe Sandboxing",
      "Inter-Process Communication",
      "Standardized Manifests",
      "Hot-Swappable Modules",
    ],
    techStack: ["WebComponents", "Shadow DOM", "Zod", "WASM"],
    documentation: `
# CAPSULE - Capability-Adaptive Plugin System for Unified Lightweight Execution

## Overview
CAPSULE is a modular research assistant architecture designed for stability, isolation, and explicit capability management. It operates as a local-first system where plugins add functionality (PDF viewing, Note taking, AI analysis) without compromising the core stability.

## Project Status
- **Phase 1: Core Foundation** ✅ (Completed)
- **Phase 2: First Real Plugin (PDF)** ✅ (Completed)
- **Phase 3: Multi-Plugin System** ✅ (Completed)
- **Phase 4: Systems Engine** ✅ (Completed)
- **Phase 5: Architecture** ✅ (Completed)
- **Phase 6: Analytics ("Feels Like AI")** ✅ (Completed)
- **Phase 7: Optimization ("Illegal Speed")** ✅ (Completed)

## Features
- **Event-Driven Core**: Async event bus for decoupled communication.
- **Plugin System**:
  - Strict isolation (logical).
  - Explicit capability manifests (\`manifest.json\`).
  - Automatic dependency installation.
- **State Management**: SQLite-backed persistent state for plugins.
- **API**: FastAPI bridge exposing REST endpoints and WebSockets.
- **Workflow Engine**: Chain commands into automated sequences.
- **Search**: Full-text document indexing (SQLite FTS5).
- **Analytics**: Local Knowledge Graph and Citation Impact Radar.
- **High Performance**: Zero-copy data flow (Artifacts) and binary event tracing.

## Supported Plugins
1. **PDF Viewer**: Renders PDF pages to images using \`pymupdf\` (Zero-Copy supported).
2. **Note Taking**: Manage notes linked to documents.
3. **Citation Manager**: Manage citations.
4. **Citation Radar**: Analyze citation impact/frequency.
5. **Document Indexer**: Local full-text search (supports Indexing Artifacts).
6. **Knowledge Graph**: Tracks relationships between documents, notes, and entities.
7. **Workflow Runner**: Automate command sequences.
8. **REPL**: Interactive system inspection.

## Getting Started

### Prerequisites
- Python 3.11+
- \`pip\`

### Installation
1. Clone the repository.
2. Install dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

### Running the Core
Start the API server:
\`\`\`bash
python -m core.app.main
\`\`\`
Server runs at \`http://127.0.0.1:8000\`.

### API Usage

#### Execute a Workflow
\`POST /commands/execute\`
\`\`\`json
{
  "command": "workflow.run",
  "args": {
    "steps": [
      {"command": "pdf.open", "args": {"path": "/path/to/doc.pdf"}},
      {"command": "pdf.export_artifact", "args": {}},
      {"command": "indexer.index_artifact", "args": {"artifact_id": "$prev.artifact_id"}}
    ]
  }
}
\`\`\`

#### Query Knowledge Graph
\`POST /commands/execute\`
\`\`\`json
{
  "command": "graph.query",
  "args": {}
}
\`\`\`
`,
  },
};

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
  - Explicit capability manifests (`manifest.json`).
  - Automatic dependency installation.
- **State Management**: SQLite-backed persistent state for plugins.
- **API**: FastAPI bridge exposing REST endpoints and WebSockets.
- **Workflow Engine**: Chain commands into automated sequences.
- **Search**: Full-text document indexing (SQLite FTS5).
- **Analytics**: Local Knowledge Graph and Citation Impact Radar.
- **High Performance**: Zero-copy data flow (Artifacts) and binary event tracing.

## Supported Plugins
1. **PDF Viewer**: Renders PDF pages to images using `pymupdf` (Zero-Copy supported).
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
- `pip`

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Core
Start the API server:
```bash
python -m core.app.main
```
Server runs at `http://127.0.0.1:8000`.

### API Usage

#### Execute a Workflow
`POST /commands/execute`
```json
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
```

#### Query Knowledge Graph
`POST /commands/execute`
```json
{
  "command": "graph.query",
  "args": {}
}
```

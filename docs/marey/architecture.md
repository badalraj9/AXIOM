# OPTIMUS ULTRA Architecture

## High-Level Design

OPTIMUS ULTRA follows a **Modular Monolith** architecture. This ensures ease of development and testing while preparing for a future distributed microservices deployment.

### Directory Structure

```
optimus_ultra/
├── core/
│   ├── hardware/          # Phase 0: System Detection
│   ├── models/            # Phase 1: Model Abstraction
│   ├── processing/        # Phase 2: Media Engines
│   └── orchestrator/      # Phase 4: Job Scheduling
├── backends/              # Hardware Abstraction Layer (HAL)
├── tests/
└── config/
```

## Core Principles

1.  **Capability-Based Execution:** Modules never hardcode hardware support. They ask the Orchestrator for a backend that meets specific capabilities (e.g., "requires FP16", "requires >4GB VRAM").
2.  **Abstract Interfaces:** All hardware interaction goes through abstract interfaces defined in `core/`, implemented in `backends/`.
3.  **Fail-Safe defaults:** If high-end hardware is missing, graceful degradation to CPU/fallback is automatic.

## Phase 0: Hardware Intelligence Layer

The foundation of the system. It builds a `SystemProfile` object that acts as the single source of truth for the runtime environment.

### Data Flow

1.  **Detector** triggers sub-detectors (CPU, GPU, Memory, Storage).
2.  **Sub-detectors** query system APIs (Sysfs, Metal, CUDA, OpenCL).
3.  **Scorer** normalizes raw metrics into 0-1000 capability scores.
4.  **Profile** is generated and cached.

### Future Expansion
*   **Thermal/Power:** Real-time throttling adjustments.
*   **Network:** Peer discovery for distributed mesh.

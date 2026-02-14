# Phase 0: Universal Hardware Intelligence Layer Specification

## Goal
To generate a comprehensive, structured JSON profile of the host system's compute, memory, and storage capabilities.

## Components

### 1. CPU Detector (`core/hardware/cpu.py`)
*   **Inputs:** `psutil`, `cpuinfo`
*   **Outputs:**
    *   Cores (Physical/Logical)
    *   Architecture (x86, ARM)
    *   Frequency (Min/Max/Current)
    *   SIMD Flags (AVX, NEON)
    *   L1/L2/L3 Cache sizes

### 2. GPU Detector (`core/hardware/gpu.py`)
*   **Inputs:** `py3nvml` (NVIDIA), System Commands (AMD/Apple)
*   **Outputs:**
    *   List of devices
    *   VRAM (Total/Free)
    *   Compute Capability
    *   Driver Versions

### 3. Memory Detector (`core/hardware/memory.py`)
*   **Inputs:** `psutil`
*   **Outputs:**
    *   Total RAM
    *   Available RAM
    *   Swap Total/Free
    *   Memory Speed (estimated/detected)

### 4. Storage Detector (`core/hardware/storage.py`)
*   **Inputs:** `shutil`, `os` (Benchmark)
*   **Outputs:**
    *   Disk Type (NVMe/SSD/HDD classification based on speed)
    *   Sequential Read/Write Speed (MB/s)
    *   Available Space

### 5. Scorer (`core/hardware/scorer.py`)
*   **Logic:**
    *   **CPU Score:** `Cores * Frequency * IPC_Factor * SIMD_Bonus`
    *   **GPU Score:** `Cuda_Cores * Clock * VRAM_Factor`
    *   **Memory Score:** `Size * Speed_Factor`
    *   **Storage Score:** `Speed_MBps * Type_Multiplier`
    *   **Normalization:** All scores clamped 0-1000 for standard UI display.

### 6. Orchestrator (`core/hardware/detector.py`)
*   Aggregates all above into the final `SystemProfile`.

## Output Schema (JSON)

```json
{
  "system_id": "uuid",
  "timestamp": "iso-date",
  "compute": {
    "cpu": { ... },
    "gpus": [ ... ]
  },
  "memory": { ... },
  "storage": { ... },
  "frameworks": {
    "torch": { "available": bool, "version": str, "cuda": bool },
    "tensorflow": { "available": bool, "version": str }
  },
  "scores": {
    "cpu": int,
    "gpu": int,
    "memory": int,
    "storage": int,
    "overall": int
  }
}
```

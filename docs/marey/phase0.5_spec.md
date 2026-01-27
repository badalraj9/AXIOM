# Phase 0.5: Dynamic Resource Monitoring Specification

## Goal
To implement real-time monitoring of system resources (Thermal, Power, Utilization) and provide an "Adaptive Engine" that throttles processing to prevent overheating, battery drain, or system lag.

## Components

### 1. Thermal Monitor (`core/monitoring/thermal.py`)
*   **Inputs:** `psutil.sensors_temperatures` (CPU), `py3nvml` (NVIDIA GPU).
*   **Outputs:**
    *   `cpu_temp_c`: Max core temperature.
    *   `gpu_temp_c`: Max GPU temperature.
    *   `state`: Enum [SAFE, WARM, HOT, CRITICAL].
*   **Thresholds:**
    *   **SAFE:** < 70°C
    *   **WARM:** 70-85°C
    *   **HOT:** 85-95°C
    *   **CRITICAL:** > 95°C

### 2. Power Monitor (`core/monitoring/power.py`)
*   **Inputs:** `psutil.sensors_battery`.
*   **Outputs:**
    *   `source`: [AC, BATTERY]
    *   `percent`: 0-100%
    *   `mode`: Enum [PERFORMANCE, BALANCED, BATTERY_SAVER].
*   **Logic:**
    *   AC Power -> PERFORMANCE
    *   Battery > 20% -> BALANCED
    *   Battery < 20% -> BATTERY_SAVER

### 3. Utilization Monitor (`core/monitoring/utilization.py`)
*   **Inputs:** `psutil.cpu_percent`, `psutil.virtual_memory`, `py3nvml`.
*   **Outputs:**
    *   `cpu_percent`: Real-time load.
    *   `memory_percent`: RAM usage.
    *   `gpu_load_percent`: GPU Compute load.
    *   `vram_used_percent`: GPU Memory load.

### 4. Adaptive Engine (`core/monitoring/adaptive.py`)
*   **Inputs:** Thermal State, Power Mode, Utilization.
*   **Outputs:**
    *   `throttle_factor`: 0.0 to 1.0 (1.0 = Full Speed).
    *   `recommendation`: String describing the action (e.g., "Reduce Batch Size").
*   **Logic Matrix:**
    *   **CRITICAL Temp:** Throttle 0.0 (Stop).
    *   **HOT Temp:** Throttle 0.5.
    *   **BATTERY_SAVER Mode:** Throttle 0.3.
    *   **High CPU/GPU Load:** Throttle 0.7 (Leave headroom).

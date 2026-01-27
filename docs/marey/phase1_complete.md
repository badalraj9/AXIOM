# MAREY Phase 1: Model Capability Abstraction

## Architecture Overview

Phase 1 establishes the "Brain" of the MAREY system. It solves the problem of matching arbitrary AI models to arbitrary hardware configurations.

### The Three-Layer System

1.  **Model Manifest (Layer 1):** A YAML-based declaration of what a model needs (VRAM, Ops, Precision) and what it provides (Quality, Speed).
2.  **Matcher Engine (Layer 2):** An intelligent algorithm that checks if the hardware meets the model's requirements. It calculates tiling strategies, selects optimal precision (FP16/FP32), and assigns the best backend (CUDA/ROCm/MPS/CPU).
3.  **Execution Config (Layer 3):** A concrete, immutable plan passed to the execution engine (Phase 2).

## Key Components

-   `marey/core/models/manifest.py`: Validates and parses YAML manifests.
-   `marey/core/models/matcher.py`: The core logic for hardware-model matching.
-   `marey/core/models/tiling.py`: Calculates optimal tile grids to prevent OOM errors.
-   `marey/core/models/precision_selector.py`: Chooses between FP32/FP16/INT8 based on hardware support and VRAM constraints.
-   `marey/core/models/performance.py`: Estimates inference time and resource usage.

## Usage Examples

### CLI

**List available models:**
```bash
python -m marey.cli_models list
```

**Find compatible models for your hardware:**
```bash
python -m marey.cli_models compatible --task image_upscale --scale 4
```

**Test a specific model against your hardware (simulation):**
```bash
python -m marey.cli_models test RealESRGAN-x4 --width 3840 --height 2160
```

### Python API

```python
from marey.core.hardware.detector import detect_hardware
from marey.core.models.registry import get_registry
from marey.core.models.matcher import ModelMatcher

# 1. Detect Hardware
profile = detect_hardware()

# 2. Load Registry
registry = get_registry()
model = registry.get("RealESRGAN-x4")

# 3. Match
matcher = ModelMatcher(profile)
result = matcher.match(model, image_size=(3840, 2160))

if result.success:
    print(f"Ready to run on {result.config.device}")
    print(f"Est. VRAM: {result.config.estimated_vram_gb:.2f} GB")
```

## Manifest Format

See `models/manifests/` for examples. Key fields:

```yaml
model:
  name: "MyModel"
task:
  type: "image_upscale"
  scale_factor: 4
requirements:
  min_vram_gb: 4.0
  preferred_backends: ["cuda", "cpu"]
precision:
  fp16: true
input_constraints:
  supports_tiling: true
  max_resolution_no_tile: [1024, 1024]
```

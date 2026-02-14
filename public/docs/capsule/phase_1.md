# Phase 1: Core Foundation

## Goals
Establish the architectural skeleton of CAPSULE.

## Deliverables
1. **Event Bus**: Asynchronous, fault-tolerant messaging system.
2. **State Manager**: SQLite-backed global state store.
3. **Capability Checker**: System resource and permission validator.
4. **Plugin Loader**: Mechanism to discover, validate, and load plugins.
5. **API Bridge**: FastAPI server exposing core functionality.
6. **Hello World Plugin**: Proof of concept plugin.

## Verification
- Run `pytest` to execute the test suite.
- Start the server and check `http://localhost:8000/health`.
- Verify `hello_world` plugin loads and emits events.

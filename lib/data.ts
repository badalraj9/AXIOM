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
      "SENTRY serves as the primary ingress point for the Axiom network. It creates a secure session layer that persists across all cognitive modules. Utilizing a custom JWT implementation and role-based access control (RBAC), SENTRY ensures that only authorized operators can interface with sensitive subsystems like MT or ORE.",
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
    documentation: `
# Architecture: SENTRY Gatekeeper

## Overview
SENTRY is designed as a **Wait-Free** authentication service. It eliminates database bottlenecks on session validation by distributing session keys to the Edge.

### Core Components
1. **The Gate**: A Next.js Middleware interception layer.
2. **The Keymaster**: A Redis-backed session store (Upstash).
3. **The Audit**: Asynchronous logging of security events to ElasticSearch.

## Data Flow
\`\`\`mermaid
graph LR
    User-->Edge_Middleware
    Edge_Middleware-->Redis_Cache
    Redis_Cache-->Validation
    Validation-->App_Shell
\`\`\`

## Security Protocol (Class 5)
SENTRY implements **rotating nonces** for all API requests. A client implementation must sign headers with the current session epoch to prevent replay attacks.
`,
  },
  mt: {
    id: "mt",
    name: "MEMORY_THREAD",
    alias: "HIPPOCAMPUS",
    description:
      "Contextual storage and retrieval system preserving state across sessions.",
    fullDescription:
      "The Memory Thread (MT) functions as the hippocampus of the system. It serializes conversation threads, user preferences, and system states into a vector database. This allows other modules to query 'past experiences' to inform current decisions, effectively giving the system long-term memory.",
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
# Architecture: MT (Memory Thread)

## The Hippocampus Model
MT is built on the premise that **Context is King**. It is not just a database; it is a **Retrieval Augmented Generation (RAG)** pipeline optimized for latency.

### Storage Layers
- **Hot Memory (Short-Term)**: Redis List. Stores the last N turns of conversation.
- **Cold Memory (Long-Term)**: Pinecone Vector Store. Semantic archives of all interactions.
- **Fact Store**: Postgres. Hard facts (User Name, API Keys) that should not be Hallucinated.

## Vectorization Strategy
We utilize a **Sliding Window** approach for embedding.
1. Raw Text is chunked into 512-token segments.
2. Segments are enriched with metadata (Timestamp, Speaker).
3. Embeddings are generated via \`text-embedding-3-small\`.
`,
  },
  marey: {
    id: "marey",
    name: "MAREY_VISUAL",
    alias: "VISUAL__CORTEX",
    description:
      "High-fidelity rendering pipeline for generative visual synthesis.",
    fullDescription:
      "Named after Étienne-Jules Marey, this module handles all visual outputs. It connects to generative models to synthesize images and UI components on the fly. MAREY also manages the aesthetic stability of the frontend, ensuring that generated content adheres to the strict 'Design OS' guidelines.",
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
# Architecture: MAREY Renderer

## Visual Synthesis Pipeline
MAREY is an **Event-Driven** render engine. It listens for \`RENDER_REQUEST\` events on the System Bus and output pixel data or React Components.

### The Generative Loop
1. **Intent Parsing**: Determines if the user wants a *Chart*, an *Image*, or a *3D Object*.
2. **Layout Engine**: Calculates the bounding box constraints.
3. **Synthesis**:
   - *3D*: Instantiates R3F canvas components.
   - *2D*: Calls Stable Diffusion API via localized proxy.

## Performance Optimization
To maintain 60FPS on the Client, MAREY offloads all heavy generation to a dedicated GPU worker thread.
`,
  },
  ore: {
    id: "ore",
    name: "ORE_LABS",
    alias: "R&D__SECTOR",
    description:
      "Deep analysis engine for pattern recognition and algorithmic research.",
    fullDescription:
      "ORE (Optimized Research Engine) is the analytical left-brain. It processes large datasets to find patterns, anomalies, and correlations. Used primarily for market analysis and system optimization, ORE runs background jobs that continuously refine the efficiency of the other modules.",
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
# Architecture: ORE (Optimized Research Engine)

## Distributed Compute Grid
ORE is designed to run asynchronously. It follows a **Leader-Follower** architecture.
- **The Brain (Leader)**: FastAPI Server that queues jobs.
- **The Minions (Followers)**: Python workers processing data frames.

## Algorithmic Strategy
ORE utilizes a custom implementation of **Prophet** for time-series forecasting, modified to account for high-volatility "Black Swan" events in the input data.

### Data Ingestion
ORE accepts \`.csv\`, \`.json\`, and real-time WebSocket streams.
`,
  },
  capsule: {
    id: "capsule",
    name: "CAPSULE_SYS",
    alias: "AUX__DOCK",
    description: "Modular plugin architecture for external tool integration.",
    fullDescription:
      "CAPSULE is the expansion bay of Axiom. It defines a standard protocol for third-party tools to 'dock' with the system. Whether it's a code editor, a terminal interface, or a music player, CAPSULE surrounds it with a secure sandbox and creates a bridge for it to communicate with the Core Bus.",
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
# Architecture: CAPSULE Sandbox

## The Plugin Protocol
CAPSULE enforces strictly typed interfaces using **Zod** schemas. A plugin cannot load unless its manifest complies with the Core Standard.

### Isolation Strategy
To prevent plugins from crashing the Main Thread, CAPSULE runs all external code in a **Web Worker** or an isolated **Iframe**.
Communication happens via the \`postMessage\` API, wrapped in a type-safe RPC layer.

\`\`\`typescript
// Example Manifest
interface PluginManifest {
  id: string;
  permissions: ["read:memory", "write:log"];
  entryPoint: "main.wasm";
}
\`\`\`
`,
  },
};

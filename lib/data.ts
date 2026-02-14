import {
  Shield,
  Brain,
  Eye,
  Microscope,
  Box,
  LucideIcon,
  Terminal,
  FileText,
  Cpu,
  Layers,
  Zap,
  Settings,
  BookOpen,
  Workflow,
  BarChart3,
  Target,
} from "lucide-react";

export type ProjectId = "sentry" | "mt" | "marey" | "ore" | "capsule";

export interface DocFile {
  id: string;
  title: string;
  filename: string;
  icon: LucideIcon;
  description?: string;
}

export interface DocCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  docs: DocFile[];
}

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
  documentation?: string; // Legacy field
  docsPath: string; // Path to docs folder
  docCategories: DocCategory[]; // Organized documentation
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
    docsPath: "docs/sentry",
    docCategories: [
      {
        id: "overview",
        name: "Overview",
        icon: BookOpen,
        docs: [
          {
            id: "readme",
            title: "README",
            filename: "README.md",
            icon: FileText,
            description: "Project overview and quick start",
          },
        ],
      },
      {
        id: "architecture",
        name: "Architecture",
        icon: Layers,
        docs: [
          {
            id: "architecture",
            title: "System Architecture",
            filename: "ARCHITECTURE.md",
            icon: Cpu,
            description: "Complete technical architecture",
          },
          {
            id: "neural_hub",
            title: "Neural Hub",
            filename: "NEURAL_HUB.md",
            icon: Brain,
            description: "Intelligence engine documentation",
          },
        ],
      },
      {
        id: "development",
        name: "Development",
        icon: Terminal,
        docs: [
          {
            id: "development",
            title: "Development Guide",
            filename: "DEVELOPMENT.md",
            icon: Settings,
            description: "Setup and contribution guide",
          },
          {
            id: "api",
            title: "API Reference",
            filename: "API.md",
            icon: Zap,
            description: "REST & WebSocket API",
          },
          {
            id: "api_quick",
            title: "API Quick Reference",
            filename: "API_QUICK_REFERENCE.md",
            icon: Target,
            description: "Quick API cheatsheet",
          },
        ],
      },
      {
        id: "operations",
        name: "Operations",
        icon: Settings,
        docs: [
          {
            id: "deployment",
            title: "Deployment",
            filename: "DEPLOYMENT.md",
            icon: BarChart3,
            description: "Production deployment guide",
          },
          {
            id: "user_guide",
            title: "User Guide",
            filename: "USER_GUIDE.md",
            icon: BookOpen,
            description: "End-user documentation",
          },
        ],
      },
    ],
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
    docsPath: "docs/MT",
    docCategories: [
      {
        id: "overview",
        name: "Overview",
        icon: BookOpen,
        docs: [
          {
            id: "readme",
            title: "README",
            filename: "README.md",
            icon: FileText,
            description: "Project overview and quick start",
          },
          {
            id: "api",
            title: "API Reference",
            filename: "API.md",
            icon: Zap,
            description: "REST API documentation",
          },
        ],
      },
      {
        id: "thesis",
        name: "Technical Reference",
        icon: Layers,
        docs: [
          {
            id: "overview",
            title: "Unified System Overview",
            filename: "00_Unified_System_Overview.md",
            icon: Target,
            description: "Philosophy and high-level concepts",
          },
          {
            id: "problem",
            title: "Problem Statement",
            filename: "01_Problem_Statement_and_Methodology.md",
            icon: BarChart3,
            description: "Research methodology",
          },
          {
            id: "architecture",
            title: "Architectural Layers",
            filename: "02_Architectural_Layers.md",
            icon: Cpu,
            description: "Deep dive into system layers",
          },
          {
            id: "evolution",
            title: "System Evolution",
            filename: "03_System_Evolution_and_Phases.md",
            icon: Workflow,
            description: "Development phases",
          },
          {
            id: "workflows",
            title: "Functional Workflows",
            filename: "04_Functional_Workflows.md",
            icon: Zap,
            description: "System workflows",
          },
          {
            id: "tech_stack",
            title: "Technology Stack",
            filename: "05_Technology_Stack_and_Justification.md",
            icon: Settings,
            description: "Tech choices and rationale",
          },
          {
            id: "math",
            title: "Mathematical Specifications",
            filename: "06_Mathematical_Specifications.md",
            icon: BarChart3,
            description: "Truth Vector algebra",
          },
          {
            id: "e2e",
            title: "End-to-End Workflow",
            filename: "07_End_to_End_Workflow.md",
            icon: Workflow,
            description: "Data flow from API to storage",
          },
        ],
      },
      {
        id: "roadmap",
        name: "Roadmap",
        icon: Target,
        docs: [
          {
            id: "roadmap",
            title: "Phase 5-6-7 Roadmap",
            filename: "ROADMAP_PHASE_5_6_7.md",
            icon: Target,
            description: "Future development roadmap",
          },
        ],
      },
    ],
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
    docsPath: "docs/marey",
    docCategories: [
      {
        id: "overview",
        name: "Overview",
        icon: BookOpen,
        docs: [
          {
            id: "readme",
            title: "README",
            filename: "README.md",
            icon: FileText,
            description: "Project overview",
          },
        ],
      },
      {
        id: "architecture",
        name: "Architecture & Specs",
        icon: Layers,
        docs: [
          {
            id: "architecture",
            title: "Architecture",
            filename: "architecture.md",
            icon: Cpu,
            description: "System architecture",
          },
        ],
      },
      {
        id: "phases",
        name: "Development Phases",
        icon: Workflow,
        docs: [
          {
            id: "phase0_spec",
            title: "Phase 0 Specification",
            filename: "phase0_spec.md",
            icon: Target,
            description: "Hardware detection specs",
          },
          {
            id: "phase0_report",
            title: "Phase 0 Report",
            filename: "phase0_report.md",
            icon: BarChart3,
            description: "Phase 0 completion report",
          },
          {
            id: "phase0.5_spec",
            title: "Phase 0.5 Specification",
            filename: "phase0.5_spec.md",
            icon: Target,
            description: "Model abstraction specs",
          },
          {
            id: "phase0.5_report",
            title: "Phase 0.5 Report",
            filename: "phase0.5_report.md",
            icon: BarChart3,
            description: "Phase 0.5 completion report",
          },
          {
            id: "phase1_complete",
            title: "Phase 1 Completion",
            filename: "phase1_complete.md",
            icon: Zap,
            description: "Phase 1 completion report",
          },
        ],
      },
    ],
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
    docsPath: "docs/ore",
    docCategories: [
      {
        id: "overview",
        name: "Overview",
        icon: BookOpen,
        docs: [
          {
            id: "readme",
            title: "README",
            filename: "README.md",
            icon: FileText,
            description: "Project overview and setup",
          },
        ],
      },
      {
        id: "technical",
        name: "Technical Documentation",
        icon: Layers,
        docs: [
          {
            id: "system_overview",
            title: "System Overview",
            filename: "01_System_Overview.md",
            icon: Target,
            description: "Introduction and philosophy",
          },
          {
            id: "architecture",
            title: "Architecture & Data Flow",
            filename: "02_Architecture_and_Data_Flow.md",
            icon: Cpu,
            description: "System architecture details",
          },
          {
            id: "algorithms",
            title: "Core Algorithms",
            filename: "03_Core_Algorithms_and_Methodology.md",
            icon: Brain,
            description: "Algorithmic methodology",
          },
          {
            id: "implementation",
            title: "Implementation Guide",
            filename: "04_Module_Implementation_Guide.md",
            icon: Settings,
            description: "Module implementation details",
          },
          {
            id: "database",
            title: "Database & Schema",
            filename: "05_Database_and_Schema.md",
            icon: Layers,
            description: "Database design",
          },
        ],
      },
    ],
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
    docsPath: "docs/capsule",
    docCategories: [
      {
        id: "overview",
        name: "Overview",
        icon: BookOpen,
        docs: [
          {
            id: "readme",
            title: "README",
            filename: "README.md",
            icon: FileText,
            description: "Project overview and getting started",
          },
        ],
      },
      {
        id: "progress",
        name: "Progress",
        icon: BarChart3,
        docs: [
          {
            id: "progress",
            title: "Development Progress",
            filename: "progress.md",
            icon: Target,
            description: "Current development status",
          },
          {
            id: "phase1",
            title: "Phase 1 Details",
            filename: "phase_1.md",
            icon: Workflow,
            description: "Phase 1 implementation details",
          },
        ],
      },
    ],
  },
};

# AGENTS.md - Axiom Project Guidelines

## Project Overview

Axiom is a Next.js 16 portfolio project with a sci-fi/cyberpunk aesthetic. It uses the App Router architecture and features interactive visualizations, project documentation, and a command palette interface.

## Build Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint (Next.js config)
```

**Note:** No test framework is currently configured in this project.

## Project Structure

```
app/                 # Next.js App Router pages
  modules/[id]/      # Dynamic project module pages
  globals.css        # Global Tailwind styles with custom theme
components/
  ui/                # Reusable UI components (CommandPalette, MarkdownRenderer, etc.)
  layout/            # Layout components (SystemMap)
  viz/               # Data visualization components (TechRadar, CoreMap)
  canvas/            # Canvas/WebGL components (NeuralBackground)
context/             # React Context providers (TransitionContext)
lib/                 # Utilities and data
  utils.ts           # Helper functions (cn() for class merging)
  data.ts            # Project data and documentation
docs/                # Markdown documentation files
public/              # Static assets
```

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - All TypeScript strict flags are on
- Use explicit types for function parameters and return types when not obvious
- Use `type` keyword for type imports: `import type { Metadata } from "next"`
- Prefer interfaces for object shapes, types for unions/complex types

### Naming Conventions

- **Components:** PascalCase (e.g., `CommandPalette`, `SystemMap`)
- **Files:** Match component name for components (PascalCase), camelCase for utilities
- **Types/Interfaces:** PascalCase with descriptive names
- **Constants:** UPPER_SNAKE_CASE for true constants
- **Functions:** camelCase, verb-first (e.g., `animatePageOut`, `handleClick`)
- **Variables:** camelCase (e.g., `isLoading`, `projectData`)

### Imports

```typescript
// 1. React imports first
import React, { useState, useEffect } from "react";

// 2. Next.js imports
import { useRouter } from "next/navigation";
import type { Metadata } from "next";

// 3. Third-party libraries
import { motion } from "framer-motion";
import { Search } from "lucide-react";

// 4. Internal utilities/components (use @/ alias)
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/ui/CommandPalette";
```

### Component Patterns

- **Client Components:** Always add `"use client"` directive at the top for components using React hooks or browser APIs
- **Server Components:** Default to server components when possible (no directive needed)
- Use functional components with arrow functions for consistency
- Destructure props in component parameters

```typescript
"use client";

interface Props {
  title: string;
  onAction: () => void;
}

export const ComponentName = ({ title, onAction }: Props) => {
  const [state, setState] = useState(false);
  
  return <div>{title}</div>;
};
```

### Styling (Tailwind CSS)

- Use `cn()` utility from `@/lib/utils` for conditional class merging
- Custom theme colors available:
  - `--color-neural` (#00f0ff) - SENTRY / Intelligence
  - `--color-memory` (#bd00ff) - MT / Context
  - `--color-research` (#ffaa00) - ORE / Analysis
  - `--color-visual` (#ff0055) - MAREY / Media
  - `--color-tools` (#00ff9d) - CAPSULE / Execution
  - `--color-void` (#050505) - Background
  - `--color-void-panel` (#0a0a0a) - Panel backgrounds
- Use `font-mono` for terminal/code aesthetic elements
- Opacity modifiers: `white/10`, `white/50`, etc.

### Error Handling

- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Avoid using `any` type - use `unknown` when type is uncertain
- Guard clauses for early returns in conditional logic

### Animation & Effects

- Use `framer-motion` for animations
- Respect the sci-fi aesthetic with purposeful motion
- Include `will-change` hints for GPU-accelerated properties

### State Management

- Local state: `useState`, `useReducer`
- Global state: React Context in `context/` directory
- Custom hooks should be prefixed with `use` and placed in relevant context files

## Linting

ESLint is configured with Next.js defaults (`eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`). Run `npm run lint` to check for issues.

## Type Checking

TypeScript strict mode is enabled. The project uses `tsc` via Next.js. Run a build to check for type errors: `npm run build`

## Key Conventions

1. Always use the `@/` path alias for imports (configured in tsconfig.json)
2. Icons come from `lucide-react` library
3. The UI has a dark "terminal" aesthetic - maintain consistency
4. Components using browser APIs or React hooks must use `"use client"`
5. Project data lives in `lib/data.ts` with TypeScript interfaces defined there
6. Animations should be smooth but not excessive (respect the cyberpunk theme)

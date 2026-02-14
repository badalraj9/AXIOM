"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Layers, Server, Database, Cpu, Globe, Shield, Box } from "lucide-react";

interface ArchitectureNode {
  id: string;
  label: string;
  icon?: React.ElementType;
  color?: string;
  children?: ArchitectureNode[];
}

interface ArchitectureDiagramProps {
  title?: string;
  nodes: ArchitectureNode[];
  connections?: { from: string; to: string; label?: string }[];
}

export function ArchitectureDiagram({ title, nodes }: ArchitectureDiagramProps) {
  return (
    <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-[#0a0a0a] to-[#050505] overflow-hidden shadow-2xl shadow-cyan-500/5">
      {/* Header */}
      <div className="px-4 py-3 border-b border-cyan-500/10 bg-cyan-500/5 flex items-center gap-2">
        <Layers size={14} className="text-cyan-400" />
        <span className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest">
          {title || "System Architecture"}
        </span>
      </div>
      
      {/* Diagram */}
      <div className="p-6">
        <div className="flex flex-col gap-6">
          {nodes.map((node, index) => (
            <ArchitectureNodeComponent key={node.id} node={node} isLast={index === nodes.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArchitectureNodeComponent({ 
  node, 
  isLast,
  depth = 0 
}: { 
  node: ArchitectureNode; 
  isLast?: boolean;
  depth?: number;
}) {
  const Icon = node.icon || Box;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={cn("relative", depth > 0 && "ml-8")}>
      {/* Connector Line */}
      {depth > 0 && (
        <div className="absolute -left-6 top-6 w-4 h-px bg-gradient-to-r from-cyan-500/30 to-cyan-500/10" />
      )}
      
      {/* Node Card */}
      <div 
        className={cn(
          "relative p-4 rounded-lg border transition-all duration-300",
          "bg-white/[0.02] hover:bg-white/[0.04]",
          "border-white/10 hover:border-cyan-500/30",
          "group"
        )}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg bg-gradient-to-br",
            node.color || "from-cyan-500/20 to-cyan-500/5"
          )}>
            <Icon size={18} className="text-cyan-400" />
          </div>
          
          <div>
            <h4 className="text-sm font-bold font-mono text-white/90">
              {node.label}
            </h4>
            {hasChildren && (
              <span className="text-[10px] font-mono text-white/40">
                {node.children?.length} sub-modules
              </span>
            )}
          </div>
        </div>

        {/* Children */}
        {hasChildren && (
          <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
            {node.children?.map((child, idx) => (
              <ArchitectureNodeComponent 
                key={child.id} 
                node={child} 
                depth={depth + 1}
                isLast={idx === (node.children?.length || 0) - 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Vertical Connector */}
      {!isLast && depth === 0 && (
        <div className="absolute left-6 -bottom-6 w-px h-6 bg-gradient-to-b from-cyan-500/30 to-transparent" />
      )}
    </div>
  );
}

// ASCII Art Enhancer - Makes ASCII diagrams look beautiful
export function AsciiArtContainer({ 
  children, 
  title,
  type = "generic"
}: { 
  children: string; 
  title?: string;
  type?: "architecture" | "tree" | "generic";
}) {
  const typeStyles = {
    architecture: {
      border: "border-cyan-500/30",
      bg: "from-cyan-500/5 to-transparent",
      glow: "shadow-cyan-500/10",
    },
    tree: {
      border: "border-green-500/30",
      bg: "from-green-500/5 to-transparent",
      glow: "shadow-green-500/10",
    },
    generic: {
      border: "border-white/20",
      bg: "from-white/5 to-transparent",
      glow: "shadow-white/5",
    },
  };

  const style = typeStyles[type];

  return (
    <div className={cn(
      "my-8 rounded-xl border overflow-hidden",
      "bg-gradient-to-br",
      style.border,
      style.bg,
      style.glow
    )}>
      {title && (
        <div className={cn(
          "px-4 py-2 border-b flex items-center gap-2",
          style.border
        )}>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-current opacity-60" />
            <div className="w-2 h-2 rounded-full bg-current opacity-40" />
            <div className="w-2 h-2 rounded-full bg-current opacity-20" />
          </div>
          <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
            {title}
          </span>
        </div>
      )}
      
      <div className="p-6 overflow-x-auto">
        <pre 
          className={cn(
            "text-xs md:text-sm font-mono leading-relaxed whitespace-pre",
            "text-white/80",
            "ascii-art"
          )}
          style={{
            textShadow: "0 0 20px rgba(0, 240, 255, 0.2)",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          }}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}

// Flow Chart Component
export function FlowChart({ 
  steps,
  title 
}: { 
  steps: { id: string; label: string; description?: string }[];
  title?: string;
}) {
  return (
    <div className="my-8 rounded-xl border border-purple-500/20 bg-gradient-to-br from-[#0a0a0a] to-[#050505] overflow-hidden">
      {title && (
        <div className="px-4 py-3 border-b border-purple-500/10 bg-purple-500/5">
          <span className="text-[10px] font-mono text-purple-400/60 uppercase tracking-widest">
            {title}
          </span>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-col gap-0">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-start gap-4 group">
                {/* Step Number */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-400">
                      {index + 1}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-8 bg-gradient-to-b from-purple-500/30 to-purple-500/10" />
                  )}
                </div>
                
                {/* Step Content */}
                <div className="flex-1 pb-6">
                  <h4 className="text-sm font-bold font-mono text-white/90 mb-1">
                    {step.label}
                  </h4>
                  {step.description && (
                    <p className="text-xs text-white/50">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// Tech Stack Grid
export function TechStackGrid({ 
  items 
}: { 
  items: { name: string; icon?: React.ElementType; color?: string }[];
}) {
  return (
    <div className="my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item, index) => {
        const Icon = item.icon || Box;
        return (
          <div
            key={index}
            className={cn(
              "p-4 rounded-lg border transition-all duration-300",
              "bg-white/[0.02] hover:bg-white/[0.04]",
              "border-white/10 hover:border-white/20",
              "group cursor-default"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-md bg-gradient-to-br",
                item.color || "from-white/10 to-white/5"
              )}>
                <Icon size={16} className="text-white/60" />
              </div>
              <span className="text-xs font-mono text-white/70 group-hover:text-white/90 transition-colors">
                {item.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

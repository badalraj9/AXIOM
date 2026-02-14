"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";
import { 
  Terminal, 
  FileCode, 
  Database, 
  Server, 
  Cpu, 
  Layers,
  Box,
  ArrowRight,
  Copy,
  Check,
  ChevronRight
} from "lucide-react";

// Language icon mapping
const languageIcons: Record<string, React.ElementType> = {
  bash: Terminal,
  sh: Terminal,
  zsh: Terminal,
  shell: Terminal,
  js: FileCode,
  javascript: FileCode,
  ts: FileCode,
  typescript: FileCode,
  py: FileCode,
  python: FileCode,
  json: Database,
  yaml: Database,
  yml: Database,
  sql: Database,
  go: Cpu,
  rust: Cpu,
  cpp: Cpu,
  c: Cpu,
  java: Cpu,
  default: FileCode,
};

// Custom Sci-Fi Syntax Highlighting
function highlightCode(code: string, language?: string): string {
  // Simple syntax highlighting patterns
  const patterns = [
    // Comments
    { regex: /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$|--.*$)/gm, class: "comment" },
    // Strings
    { regex: /(".*?"|'.*?'|`[\s\S]*?`)/g, class: "string" },
    // Keywords
    { regex: /\b(const|let|var|function|class|interface|type|import|export|from|return|if|else|for|while|async|await|try|catch|throw|new|this|true|false|null|undefined)\b/g, class: "keyword" },
    // Numbers
    { regex: /\b\d+\.?\d*\b/g, class: "number" },
    // Functions
    { regex: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, class: "function" },
    // Types
    { regex: /\b(string|number|boolean|void|any|unknown|never|object|Array|Promise|Record|Map|Set)\b/g, class: "type" },
  ];

  let highlighted = code;
  const tokens: { text: string; class?: string }[] = [];
  
  // Simple tokenization (basic approach)
  // This is a simplified version - for production, use Prism or similar
  return highlighted;
}

// Diagram Container Component
function DiagramContainer({ 
  children, 
  title, 
  type = "architecture",
  className 
}: { 
  children: React.ReactNode; 
  title?: string;
  type?: "architecture" | "flowchart" | "ascii" | "tree";
  className?: string;
}) {
  const typeConfig = {
    architecture: {
      icon: Layers,
      borderColor: "border-cyan-500/30",
      bgColor: "bg-cyan-500/5",
      label: "SYSTEM ARCHITECTURE",
    },
    flowchart: {
      icon: ArrowRight,
      borderColor: "border-purple-500/30",
      bgColor: "bg-purple-500/5",
      label: "FLOW DIAGRAM",
    },
    ascii: {
      icon: Box,
      borderColor: "border-green-500/30",
      bgColor: "bg-green-500/5",
      label: "STRUCTURE",
    },
    tree: {
      icon: Server,
      borderColor: "border-orange-500/30",
      bgColor: "bg-orange-500/5",
      label: "HIERARCHY",
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn(
      "my-8 rounded-xl border overflow-hidden shadow-2xl",
      config.borderColor,
      className
    )}>
      {/* Header */}
      <div className={cn(
        "px-4 py-3 border-b flex items-center justify-between",
        config.bgColor,
        config.borderColor
      )}>
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-white/60" />
          <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">
            {config.label}
          </span>
        </div>
        {title && (
          <span className="text-xs font-mono text-white/80">{title}</span>
        )}
      </div>
      
      {/* Content */}
      <div className={cn(
        "p-6 overflow-x-auto",
        "bg-gradient-to-br from-[#0a0a0a] to-[#050505]"
      )}>
        <div className="min-w-max">
          {children}
        </div>
      </div>
    </div>
  );
}

// Code Block Component with Copy Functionality
function CodeBlock({ 
  children, 
  className,
  inline = false,
}: { 
  children: string; 
  className?: string;
  inline?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "text";
  const Icon = languageIcons[language] || languageIcons.default;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-cyan-400 border border-white/5">
        {children}
      </code>
    );
  }

  // Detect if this is an ASCII diagram
  const isDiagram = children.includes("┌") || children.includes("└") || children.includes("├") || 
                    children.includes("│") || children.includes("─") || children.includes("▶");
  
  if (isDiagram) {
    return (
      <DiagramContainer type="ascii">
        <pre className="text-xs font-mono text-white/80 leading-relaxed whitespace-pre">
          {children}
        </pre>
      </DiagramContainer>
    );
  }

  return (
    <div className="my-6 rounded-lg border border-white/10 bg-[#0d0d0d] overflow-hidden shadow-2xl shadow-black/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          {/* Window Controls */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          
          <div className="h-4 w-px bg-white/10 mx-2" />
          
          {/* Language Badge */}
          <div className="flex items-center gap-1.5">
            <Icon size={12} className="text-white/40" />
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
              {language === "text" ? "Plain Text" : language}
            </span>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5 transition-colors group"
        >
          {copied ? (
            <Check size={12} className="text-green-500" />
          ) : (
            <Copy size={12} className="text-white/30 group-hover:text-white/60" />
          )}
          <span className="text-[10px] font-mono text-white/30 group-hover:text-white/60">
            {copied ? "Copied!" : "Copy"}
          </span>
        </button>
      </div>

      {/* Code Content with Line Numbers */}
      <div className="flex">
        {/* Line Numbers */}
        <div className="py-4 px-3 bg-white/[0.02] border-r border-white/5 text-right select-none">
          {children.split("\n").map((_, i) => (
            <div
              key={i}
              className="text-[10px] font-mono text-white/20 leading-5"
            >
              {i + 1}
            </div>
          ))}
        </div>
        
        {/* Code */}
        <div className="flex-1 overflow-x-auto">
          <pre className="p-4 text-xs font-mono leading-5">
            <code className="text-white/80">{children}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

// Enhanced Table Component
function StyledTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          {children}
        </table>
      </div>
    </div>
  );
}

// Enhanced Heading Components
function Heading1({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-16 mb-8 relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-transparent" />
      <div className="pl-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            <ChevronRight size={14} className="text-cyan-500" />
          </div>
          <span className="text-[10px] font-mono text-cyan-500/60 tracking-[0.3em] uppercase">
            System Documentation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
          {children}
        </h1>
      </div>
      <div className="mt-4 h-px bg-gradient-to-r from-cyan-500/30 via-white/10 to-transparent" />
    </div>
  );
}

function Heading2({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-12 mb-6 flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <div className="w-8 h-px bg-gradient-to-r from-green-500 to-transparent" />
      </div>
      <h2 className="text-lg font-bold font-mono text-green-400 uppercase tracking-wider">
        {children}
      </h2>
    </div>
  );
}

function Heading3({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 mb-4 flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
      <h3 className="text-xs font-bold font-mono text-white/70 uppercase tracking-widest">
        {children}
      </h3>
    </div>
  );
}

// Architecture Block - Special styling for big architecture sections
function ArchitectureBlock({ children }: { children: string }) {
  return (
    <DiagramContainer type="architecture" title="System Overview">
      <pre className="text-xs md:text-sm font-mono text-white/80 leading-relaxed whitespace-pre">
        {children}
      </pre>
    </DiagramContainer>
  );
}

// Detect if content is an architecture diagram
function isArchitectureDiagram(content: string): boolean {
  const patterns = [
    /┌[─]+┐/,
    /└[─]+┘/,
    /SENTRY|PLATFORM|LAYER|API|CORE/i,
    /Interface|Gateway|Business Logic|Data Layer/i,
  ];
  return patterns.some(p => p.test(content));
}

// Custom Components for Markdown
const components = {
  h1: ({ node, ...props }: any) => <Heading1>{props.children}</Heading1>,
  h2: ({ node, ...props }: any) => <Heading2>{props.children}</Heading2>,
  h3: ({ node, ...props }: any) => <Heading3>{props.children}</Heading3>,
  h4: ({ node, ...props }: any) => (
    <h4 className="text-xs font-semibold font-mono text-white/60 tracking-wide mt-6 mb-3 flex items-center gap-2">
      <span className="w-1 h-1 bg-white/30 rounded-full" />
      {props.children}
    </h4>
  ),
  
  p: ({ node, children, ...props }: any) => {
    // Check if this paragraph contains an ASCII diagram
    const textContent = React.Children.toArray(children).join("");
    if (isArchitectureDiagram(textContent)) {
      return <ArchitectureBlock>{textContent}</ArchitectureBlock>;
    }

    const hasBlock = node.children?.some(
      (child: any) =>
        child.tagName === "pre" ||
        child.tagName === "code" ||
        (child.type === "element" && ["div", "pre"].includes(child.tagName)),
    );

    if (hasBlock) {
      return <>{children}</>;
    }

    return (
      <p className="text-sm text-white/70 leading-relaxed mb-5 font-light max-w-3xl">
        {children}
      </p>
    );
  },

  ul: ({ node, ...props }: any) => (
    <ul className="space-y-2 mb-6 ml-2">
      {props.children}
    </ul>
  ),
  
  ol: ({ node, ...props }: any) => (
    <ol className="space-y-2 mb-6 ml-6 list-decimal text-white/70 font-mono text-sm">
      {props.children}
    </ol>
  ),
  
  li: ({ node, checked, ...props }: any) => {
    // Handle task lists
    if (checked !== undefined && checked !== null) {
      return (
        <li className="flex items-start gap-3 text-sm text-white/70 py-1">
          <div className={cn(
            "mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0",
            checked 
              ? "bg-green-500/20 border-green-500/50" 
              : "bg-white/5 border-white/20"
          )}>
            {checked && <Check size={10} className="text-green-500" />}
          </div>
          <span className={checked ? "text-white/50 line-through" : ""}>
            {props.children}
          </span>
        </li>
      );
    }
    
    return (
      <li className="flex items-start gap-3 text-sm text-white/70 py-1 group">
        <span 
          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: "var(--color-neural)" }}
        />
        <span>{props.children}</span>
      </li>
    );
  },

  code: ({ node, inline, className, children, ...props }: any) => {
    const content = String(children).replace(/\n$/, "");
    return (
      <CodeBlock className={className} inline={inline}>
        {content}
      </CodeBlock>
    );
  },

  blockquote: ({ node, ...props }: any) => (
    <blockquote className="relative my-8 p-6 bg-gradient-to-r from-yellow-500/10 to-transparent border-l-2 border-yellow-500/50 rounded-r-lg">
      <div className="absolute -left-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 via-yellow-500/50 to-transparent" />
      <div className="text-2xl text-yellow-500/20 absolute top-2 left-4 font-serif">"</div>
      <p className="text-sm text-yellow-100/80 italic font-mono pl-4 relative z-10">
        {props.children}
      </p>
    </blockquote>
  ),

  table: ({ node, ...props }: any) => <StyledTable>{props.children}</StyledTable>,
  
  thead: ({ node, ...props }: any) => (
    <thead className="bg-white/[0.03] border-b border-white/10">
      {props.children}
    </thead>
  ),
  
  tbody: ({ node, ...props }: any) => (
    <tbody className="divide-y divide-white/5">
      {props.children}
    </tbody>
  ),
  
  tr: ({ node, ...props }: any) => (
    <tr className="transition-colors hover:bg-white/[0.03]">
      {props.children}
    </tr>
  ),
  
  th: ({ node, ...props }: any) => (
    <th className="px-4 py-3 text-left text-[10px] font-bold font-mono text-cyan-400/80 uppercase tracking-widest whitespace-nowrap">
      {props.children}
    </th>
  ),
  
  td: ({ node, ...props }: any) => (
    <td className="px-4 py-3 text-xs font-mono text-white/70 align-top">
      {props.children}
    </td>
  ),

  hr: ({ node, ...props }: any) => (
    <div className="my-12 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="flex items-center gap-1">
        <div className="w-1 h-1 bg-white/40 rounded-full" />
        <div className="w-1 h-1 bg-white/20 rounded-full" />
        <div className="w-1 h-1 bg-white/10 rounded-full" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  ),

  a: ({ node, href, ...props }: any) => (
    <a
      href={href}
      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-400/40 hover:decoration-cyan-300/80 transition-all font-mono"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),

  strong: ({ node, ...props }: any) => (
    <strong className="font-bold text-white font-mono">
      {props.children}
    </strong>
  ),

  em: ({ node, ...props }: any) => (
    <em className="italic text-white/80">
      {props.children}
    </em>
  ),

  // Custom pre handler for ASCII art detection
  pre: ({ node, children, ...props }: any) => {
    const codeElement = React.Children.toArray(children).find(
      (child: any) => child?.type === "code"
    ) as any;
    
    if (codeElement) {
      return children;
    }

    return (
      <pre className="my-6" {...props}>
        {children}
      </pre>
    );
  },
};

export function MarkdownRenderer({ children }: { children: string }) {
  return (
    <div className="axiom-docs prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

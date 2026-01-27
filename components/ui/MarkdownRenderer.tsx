"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

// Custom Components for Markdown
const components = {
  h1: ({ node, ...props }: any) => (
    <div className="mt-12 mb-6 border-b border-white/10 pb-2">
      <h1
        className="text-2xl font-black tracking-tighter text-white uppercase flex items-center gap-2"
        {...props}
      />
    </div>
  ),
  h2: ({ node, ...props }: any) => (
    <h2
      className="text-sm font-bold font-mono text-green-500 uppercase tracking-widest mt-8 mb-4 flex items-center gap-2"
      {...props}
    >
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
      {props.children}
    </h2>
  ),
  h3: ({ node, ...props }: any) => (
    <h3
      className="text-xs font-bold font-mono text-white/60 uppercase tracking-widest mt-6 mb-3"
      {...props}
    />
  ),
  p: ({ node, ...props }: any) => (
    <p
      className="text-sm text-white/70 leading-relaxed mb-4 font-mono font-light"
      {...props}
    />
  ),
  ul: ({ node, ...props }: any) => (
    <ul
      className="space-y-2 mb-6 ml-4 border-l border-white/10 pl-4"
      {...props}
    />
  ),
  ol: ({ node, ...props }: any) => (
    <ol
      className="space-y-2 mb-6 list-decimal list-inside text-white/70 font-mono text-sm"
      {...props}
    />
  ),
  li: ({ node, ...props }: any) => (
    <li
      className="text-sm text-white/60 group flex items-start gap-2"
      {...props}
    >
      <span className="mt-1.5 w-1 h-1 bg-white/20 group-hover:bg-white/60 transition-colors shrink-0" />
      <span>{props.children}</span>
    </li>
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    if (inline) {
      return (
        <code
          className="bg-white/10 px-1 py-0.5 rounded text-xs font-mono text-green-400"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <div className="my-6 rounded border border-white/10 bg-[#0a0a0a] overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-white/5">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <span className="ml-auto text-[10px] uppercase text-white/20 font-mono">
            Terminal_Output
          </span>
        </div>
        <pre className="p-4 overflow-x-auto text-xs text-white/80 font-mono leading-relaxed">
          <code {...props}>{children}</code>
        </pre>
      </div>
    );
  },
  blockquote: ({ node, ...props }: any) => (
    <blockquote
      className="border-l-2 border-yellow-500 bg-yellow-500/5 p-4 my-6 text-sm text-yellow-200/80 italic font-mono"
      {...props}
    />
  ),
};

export function MarkdownRenderer({ children }: { children: string }) {
  return (
    <div className="axiom-docs">
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </div>
  );
}

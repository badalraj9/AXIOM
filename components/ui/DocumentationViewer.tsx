"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, FileText, X, Menu, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { DocCategory, DocFile, Project } from "@/lib/data";

interface DocumentationViewerProps {
  project: Project;
}

interface DocContent {
  [key: string]: string;
}

export function DocumentationViewer({ project }: DocumentationViewerProps) {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [docContents, setDocContents] = useState<DocContent>({});
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(project.docCategories.map((cat) => cat.id))
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load initial doc (README)
  useEffect(() => {
    const readme = project.docCategories
      .flatMap((cat) => cat.docs)
      .find((doc) => doc.filename === "README.md");
    if (readme) {
      loadDoc(readme);
    }
  }, [project]);

  const loadDoc = async (doc: DocFile) => {
    if (docContents[doc.id]) {
      setSelectedDoc(doc.id);
      return;
    }

    setIsLoading(true);
    setSelectedDoc(doc.id);

    try {
      const response = await fetch(`/${project.docsPath}/${doc.filename}`);
      if (response.ok) {
        const content = await response.text();
        setDocContents((prev) => ({ ...prev, [doc.id]: content }));
      } else {
        setDocContents((prev) => ({
          ...prev,
          [doc.id]: `# Error Loading Document\n\nCould not load ${doc.filename}. File not found.`,
        }));
      }
    } catch (error) {
      setDocContents((prev) => ({
        ...prev,
        [doc.id]: `# Error Loading Document\n\nCould not load ${doc.filename}.`,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const selectedDocData = project.docCategories
    .flatMap((cat) => cat.docs)
    .find((doc) => doc.id === selectedDoc);

  return (
    <div className="flex h-full bg-[#0a0a0a] rounded-lg border border-white/10 overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-white/5 rounded border border-white/10"
      >
        <Menu size={16} />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-72 bg-[#050505] border-r border-white/10 flex flex-col shrink-0 absolute lg:relative z-40 h-full"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white/60">
                <BookOpen size={16} />
                <span className="text-[10px] font-mono uppercase tracking-widest">
                  Documentation
                </span>
              </div>
              <h3 className="text-sm font-bold mt-1">{project.name}</h3>
            </div>

            {/* Doc Tree */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {project.docCategories.map((category) => (
                <DocCategorySection
                  key={category.id}
                  category={category}
                  isExpanded={expandedCategories.has(category.id)}
                  onToggle={() => toggleCategory(category.id)}
                  selectedDoc={selectedDoc}
                  onSelectDoc={loadDoc}
                  accentColor={project.color}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 text-[10px] font-mono text-white/30">
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: `var(--color-${project.color})` }}
                />
                {project.docCategories.reduce(
                  (acc, cat) => acc + cat.docs.length,
                  0
                )}{" "}
                docs available
              </span>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#050505]/50">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 hover:bg-white/5 rounded transition-colors"
              >
                <Menu size={14} className="text-white/50" />
              </button>
            )}
            {selectedDocData && (
              <>
                <selectedDocData.icon
                  size={14}
                  style={{ color: `var(--color-${project.color})` }}
                />
                <span className="text-xs font-mono text-white/70">
                  {selectedDocData.title}
                </span>
                {selectedDocData.description && (
                  <>
                    <span className="text-white/20">|</span>
                    <span className="text-[10px] text-white/40">
                      {selectedDocData.description}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/30">
              {isLoading ? "LOADING..." : "READY"}
            </span>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedDoc && docContents[selectedDoc] ? (
            <motion.div
              key={selectedDoc}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 md:p-8 max-w-4xl"
            >
              <MarkdownRenderer>{docContents[selectedDoc]}</MarkdownRenderer>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-white/30">
              <div className="text-center">
                <FileText size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm font-mono">Select a document to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface DocCategorySectionProps {
  category: DocCategory;
  isExpanded: boolean;
  onToggle: () => void;
  selectedDoc: string | null;
  onSelectDoc: (doc: DocFile) => void;
  accentColor: string;
}

function DocCategorySection({
  category,
  isExpanded,
  onToggle,
  selectedDoc,
  onSelectDoc,
  accentColor,
}: DocCategorySectionProps) {
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-2 py-2 text-[10px] font-mono uppercase tracking-wider text-white/40 hover:text-white/60 hover:bg-white/5 rounded transition-all"
      >
        {isExpanded ? (
          <ChevronDown size={12} />
        ) : (
          <ChevronRight size={12} />
        )}
        <category.icon size={12} />
        <span className="flex-1 text-left">{category.name}</span>
        <span className="text-white/20">{category.docs.length}</span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pr-1 py-1 space-y-0.5">
              {category.docs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => onSelectDoc(doc)}
                  className={cn(
                    "w-full flex items-start gap-2 px-2 py-2 rounded text-left transition-all group",
                    selectedDoc === doc.id
                      ? "bg-white/10 border-l-2"
                      : "hover:bg-white/5 border-l-2 border-transparent"
                  )}
                  style={{
                    borderLeftColor:
                      selectedDoc === doc.id
                        ? `var(--color-${accentColor})`
                        : undefined,
                  }}
                >
                  <doc.icon
                    size={12}
                    className={cn(
                      "mt-0.5 shrink-0",
                      selectedDoc === doc.id
                        ? "text-white"
                        : "text-white/30 group-hover:text-white/50"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        "text-xs truncate",
                        selectedDoc === doc.id
                          ? "text-white font-medium"
                          : "text-white/60 group-hover:text-white/80"
                      )}
                    >
                      {doc.title}
                    </div>
                    {doc.description && (
                      <div className="text-[10px] text-white/30 truncate mt-0.5">
                        {doc.description}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

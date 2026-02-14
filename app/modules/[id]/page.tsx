"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { PROJECTS, ProjectId } from "@/lib/data";
import { Terminal, ArrowLeft, Share2, FileText } from "lucide-react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { TelemetryBlock } from "@/components/viz/TelemetryBlock";
import { useTransition } from "@/context/TransitionContext";
import { cn } from "@/lib/utils";
import { DocumentationViewer } from "@/components/ui/DocumentationViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

export default function ModulePage() {
  const params = useParams();
  const id = params.id as ProjectId;
  const project = PROJECTS[id];
  const { animatePageOut } = useTransition();
  const [activeTab, setActiveTab] = useState("overview");

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "ArrowLeft") {
        animatePageOut("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [animatePageOut]);

  if (!project) return <div>System Not Found</div>;

  const totalDocs = project.docCategories.reduce(
    (acc, cat) => acc + cat.docs.length,
    0
  );

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#050505] text-white">
      {/* HEADER ROW */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-white/10 text-[10px] font-mono text-white/30 tracking-widest bg-[#050505]/80 backdrop-blur z-20">
        <div className="flex items-center gap-4">
          <TransitionLink
            href="/"
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={10} /> RETURN_CONSOLE
          </TransitionLink>
          <span className="opacity-20">|</span>
          <span>SCHEMATIC_VIEW: {project.alias}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-green-500 animate-pulse">LIVE_FEED</span>
          <span>[SECURE__CONNECTION]</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col lg:flex-row gap-px bg-white/10 p-px relative z-10 overflow-hidden">
        {/* LEFT PANEL: System Info */}
        <div className="lg:w-80 bg-[#050505] p-6 flex flex-col gap-6 shrink-0 overflow-y-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="border-l-2 pl-4 py-2"
            style={{ borderColor: `var(--color-${project.color})` }}
          >
            <h1 className="text-4xl font-black tracking-tighter mb-1">
              {project.name}
            </h1>
            <p className="font-mono text-xs text-white/50 tracking-widest">
              ID: {project.alias}
            </p>
          </motion.div>

          {/* Status Panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-4 rounded"
          >
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono text-white/40 tracking-widest">
                SYSTEM_STATUS
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{
                    backgroundColor:
                      project.status === "ONLINE" || project.status === "ACTIVE"
                        ? "#22c55e"
                        : "#eab308",
                  }}
                />
                <span className="text-xs font-bold font-mono">
                  {project.status}
                </span>
              </div>
            </div>
            <TelemetryBlock className="opacity-80" />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <h3 className="text-[10px] font-mono text-white/40 mb-3 tracking-widest uppercase">
              Telemetry
            </h3>
            <div className="space-y-2">
              {Object.entries(project.stats).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 px-3 bg-white/5 rounded"
                >
                  <span className="text-[10px] font-mono text-white/40 uppercase">
                    {key}
                  </span>
                  <span
                    className="text-xs font-bold font-mono"
                    style={{ color: `var(--color-${project.color})` }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-[10px] font-mono text-white/40 mb-3 tracking-widest uppercase">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-white/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex-1"
          >
            <h3 className="text-[10px] font-mono text-white/40 mb-3 tracking-widest uppercase">
              Capabilities
            </h3>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-white/60 group"
                >
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: `var(--color-${project.color})` }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors uppercase font-mono text-[10px] tracking-widest flex items-center justify-center gap-2 group">
            <Share2 size={12} />
            Copy_System_Link
          </button>
        </div>

        {/* RIGHT PANEL: Content */}
        <div className="flex-1 bg-[#050505] flex flex-col min-w-0 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-col h-full"
          >
            {/* Tab Bar */}
            <div className="flex items-center gap-1 px-4 py-2 border-b border-white/10 bg-[#050505]/50 shrink-0">
              <TabsList className="bg-transparent border-0 p-0 gap-1">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50 hover:text-white/80 px-4 py-2 text-xs font-mono rounded transition-all border border-transparent data-[state=active]:border-white/10"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="docs"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50 hover:text-white/80 px-4 py-2 text-xs font-mono rounded transition-all border border-transparent data-[state=active]:border-white/10 flex items-center gap-2"
                >
                  <FileText size={12} />
                  Documentation
                  <span
                    className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `var(--color-${project.color})`, color: "#000" }}
                  >
                    {totalDocs}
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              <TabsContent value="overview" className="h-full m-0">
                <div className="h-full overflow-y-auto p-6 md:p-8">
                  <div className="max-w-3xl space-y-8">
                    {/* System Manifest */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h2 className="text-[10px] font-mono text-white/40 mb-4 flex items-center gap-2 tracking-widest uppercase">
                        <Terminal size={12} />
                        System Manifest
                      </h2>
                      <p className="text-lg leading-relaxed text-white/80 font-light border-l-2 pl-6"
                        style={{ borderColor: `var(--color-${project.color})` }}
                      >
                        {project.fullDescription}
                      </p>
                    </motion.div>

                    {/* Documentation Preview */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-6 bg-white/5 border border-white/10 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
                          Available Documentation
                        </h3>
                        <button
                          onClick={() => setActiveTab("docs")}
                          className="text-[10px] font-mono px-3 py-1.5 rounded border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                          style={{ color: `var(--color-${project.color})` }}
                        >
                          View All
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {project.docCategories.slice(0, 3).map((category) => (
                          <div
                            key={category.id}
                            className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
                          >
                            <category.icon size={14} className="text-white/30" />
                            <span className="text-xs text-white/60 flex-1">
                              {category.name}
                            </span>
                            <span className="text-[10px] text-white/30">
                              {category.docs.length} docs
                            </span>
                          </div>
                        ))}
                        {project.docCategories.length > 3 && (
                          <div className="text-[10px] text-white/30 text-center pt-2">
                            +{project.docCategories.length - 3} more categories
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Footer Log */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="p-4 bg-black/40 border border-white/10 font-mono text-[10px] text-green-500/60 mt-12"
                    >
                      <p className="mb-1">&gt; verifying integrity... OK</p>
                      <p className="mb-1">
                        &gt; accessing secure logs... ACCESS_GRANTED
                      </p>
                      <p className="animate-pulse">&gt; _</p>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="docs" className="h-full m-0 p-4">
                <DocumentationViewer project={project} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

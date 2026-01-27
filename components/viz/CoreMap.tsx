"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// --- TYPES ---
type NodeType =
  | "memory"
  | "cognition"
  | "execution"
  | "research"
  | "hardware"
  | "swarm";

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: NodeType;
  status: "ONLINE" | "DEGRADED" | "EXPERIMENTAL";
  color: string;
  shape: "circle" | "hexagon" | "diamond" | "rect" | "trapezoid" | "cluster";
  description: string;
  r?: number; // visual radius
}

interface GraphEdge extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  type: string;
  strength?: number;
}

// --- DATA DEFINITION ---
const INITIAL_NODES: GraphNode[] = [
  {
    id: "MEMORY_CORE",
    label: "MEMORY_CORE",
    type: "memory",
    status: "ONLINE",
    color: "#bd00ff",
    shape: "hexagon",
    description: "Epistemic memory & Context Bridge",
  },
  {
    id: "NEURAL_HUB",
    label: "NEURAL_HUB",
    type: "cognition",
    status: "ONLINE",
    color: "#00f0ff",
    shape: "circle",
    description: "Decision Intelligence & Governance",
  },
  {
    id: "RESEARCH_ENGINE",
    label: "RESEARCH_ENGINE",
    type: "research",
    status: "EXPERIMENTAL",
    color: "#ffaa00",
    shape: "diamond",
    description: "Deterministic Reasoning & Gap Analysis",
  },
  {
    id: "VISUAL_CORTEX",
    label: "VISUAL_CORTEX",
    type: "hardware",
    status: "DEGRADED",
    color: "#ff0055",
    shape: "trapezoid",
    description: "Hardware-Adaptive Media Processing",
  },
  {
    id: "PLUGIN_SYS",
    label: "PLUGIN_SYS",
    type: "execution",
    status: "ONLINE",
    color: "#00ff9d",
    shape: "rect",
    description: "Tooling & Capability Execution",
  },
  {
    id: "SWARM",
    label: "SWARM",
    type: "swarm",
    status: "ONLINE",
    color: "#4682b4",
    shape: "cluster",
    description: "Distributed Survivability Mesh",
  },
];

const INITIAL_EDGES: GraphEdge[] = [
  { source: "MEMORY_CORE", target: "NEURAL_HUB", type: "grounds" },
  { source: "NEURAL_HUB", target: "PLUGIN_SYS", type: "delegates" },
  { source: "PLUGIN_SYS", target: "MEMORY_CORE", type: "records" },
  { source: "RESEARCH_ENGINE", target: "MEMORY_CORE", type: "writes" },
  { source: "MEMORY_CORE", target: "RESEARCH_ENGINE", type: "retrieves" },
  { source: "NEURAL_HUB", target: "SWARM", type: "coordinates" },
  { source: "SWARM", target: "NEURAL_HUB", type: "feeds_back" },
  { source: "VISUAL_CORTEX", target: "PLUGIN_SYS", type: "accelerates" },
];

import { useRouter } from "next/navigation";

export const CoreMap = () => {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [fps, setFps] = useState(60);

  const handleNodeClick = (id: string) => {
    // Map ID to route slug
    const slug = id.split("_")[0].toLowerCase(); // NEURAL_HUB -> neural (wait, map needs to be better)
    // Better mapping logic:
    const map: Record<string, string> = {
      MEMORY_CORE: "mt",
      NEURAL_HUB: "sentry",
      RESEARCH_ENGINE: "ore",
      VISUAL_CORTEX: "marey",
      PLUGIN_SYS: "capsule",
      SWARM: "swarm",
    };
    if (map[id]) {
      router.push(`/modules/${map[id]}`);
    }
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    svg.selectAll("*").remove(); // Clear previous

    // --- SIMULATION SETUP ---
    const simulation = d3
      .forceSimulation<GraphNode>(JSON.parse(JSON.stringify(INITIAL_NODES))) // Deep copy to avoid strict mode issues
      .force(
        "link",
        d3
          .forceLink<GraphNode, GraphEdge>(
            JSON.parse(JSON.stringify(INITIAL_EDGES)),
          )
          .id((d) => d.id)
          .distance(150),
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(60));

    // --- DRAWING ELEMENTS ---
    const linkGroup = svg.append("g").attr("class", "links");
    const nodeGroup = svg.append("g").attr("class", "nodes");
    const labelGroup = svg.append("g").attr("class", "labels");

    // Arrow markers
    svg
      .append("defs")
      .selectAll("marker")
      .data(["end"])
      .join("marker")
      .attr("id", (d) => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 30) // Offset to not overlap node
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#444")
      .attr("d", "M0,-5L10,0L0,5");

    // Edges
    const linkData =
      simulation.force<d3.ForceLink<GraphNode, GraphEdge>>("link")?.links() ||
      [];
    const link = linkGroup
      .selectAll<SVGLineElement, GraphEdge>("line")
      .data(linkData)
      .join("line")
      .attr("stroke", "#333")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5") // Dashed by default
      .attr("marker-end", "url(#arrow-end)");

    // Edge Labels (Tiny type text)
    const linkLabel = linkGroup
      .selectAll<SVGTextElement, GraphEdge>("text")
      .data(linkData)
      .join("text")
      .attr("font-size", 8)
      .attr("fill", "#444")
      .attr("text-anchor", "middle")
      .attr("dy", -5)
      .text((d) => `[${d.type}]`);

    // Nodes
    const node = nodeGroup
      .selectAll<SVGGElement, GraphNode>("g")
      .data(simulation.nodes())
      .join("g")
      .call(
        d3
          .drag<SVGGElement, GraphNode>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      );

    // Node Shapes logic
    node.each(function (d) {
      const g = d3.select(this);
      const size = 20;

      // Glow filter placeholder
      if (d.id === "NEURAL_HUB" || d.id === "MEMORY_CORE") {
        // Add specific pulsing glow here if needed
      }

      switch (d.shape) {
        case "hexagon":
          // Approx hex path
          g.append("path")
            .attr("d", "M0,-24 L20,-12 L20,12 L0,24 L-20,12 L-20,-12 Z")
            .attr("fill", "#0a0a0a")
            .attr("stroke", d.color)
            .attr("stroke-width", 2);
          break;
        case "diamond":
          g.append("rect")
            .attr("width", size * 1.5)
            .attr("height", size * 1.5)
            .attr("x", -size * 0.75)
            .attr("y", -size * 0.75)
            .attr("transform", "rotate(45)")
            .attr("fill", "#0a0a0a")
            .attr("stroke", d.color)
            .attr("stroke-width", 2);
          break;
        case "rect":
          g.append("rect")
            .attr("width", size * 2.5)
            .attr("height", size * 1.5)
            .attr("x", -size * 1.25)
            .attr("y", -size * 0.75)
            .attr("fill", "#0a0a0a")
            .attr("stroke", d.color)
            .attr("stroke-width", 2);
          break;
        case "trapezoid":
          g.append("path")
            .attr("d", "M-15,-15 L15,-15 L25,15 L-25,15 Z")
            .attr("fill", "#0a0a0a")
            .attr("stroke", d.color)
            .attr("stroke-width", 2);
          break;
        case "cluster":
          // Small bunch of circles
          g.append("circle")
            .attr("r", 8)
            .attr("cx", -8)
            .attr("cy", -5)
            .attr("fill", "#0a0a0a")
            .attr("stroke", d.color);
          g.append("circle")
            .attr("r", 8)
            .attr("cx", 8)
            .attr("cy", -5)
            .attr("fill", "#0a0a0a")
            .attr("stroke", d.color);
          g.append("circle")
            .attr("r", 8)
            .attr("cx", 0)
            .attr("cy", 8)
            .attr("fill", "#0a0a0a")
            .attr("stroke", d.color);
          break;
        default: // Circle
          g.append("circle")
            .attr("r", size)
            .attr("fill", "#0a0a0a")
            .attr("stroke", d.color)
            .attr("stroke-width", 2);
      }

      // Status Dot
      const statusColor =
        d.status === "ONLINE"
          ? "#22c55e"
          : d.status === "EXPERIMENTAL"
            ? "#eab308"
            : "#ef4444";
      g.append("circle")
        .attr("r", 3)
        .attr("cx", 18) // Offset
        .attr("cy", -18)
        .attr("fill", statusColor)
        .attr("class", "animate-pulse"); // D3 doesn't handle CSS anims on standard attrs easily, controlled via className
    });

    // Hover events
    node
      .on("click", (event, d) => {
        handleNodeClick(d.id);
      })
      .on("mouseover", (event, d) => {
        setHoveredNode(d);

        // Dim others
        nodeGroup.selectAll("g").transition().style("opacity", 0.2);
        linkGroup.selectAll("line").transition().style("opacity", 0.1);
        linkGroup.selectAll("text").transition().style("opacity", 0);

        // Highlight current and connected
        const connectedIds = new Set();
        connectedIds.add(d.id);
        link.each(function (l) {
          if (typeof l.source !== "string" && typeof l.target !== "string") {
            if (l.source.id === d.id || l.target.id === d.id) {
              connectedIds.add(l.source.id);
              connectedIds.add(l.target.id);
              d3.select(this)
                .transition()
                .style("opacity", 1)
                .attr("stroke", d.color)
                .attr("stroke-dasharray", null); // Solid line
            }
          }
        });

        nodeGroup
          .selectAll("g")
          .filter((n: any) => connectedIds.has(n.id))
          .transition()
          .style("opacity", 1);
      })
      .on("mouseout", () => {
        setHoveredNode(null);
        // Reset
        nodeGroup.selectAll("g").transition().style("opacity", 1);
        linkGroup
          .selectAll("line")
          .transition()
          .style("opacity", 1)
          .attr("stroke", "#333")
          .attr("stroke-dasharray", "5,5");
        linkGroup.selectAll("text").transition().style("opacity", 1);
      });

    // Loop
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as GraphNode).x!)
        .attr("y1", (d) => (d.source as GraphNode).y!)
        .attr("x2", (d) => (d.target as GraphNode).x!)
        .attr("y2", (d) => (d.target as GraphNode).y!);

      linkLabel
        .attr(
          "x",
          (d) => ((d.source as GraphNode).x! + (d.target as GraphNode).x!) / 2,
        )
        .attr(
          "y",
          (d) => ((d.source as GraphNode).y! + (d.target as GraphNode).y!) / 2,
        );

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: GraphNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);

  // FPS Counter (Mock)
  useEffect(() => {
    const i = setInterval(() => {
      setFps(Math.floor(Math.random() * 2) + 59);
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] bg-[#050505] border-y border-white/10 overflow-hidden"
    >
      <svg ref={svgRef} className="w-full h-full cursor-crosshair"></svg>

      {/* Status Overlay */}
      <div className="absolute top-4 right-4 font-mono text-[10px] text-white/40 pointer-events-none">
        <div className="border border-white/10 bg-black/50 p-2 backdrop-blur-sm">
          <p className="border-b border-white/10 pb-1 mb-1 font-bold text-white/60">
            AXIOM CORE
          </p>
          <p>
            MODULES: <span className="text-green-500">6 ONLINE</span>
          </p>
          <p>GRAPH ENGINE: D3_FORCE</p>
          <p>
            STATUS: <span className="text-green-500">STABLE</span>
          </p>
          <p>FPS: {fps}</p>
        </div>
      </div>

      {/* Tooltip Panel */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          key={hoveredNode.id}
          className="absolute bottom-6 right-6 w-64 bg-black/90 border border-white/20 p-4 font-mono text-xs backdrop-blur-md"
          style={{ borderLeftColor: hoveredNode.color, borderLeftWidth: 2 }}
        >
          <p className="text-[10px] opacity-50 mb-1">MODULE_ID</p>
          <h3
            className="text-lg font-bold mb-2"
            style={{ color: hoveredNode.color }}
          >
            {hoveredNode.label}
          </h3>

          <p className="text-[10px] opacity-50 mb-1">ROLE</p>
          <p className="text-white/80 mb-3">{hoveredNode.description}</p>

          <div className="flex justify-between items-center border-t border-white/10 pt-2">
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  hoveredNode.status === "ONLINE"
                    ? "bg-green-500"
                    : "bg-red-500",
                )}
              />
              {hoveredNode.status}
            </span>
            <span className="opacity-50">[OPEN]</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

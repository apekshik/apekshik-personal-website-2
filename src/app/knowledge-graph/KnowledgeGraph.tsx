"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

type Node = {
  id: string;
  label: string;
  children?: Node[];
};

const roots: Node[] = [
  {
    id: "imo",
    label: "IMO Math",
    children: [
      { id: "numbers", label: "Number Theory" },
      { id: "geometry", label: "Geometry" },
      { id: "algebra", label: "Algebra" },
      { id: "combinatorics", label: "Combinatorics" },
      { id: "ineq", label: "Inequalities" },
    ],
  },
  {
    id: "ml",
    label: "Machine Learning",
    children: [
      { id: "dl", label: "Deep Learning" },
      { id: "nlp", label: "NLP" },
      { id: "cv", label: "Computer Vision" },
      { id: "ts", label: "Time Series" },
      { id: "gnn", label: "Graph Nets" },
    ],
  },
  {
    id: "rl",
    label: "Reinforcement Learning",
    children: [
      { id: "policy", label: "Policy Gradient" },
      { id: "qlearn", label: "Q-Learning" },
      { id: "model", label: "Model-Based" },
      { id: "multi", label: "Multi-Agent" },
      { id: "imitation", label: "Imitation" },
    ],
  },
  {
    id: "physics",
    label: "Physics",
    children: [
      { id: "classical", label: "Classical Mechanics" },
      { id: "quantum", label: "Quantum" },
      { id: "em", label: "Electromagnetism" },
      { id: "thermo", label: "Thermodynamics" },
      { id: "irodov", label: "Irodov Problems" },
    ],
  },
  {
    id: "cs",
    label: "Computer Science",
    children: [
      { id: "algorithms", label: "Algorithms" },
      { id: "data", label: "Data Structures" },
      { id: "systems", label: "Systems" },
      { id: "networks", label: "Networks" },
      { id: "compilers", label: "Compilers" },
    ],
  },
];

export default function KnowledgeGraph() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleRootClick = (id: string, x: number, y: number) => {
    setExpanded(expanded === id ? null : id);
    const dx = dimensions.width / 2 - (x + offset.x);
    const dy = dimensions.height / 2 - (y + offset.y);
    setOffset({ x: offset.x + dx * 0.3, y: offset.y + dy * 0.3 });
  };

  const renderChildren = (
    node: Node,
    centerX: number,
    centerY: number,
    radius: number,
  ) => {
    if (expanded !== node.id || !node.children) {
      return null;
    }
    return node.children.map((child, idx) => {
      const angle = (idx / node.children!.length) * Math.PI * 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return (
        <g key={child.id}>
          <line x1={centerX} y1={centerY} x2={x} y2={y} stroke="white" />
          <motion.circle
            cx={x}
            cy={y}
            r={15}
            fill="white"
            stroke="white"
            animate={{
              cx: [x - 4, x + 5, x - 3, x + 2, x - 4],
              cy: [y - 5, y + 4, y - 2, y + 3, y - 5],
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
          />
          <text
            x={x}
            y={y + 30}
            textAnchor="middle"
            fill="white"
            className="font-bebas text-xs"
          >
            {child.label}
          </text>
        </g>
      );
    });
  };

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const rootRadius = 200;

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    dragging.current = true;
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return;
    setOffset({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };

  const endDrag = () => {
    dragging.current = false;
  };

  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      style={{ background: "black" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <motion.g
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {roots.map((node, idx) => {
          const angle = (idx / roots.length) * Math.PI * 2;
          const x = centerX + rootRadius * Math.cos(angle);
          const y = centerY + rootRadius * Math.sin(angle);
          const nodeX = x;
          const nodeY = y;
          return (
            <g key={node.id}>
              <motion.circle
                cx={nodeX}
                cy={nodeY}
                r={25}
                fill="white"
                stroke="white"
                onClick={() => handleRootClick(node.id, nodeX, nodeY)}
                animate={{
                  cx: [nodeX - 5, nodeX + 3, nodeX - 4, nodeX + 2, nodeX - 5],
                  cy: [nodeY - 4, nodeY + 5, nodeY - 3, nodeY + 2, nodeY - 4],
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                style={{ cursor: "pointer" }}
              />
              <text
                x={nodeX}
                y={nodeY + 45}
                textAnchor="middle"
                fill="white"
                className="font-bebas text-sm"
              >
                {node.label}
              </text>
              {renderChildren(node, nodeX, nodeY, 80)}
            </g>
          );
        })}
      </motion.g>
    </svg>
  );
}


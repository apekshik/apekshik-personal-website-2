"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleRootClick = (id: string) => {
    setExpanded(expanded === id ? null : id);
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
            fill="black"
            stroke="white"
            animate={{
              cx: [x - 5, x + 5, x - 5],
              cy: [y - 5, y + 5, y - 5],
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
          />
          <text
            x={x}
            y={y + 25}
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

  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      style={{ background: "black" }}
    >
      {roots.map((node, idx) => {
        const angle = (idx / roots.length) * Math.PI * 2;
        const x = centerX + rootRadius * Math.cos(angle);
        const y = centerY + rootRadius * Math.sin(angle);
        const isExpanded = expanded === node.id;
        const nodeX = isExpanded ? centerX : x;
        const nodeY = isExpanded ? centerY : y;
        return (
          <g key={node.id}>
            <motion.circle
              cx={nodeX}
              cy={nodeY}
              r={25}
              fill="black"
              stroke="white"
              onClick={() => handleRootClick(node.id)}
              animate={{
                cx: [nodeX - 5, nodeX + 5, nodeX - 5],
                cy: [nodeY - 5, nodeY + 5, nodeY - 5],
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
              style={{ cursor: "pointer" }}
            />
            <text
              x={nodeX}
              y={nodeY + 35}
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
    </svg>
  );
}


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
      {
        id: "numbers",
        label: "Number Theory",
        children: [
          { id: "divisibility", label: "Divisibility" },
          { id: "primes", label: "Prime Numbers" },
          { id: "diophantine", label: "Diophantine" },
        ],
      },
      {
        id: "geometry",
        label: "Geometry",
        children: [
          { id: "euclid", label: "Euclidean" },
          { id: "projective", label: "Projective" },
        ],
      },
      {
        id: "algebra",
        label: "Algebra",
        children: [
          { id: "groups", label: "Groups" },
          { id: "polynomials", label: "Polynomials" },
        ],
      },
      { id: "combinatorics", label: "Combinatorics" },
      { id: "ineq", label: "Inequalities" },
    ],
  },
  {
    id: "ml",
    label: "Machine Learning",
    children: [
      {
        id: "dl",
        label: "Deep Learning",
        children: [
          { id: "cnn", label: "CNN" },
          { id: "rnn", label: "RNN" },
          { id: "transformers", label: "Transformers" },
        ],
      },
      {
        id: "nlp",
        label: "NLP",
        children: [
          { id: "language", label: "Language Models" },
          { id: "seq2seq", label: "Seq2Seq" },
        ],
      },
      {
        id: "cv",
        label: "Computer Vision",
        children: [
          { id: "detection", label: "Detection" },
          { id: "segmentation", label: "Segmentation" },
        ],
      },
      { id: "ts", label: "Time Series" },
      { id: "gnn", label: "Graph Nets" },
    ],
  },
  {
    id: "rl",
    label: "Reinforcement Learning",
    children: [
      {
        id: "policy",
        label: "Policy Gradient",
        children: [{ id: "actorcritic", label: "Actor-Critic" }],
      },
      {
        id: "qlearn",
        label: "Q-Learning",
        children: [{ id: "dqn", label: "DQN" }],
      },
      {
        id: "model",
        label: "Model-Based",
        children: [{ id: "mpc", label: "MPC" }],
      },
      {
        id: "multi",
        label: "Multi-Agent",
        children: [{ id: "selfplay", label: "Self-Play" }],
      },
      {
        id: "imitation",
        label: "Imitation",
        children: [{ id: "bc", label: "Behavioral Cloning" }],
      },
    ],
  },
  {
    id: "physics",
    label: "Physics",
    children: [
      {
        id: "classical",
        label: "Classical Mechanics",
        children: [{ id: "lagrangian", label: "Lagrangian" }],
      },
      {
        id: "quantum",
        label: "Quantum",
        children: [{ id: "schrodinger", label: "Schrödinger" }],
      },
      { id: "em", label: "Electromagnetism" },
      { id: "thermo", label: "Thermodynamics" },
      { id: "irodov", label: "Irodov Problems" },
    ],
  },
  {
    id: "cs",
    label: "Computer Science",
    children: [
      {
        id: "algorithms",
        label: "Algorithms",
        children: [
          { id: "graphs", label: "Graph Algos" },
          { id: "dp", label: "Dynamic Prog" },
        ],
      },
      {
        id: "data",
        label: "Data Structures",
        children: [
          { id: "trees", label: "Trees" },
          { id: "hashes", label: "Hashes" },
        ],
      },
      { id: "systems", label: "Systems" },
      { id: "networks", label: "Networks" },
      { id: "compilers", label: "Compilers" },
    ],
  },
];

export default function KnowledgeGraph() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const radii = useRef<Record<string, number>>({});

  const animParams = useMemo(() => {
    const params: Record<string, { ax: number; ay: number; dur: number }> = {};
    const traverse = (nodes: Node[]) => {
      nodes.forEach((n) => {
        params[n.id] = {
          ax: 2 + Math.random() * 4,
          ay: 2 + Math.random() * 4,
          dur: 8 + Math.random() * 4,
        };
        if (n.children) traverse(n.children);
      });
    };
    traverse(roots);
    return params;
  }, []);

  const getRadius = (id: string) => {
    if (!radii.current[id]) {
      radii.current[id] = 60 + Math.random() * 40;
    }
    return radii.current[id];
  };

  useEffect(() => {
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const toggleNode = (id: string, x: number, y: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
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
    if (!expanded.has(node.id) || !node.children) {
      return null;
    }
    return node.children.map((child, idx) => {
      const angle = (idx / node.children!.length) * Math.PI * 2;
      const r = radius + getRadius(child.id);
      const childX = centerX + r * Math.cos(angle);
      const childY = centerY + r * Math.sin(angle);
      return (
        <g key={child.id}>
          <motion.line
            x1={centerX}
            y1={centerY}
            initial={{ x2: centerX, y2: centerY }}
            animate={{ x2: childX, y2: childY }}
            stroke="white"
          />
          <motion.circle
            initial={{ cx: centerX, cy: centerY }}
            animate={{
              cx: [childX, childX - animParams[child.id].ax, childX + animParams[child.id].ax, childX - animParams[child.id].ax],
              cy: [childY, childY - animParams[child.id].ay, childY + animParams[child.id].ay, childY - animParams[child.id].ay],
            }}
            transition={{ duration: animParams[child.id].dur, repeat: Infinity, repeatType: "mirror" }}
            r={15}
            fill="white"
            stroke="white"
            onClick={() => toggleNode(child.id, childX, childY)}
            style={{ cursor: "pointer" }}
          />
          <text
            x={childX}
            y={childY + 30}
            textAnchor="middle"
            fill="white"
            className="font-bebas text-xs"
          >
            {child.label}
          </text>
          {renderChildren(child, childX, childY, getRadius(child.id))}
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
      onWheel={(e) => {
        e.preventDefault();
        setScale((s) => Math.min(3, Math.max(0.5, s - e.deltaY * 0.001)));
      }}
    >
      <motion.g
        animate={{ x: offset.x, y: offset.y, scale }}
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
                onClick={() => toggleNode(node.id, nodeX, nodeY)}
                animate={{
                  cx: [
                    nodeX - animParams[node.id].ax,
                    nodeX + animParams[node.id].ax,
                    nodeX - animParams[node.id].ax,
                  ],
                  cy: [
                    nodeY - animParams[node.id].ay,
                    nodeY + animParams[node.id].ay,
                    nodeY - animParams[node.id].ay,
                  ],
                }}
                transition={{
                  duration: animParams[node.id].dur,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
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


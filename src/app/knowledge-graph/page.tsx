"use client";

import React from "react";
import Link from "next/link";
import KnowledgeGraph from "./KnowledgeGraph";

const KnowledgeGraphPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 p-4 z-10">
        <Link href="/">
          <button className="text-2xl font-bebas">Go Home</button>
        </Link>
      </div>
      <KnowledgeGraph />
    </div>
  );
};

export default KnowledgeGraphPage;

"use client";
import React, { useEffect } from "react";
import FluidSimulation from "fluid-simulation-react";

const FluidBackground = () => {
  useEffect(() => {
    console.log("FluidBackground component mounted");
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0" 
      style={{ 
        width: '100%', 
        height: '100%',
      }}
    >
      <FluidSimulation />
    </div>
  );
};

export default FluidBackground;
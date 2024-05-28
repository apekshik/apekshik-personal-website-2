"use client";
import React, { useState } from "react";
import { useSpring, animated as a } from "@react-spring/web";
import { Link } from "@nextui-org/react";

const AnimatedLink = a(Link);

export default function Home() {
  const [started, setStarted] = useState(false);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: started ? 1 : 0 },
    delay: 700,
  });

  const videoOpacity = useSpring({
    from: { opacity: 0.7 },
    to: { opacity: started ? 0.4 : 0.7 },
  });

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <a.video
        style={videoOpacity}
        className="absolute z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </a.video>

      {/* Navbar at the top */}
      <a.nav
        style={fadeIn}
        className="absolute top-0 z-50 w-full p-8 text-white"
      >
        <div className=" font-bebas flex justify-center gap-32 text-xl">
          <div className="flex-item">Home</div>
          <div className="flex-item">About Me</div>
          <div className="flex-item">Contact</div>
          <div className="flex-item">Resume</div>
        </div>
      </a.nav>

      {/* Main Content centered in the remaining part of the viewport */}
      {started ? (
        <div className="flex h-full flex-col items-center justify-center">
          <a.div style={fadeIn} className="text-center text-white">
            <h1 className="font-bebas text-8xl font-bold">
              Apekshik Panigrahi
            </h1>
            <p className="font-abril_fatface text-lg">
              Founding Platform Engineer at Euso AI | Full-Stack Developer |
              Physicist | 2D/3D Animator
            </p>
          </a.div>
        </div>
      ) : (
        // Initial Click Prompt
        <a.div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-center text-white"
          onClick={() => setStarted(true)}
        >
          <p className="text-xl font-semibold">Click here to start</p>
        </a.div>
      )}
    </div>
  );
}

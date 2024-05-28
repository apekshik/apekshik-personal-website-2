"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import backgroundPic from "../../public/alien_wallpaper.jpg";
import bannerPic from "../../public/bottom-left-banner.png";

import RippleEffect from "./components/RippleEffect";
import ParticlesBackground from "./components/ParticlesBackground";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartButton(true);
    }, 500); // 3 seconds delay for the cinematic intro

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      setStarted(true);
    }, 3000); // 3 seconds fade-out duration
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {!started && (
        <div
          className={`absolute inset-0 z-50 flex items-center justify-center bg-transparent ${
            fadeOut ? "fade-out" : "fade-in"
          }`}
        >
          {showStartButton && (
            <button
              className="fade-in text-3xl font-bold text-white"
              onClick={handleStart}
            >
              Click to start
            </button>
          )}
        </div>
      )}

      <div
        className={`duration-3000 absolute inset-0 transition-opacity ${
          started ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: "5s" }} // Increase duration to 5s
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 scale-75">
          <Image
            src={backgroundPic}
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Particle Background */}
        <div className="absolute inset-0 z-0">
          <ParticlesBackground />
        </div>

        {/* Navbar at the top */}
        <nav className="relative top-0 z-10 flex w-full items-center justify-between py-8 pl-8 pr-16 text-white">
          <h1 className="font-bebas text-2xl font-bold">Apekshik Panigrahi</h1>
          <div className="flex gap-12 font-bebas text-2xl">
            <div className="flex-item">Home</div>
            <div className="flex-item">About</div>
            <div className="flex-item">Blog</div>
            <div className="flex-item">Contact</div>
            <div className="flex-item">Resume</div>
          </div>
        </nav>

        {/* Main Body */}
        <div className="z-10 flex h-full items-start justify-end">
          <div className="relative mr-16 mt-64 pr-4 text-right font-mono text-white">
            <p className="py-2 text-lg">Deep Learning Researcher</p>
            <p className="py-2 text-lg">Founding Platform Engineer at Euso</p>
            <p className="py-2 text-lg">Full-Stack Web3 Developer</p>
            <p className="py-2 text-lg">A Physicist</p>
            <p className="py-2 text-lg">Toon Boom Harmony Animator</p>
            <p className="py-2 text-lg">SwiftUI Developer</p>
            {/* Vertical Line */}
            <div className="absolute right-0 top-0 h-full w-1 bg-white"></div>{" "}
          </div>
        </div>

        {/* Banner at the bottom left */}
        <div className="absolute bottom-0 left-0 z-10 p-8">
          <Image
            src={bannerPic}
            alt="Banner"
            width={500} // Adjust size as needed
            height={100} // Adjust size as needed
            priority
          />
        </div>

        {/* Ripple Effect Component placement */}
        <div
          className="absolute bottom-0 right-0 p-8"
          style={{ height: "50%", width: "50%" }}
        >
          <div className="flex h-full items-center justify-center">
            <RippleEffect />
          </div>
        </div>
      </div>
    </div>
  );
}

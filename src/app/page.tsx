"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import frontPic from "../../public/alien-wall-3.png";
import backPic from "../../public/alien_wallpaper.jpg";
import bannerPic from "../../public/bottom-left-banner.png";

import RippleEffect from "./components/RippleEffect";
import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import { Link, Button } from "@nextui-org/react";
import WorkDropDownMenu from "./components/WorkDropDownMenu";
import SpriteAnimation from "./components/SpriteAnimation";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const [started, setStarted] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartButton(true);
    }, 500); // 3 seconds delay for the cinematic intro

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (imageRef.current) {
        imageRef.current.style.transform = `translate(-50%, -50%) translateY(${scrollY * 0.3 - 50}px)`;
      }

      if (textRef.current) {
        textRef.current.style.transform = `translateY(${-scrollY * 0.1}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      setStarted(true);
    }, 3000); // 3 seconds fade-out duration
  };

  return (
    <div className="relative w-full">
      <CustomCursor />

      {!started && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-transparent ${
            fadeOut ? "fade-out" : "fade-in"
          }`}
        >
          {showStartButton && (
            <button
              className="fade-in font-bebas text-6xl font-bold text-white"
              onClick={handleStart}
            >
              Click to start
            </button>
          )}
        </div>
      )}

      {/* Fixed Particle Background */}
      <ParticlesBackground />

      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 scale-75">
        <Image
          src={frontPic}
          alt="Background"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>

      {/* Scrollable Content Container */}
      <div className="relative z-10">
        {/* First Section - Hero */}
        <div
          className={`relative h-screen transition-opacity duration-[5s] ${
            started ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Navbar at the top */}
          <Navbar />

          {/* Main Body */}
          <div className="flex h-full items-start justify-end">
            <div className="relative mr-16 mt-64 pr-4 text-right font-mono text-white">
              <p className="py-2 text-lg">Deep Learning Researcher</p>
              <p className="py-2 text-lg">Founding Platform Engineer at Euso</p>
              <p className="py-2 text-lg">Full-Stack Web3 Developer</p>
              <p className="py-2 text-lg">A Physicist</p>
              <p className="py-2 text-lg">UE5 Game Developer</p>
              <p className="py-2 text-lg">Toon Boom Harmony Animator</p>
              <p className="py-2 text-lg">SwiftUI Developer</p>
              {/* Vertical Line */}
              <div className="absolute right-0 top-0 h-full w-1 bg-white"></div>
            </div>
          </div>

          {/* Banner at the bottom left - positioned relative to hero section */}
          <div className="absolute bottom-0 left-0 z-20 p-8">
            <Image
              src={bannerPic}
              alt="Banner"
              width={500}
              height={100}
              priority
            />
          </div>
        </div>

        {/* Second Section - About (Black Overlay) */}
        <div className="relative min-h-screen overflow-hidden bg-black">
          {/* Parallax Background Image - Centered and sized */}
          <div
            ref={imageRef}
            className="absolute left-1/2 top-1/4 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 transform"
            style={{ transform: "translate(-50%, -50%) translateY(-50px)" }}
          >
            <Image
              src="/Apekshik Landscape Photograph.JPG"
              alt="Apekshik Landscape Photo"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="rounded-lg shadow-2xl"
              priority
            />
          </div>

          {/* Text Box - Parallax Layer */}
          <div
            ref={textRef}
            className="absolute left-16 top-1/2 z-10 -translate-y-1/2 transform"
          >
            <div className="max-w-md rounded-lg border border-white/20 bg-black/70 p-8 shadow-2xl backdrop-blur-md">
              <h2 className="mb-6 font-bebas text-4xl font-bold text-white">
                About Me
              </h2>
              <div className="space-y-4 font-mono text-sm text-gray-300">
                <p>
                  I'm Apekshik—though most people call me Apek. Currently, I'm
                  at xAI working on building AGI. I'm passionate about four
                  things: Physics, Math, Software Engineering, and Movies.
                </p>
                <p>
                  I thrive on bringing fresh ideas to life and pushing beyond
                  what the world has seen before. There's nothing I love more
                  than working with tight-knit, fast-moving teams that achieve
                  extraordinary results.
                </p>
                <p>
                  I excel in ambiguous situations and when difficult decisions
                  need to be made. With an intuitive understanding of complex
                  systems, I have a track record of accurately predicting major
                  trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

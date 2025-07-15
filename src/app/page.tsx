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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const images = [
    "/apekshik-landscape-1.jpg",
    "/apekshik-landscape-2.jpg",
    "/apekshik-landscape-3.jpg"
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      setStarted(true);
    }, 3000); // 3 seconds fade-out duration
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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

      {/* Fixed Background Image - Only visible in hero section */}
      <div 
        className="fixed inset-0 z-0 scale-75" 
        style={{ 
          height: "100vh",
          clipPath: "inset(0 0 0 0)"
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,1) 100%)"
          }}
        ></div>
        <Image
          src={frontPic}
          alt="Background"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>

      {/* Scrollable Content Container */}
      <div className="relative z-20">
        {/* First Section - Hero */}
        <div
          className={`relative h-screen transition-opacity duration-[5s] ${
            started ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Navbar at the top */}
          <Navbar onAboutClick={scrollToAbout} />

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
        <div id="about-section" className="relative min-h-screen overflow-hidden bg-black">
          {/* Parallax Background Image - Centered and sized */}
          <div
            ref={imageRef}
            className="absolute left-1/2 top-1/4 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 transform"
            style={{ transform: "translate(-50%, -50%) translateY(-50px)" }}
          >
            {images.map((imageSrc, index) => (
              <Image
                key={imageSrc}
                src={imageSrc}
                alt={`Apekshik Landscape Photo ${index + 1}`}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: index === currentImageIndex ? 1 : 0,
                  transition: "opacity 1s ease-in-out"
                }}
                className="rounded-lg shadow-2xl absolute"
                priority={index === 0}
              />
            ))}
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

        {/* Third Section - Experience Timeline (Frosty Glass Overlay) */}
        <div className="min-h-screen bg-black/70 backdrop-blur-md relative overflow-hidden">
          <div className="container mx-auto px-8 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-16">
                <h2 className="font-bebas text-6xl font-bold text-white mr-8">Experiences</h2>
                <div className="flex-1 h-px bg-white/30"></div>
              </div>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-[140px] top-0 bottom-0 w-px bg-white/30"></div>
                
                <div className="space-y-16">
                  {/* xAI Experience */}
                  <div className="flex items-start gap-8">
                    {/* Company Logo */}
                    <div className="w-[120px] h-[120px] bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src="/xai-logo.png"
                        alt="xAI Logo"
                        width={120}
                        height={120}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    
                    {/* Timeline Dot - Largest (most recent/highest position) */}
                    <div className="relative flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full border-4 border-black/70 animate-pulse"></div>
                      <div className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="text-gray-400 font-mono text-sm mb-2">AUG 2024 - PRESENT</div>
                      <h3 className="font-bebas text-3xl font-bold text-white mb-2">xAI</h3>
                      <div className="text-yellow-400 font-mono text-sm mb-4">Team Lead (Human Data)</div>
                      <p className="text-gray-300 font-mono text-sm leading-relaxed">
                        Helping make AGI happen. Working on cutting-edge artificial general intelligence research and development, 
                        contributing to breakthrough technologies that push the boundaries of what's possible in AI.
                      </p>
                    </div>
                  </div>

                  {/* Euso AI Experience - Founding Platform Engineer */}
                  <div className="flex items-start gap-8">
                    {/* Company Logo */}
                    <div className="w-[120px] h-[120px] bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center p-4">
                      <Image
                        src="/euso-ai-logo.png"
                        alt="Euso AI Logo"
                        width={80}
                        height={80}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="relative flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full border-4 border-black/70 animate-pulse"></div>
                      <div className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="text-gray-400 font-mono text-sm mb-2">APR 2024 - AUG 2024</div>
                      <h3 className="font-bebas text-3xl font-bold text-white mb-2">Euso AI</h3>
                      <div className="text-yellow-400 font-mono text-sm mb-4">Founding Platform Engineer</div>
                      <p className="text-gray-300 font-mono text-sm leading-relaxed">
                        Led development of EusoGPT 2.0, an AI-driven Cloud Deployment Engine, reducing manual intervention by 95%. 
                        Spearheaded serverless transition to Google Cloud Run, reducing operational costs by 5x with improved scalability. 
                        Enhanced automation pipeline with RAG Stack integration using Pinecone, PostgreSQL, and Neo4j, achieving 3x improvement in data retrieval.
                      </p>
                    </div>
                  </div>

                  {/* Euso AI Experience - Founding Engineer */}
                  <div className="flex items-start gap-8">
                    {/* Empty space for logo alignment */}
                    <div className="w-[120px] h-[120px]"></div>
                    
                    {/* Timeline Dot */}
                    <div className="relative flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full border-4 border-black/70 animate-pulse"></div>
                      <div className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="text-gray-400 font-mono text-sm mb-2">DEC 2023 - APR 2024</div>
                      <div className="text-yellow-400 font-mono text-sm mb-4">Founding Engineer</div>
                      <p className="text-gray-300 font-mono text-sm leading-relaxed">
                        Engineered the first version of distributed backend using Python Flask on GCP VMs, translating natural language inputs 
                        into Terraform code and expediting provisioning by 7x. Overhauled frontend using NextJS and Tailwind CSS, deployed on Vercel, 
                        improving user navigation speed by 30% and enhancing overall engagement.
                      </p>
                    </div>
                  </div>

                  {/* Asterisk Inc Experience */}
                  <div className="flex items-start gap-8">
                    {/* Company Logo */}
                    <div className="w-[120px] h-[120px] bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src="/asterisk-inc-logo.png"
                        alt="Asterisk Inc Logo"
                        width={120}
                        height={120}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="relative flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full border-4 border-black/70 animate-pulse"></div>
                      <div className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="text-gray-400 font-mono text-sm mb-2">DEC 2022 - NOV 2023</div>
                      <h3 className="font-bebas text-3xl font-bold text-white mb-2">Asterisk Inc</h3>
                      <div className="text-yellow-400 font-mono text-sm mb-4">Mobile Engineer (iOS)</div>
                      <p className="text-gray-300 font-mono text-sm leading-relaxed">
                        Led full-stack development of a social media app using SwiftUI (MVVM architecture), Google Cloud Storage, and Firestore. 
                        Designed and implemented user engagement features including push notifications, real-time updates, and interactive UI components. 
                        Optimized app performance, reducing load times by 50% and improving user authentication with Firebase integration.
                      </p>
                    </div>
                  </div>

                  {/* Graco Inc Experience */}
                  <div className="flex items-start gap-8">
                    {/* Company Logo */}
                    <div className="w-[120px] h-[120px] bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src="/graco-logo.png"
                        alt="Graco Inc Logo"
                        width={120}
                        height={120}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="relative flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full border-4 border-black/70 animate-pulse"></div>
                      <div className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="text-gray-400 font-mono text-sm mb-2">MAY 2023 - SEP 2023</div>
                      <h3 className="font-bebas text-3xl font-bold text-white mb-2">Graco Inc</h3>
                      <div className="text-yellow-400 font-mono text-sm mb-4">Full-Stack Engineer Intern</div>
                      <p className="text-gray-300 font-mono text-sm leading-relaxed">
                        One of two lead developers building GracoTrack, a wireless machine connectivity and analytics app for improved maintenance decision-making. 
                        Built and tested cross-platform iOS and Android app using React-Native with AWS Cognito Auth & EC2 backend. 
                        Developed Bluetooth API, generated Protobufs for data serialization, and optimized charting performance for large datasets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

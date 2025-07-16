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
import { cn } from "@/lib/utils";

export default function Home() {
  const [started, setStarted] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [harborImageIndex, setHarborImageIndex] = useState(0);
  const [trumanImageIndex, setTrumanImageIndex] = useState(0);
  const [sheetWeaverImageIndex, setSheetWeaverImageIndex] = useState(0);
  const [eusoImageIndex, setEusoImageIndex] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const images = [
    "/apekshik-landscape-1.jpg",
    "/apekshik-landscape-2.jpg",
    "/apekshik-landscape-3.jpg"
  ];

  const projectImages = {
    harbor: [
      "/project-images/harbor-screenshot-1.png",
      "/project-images/harbor-screenshot-2.png",
      "/project-images/harbor-screenshot-3.png"
    ],
    truman: [
      "/project-images/truman-ai-screenshot-1.png",
      "/project-images/truman-ai-screenshot-2.png"
    ],
    sheetWeaver: [
      "/project-images/sheet-weaver-screenshot-1.png",
      "/project-images/sheet-weaver-screenshot-2.png"
    ],
    euso: [
      "/project-images/euso-ai-screenshot-1.png",
      "/project-images/euso-ai-screenshot-2.png",
      "/project-images/euso-ai-screenshot-3.png"
    ]
  };

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

      // Show/hide scroll to top button based on scroll position
      setShowScrollToTop(scrollY > window.innerHeight);
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

  // Project image cycling effects
  useEffect(() => {
    const interval = setInterval(() => {
      setHarborImageIndex((prevIndex) => (prevIndex + 1) % projectImages.harbor.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrumanImageIndex((prevIndex) => (prevIndex + 1) % projectImages.truman.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSheetWeaverImageIndex((prevIndex) => (prevIndex + 1) % projectImages.sheetWeaver.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEusoImageIndex((prevIndex) => (prevIndex + 1) % projectImages.euso.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

          {/* Social Media Icons - Top Left (Hero page only) */}
          <div className="absolute top-24 left-8 z-30 flex flex-col gap-3">
            <a 
              href="https://github.com/apekshik" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-8 h-8 bg-white rounded-xl transition-all duration-300 hover:scale-125">
                <Image
                  src="/social-media-icons/github.png"
                  alt="GitHub"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
            <a 
              href="https://x.com/apekshik" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-8 h-8 bg-white rounded-xl transition-all duration-300 hover:scale-125">
                <Image
                  src="/social-media-icons/twitter.png"
                  alt="X (Twitter)"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
            <a 
              href="https://www.linkedin.com/in/apekshik-panigrahi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-8 h-8 bg-white rounded-xl transition-all duration-300 hover:scale-125">
                <Image
                  src="/social-media-icons/linkedin.png"
                  alt="LinkedIn"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
            <a 
              href="https://www.youtube.com/@apekplusplus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-8 h-8 bg-white rounded-xl transition-all duration-300 hover:scale-125">
                <Image
                  src="/social-media-icons/youtube.png"
                  alt="YouTube"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
          </div>

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

        {/* Third Section - Experience Timeline */}
        <div className="min-h-screen bg-black relative overflow-hidden">
          <div className="container mx-auto px-8 py-16">
            <div className="max-w-4xl mx-auto">
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

        {/* Fourth Section - Previous Work Showcase */}
        <div className="min-h-screen bg-black relative overflow-hidden">
          <div className="container mx-auto px-8 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-16">
                <h2 className="font-bebas text-6xl font-bold text-white mr-8">Previous Work</h2>
                <div className="flex-1 h-px bg-white/30"></div>
              </div>
              
              <div className="space-y-24">
                {/* Harbor Project */}
                <div className="flex items-start gap-12">
                  {/* Project Image */}
                  <div className="w-[600px] h-[400px] rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 relative">
                    {projectImages.harbor.map((imageSrc, index) => (
                      <Image
                        key={imageSrc}
                        src={imageSrc}
                        alt={`Harbor Screenshot ${index + 1}`}
                        fill
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          opacity: index === harborImageIndex ? 1 : 0,
                          transition: "opacity 1s ease-in-out"
                        }}
                        className="absolute"
                        priority={index === 0}
                      />
                    ))}
                  </div>
                  
                  {/* Project Description */}
                  <div className="flex-1 max-w-md">
                    <div className="rounded-lg bg-black/70 p-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] backdrop-blur-md">
                      <h3 className="mb-4 font-bebas text-3xl font-bold text-white">Harbor</h3>
                      <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
                        Harbor is a cutting-edge platform designed to facilitate the creation, management, and orchestration of AI organizations. It provides a comprehensive framework for designing, deploying, and monitoring collections of AI agents working together toward common goals, bridging individual AI capabilities with coordinated, purpose-driven AI systems.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["lambdas", "ecs", "s3", "cloudfront", "dynamo-db", "nextjs", "vercel", "tailwind"].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-mono rounded-full border border-white/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Euso AI Project */}
                <div className="flex items-start gap-12 flex-row-reverse">
                  {/* Project Image */}
                  <div className="w-[600px] h-[400px] rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 relative">
                    {projectImages.euso.map((imageSrc, index) => (
                      <Image
                        key={imageSrc}
                        src={imageSrc}
                        alt={`Euso AI Screenshot ${index + 1}`}
                        fill
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          opacity: index === eusoImageIndex ? 1 : 0,
                          transition: "opacity 1s ease-in-out"
                        }}
                        className="absolute"
                        priority={index === 0}
                      />
                    ))}
                  </div>
                  
                  {/* Project Description */}
                  <div className="flex-1 max-w-md">
                    <div className="rounded-lg bg-black/70 p-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] backdrop-blur-md">
                      <h3 className="mb-4 font-bebas text-3xl font-bold text-white">Euso AI</h3>
                      <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
                        Euso AI is a Cloud Infrastructure Deployment platform that enables developers in fast-moving environments to efficiently and securely deploy infrastructure using simple natural language. Euso's fleet of agents receive natural queries about product requirements and constraints, then autonomously create, deploy, and manage backend cloud infrastructure.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["gcp", "cloud run", "vector-db", "terraform", "nextjs", "tailwind", "flask"].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-mono rounded-full border border-white/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sheet Weaver Project */}
                <div className="flex items-start gap-12">
                  {/* Project Image */}
                  <div className="w-[600px] h-[400px] rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 relative">
                    {projectImages.sheetWeaver.map((imageSrc, index) => (
                      <Image
                        key={imageSrc}
                        src={imageSrc}
                        alt={`Sheet Weaver Screenshot ${index + 1}`}
                        fill
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          opacity: index === sheetWeaverImageIndex ? 1 : 0,
                          transition: "opacity 1s ease-in-out"
                        }}
                        className="absolute"
                        priority={index === 0}
                      />
                    ))}
                  </div>
                  
                  {/* Project Description */}
                  <div className="flex-1 max-w-md">
                    <div className="rounded-lg bg-black/70 p-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] backdrop-blur-md">
                      <h3 className="mb-4 font-bebas text-3xl font-bold text-white">Sheet Weaver</h3>
                      <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
                        Sheet Weaver is an intelligent spreadsheet application that allows users to create, manage, and manipulate spreadsheets using natural language. Instead of remembering complex formulas or function syntax, users can simply describe what they want to do with their data, and the AI assistant handles the technical details seamlessly.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["agent-sdk", "orcs-framework", "postgresql", "nextjs", "tailwind", "dynamo-db"].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-mono rounded-full border border-white/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Truman AI Project */}
                <div className="flex items-start gap-12 flex-row-reverse">
                  {/* Project Image */}
                  <div className="w-[600px] h-[400px] rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 relative">
                    {projectImages.truman.map((imageSrc, index) => (
                      <Image
                        key={imageSrc}
                        src={imageSrc}
                        alt={`Truman AI Screenshot ${index + 1}`}
                        fill
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          opacity: index === trumanImageIndex ? 1 : 0,
                          transition: "opacity 1s ease-in-out"
                        }}
                        className="absolute"
                        priority={index === 0}
                      />
                    ))}
                  </div>
                  
                  {/* Project Description */}
                  <div className="flex-1 max-w-md">
                    <div className="rounded-lg bg-black/70 p-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] backdrop-blur-md">
                      <h3 className="mb-4 font-bebas text-3xl font-bold text-white">Truman AI</h3>
                      <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
                        Truman is a universal AI coding CLI that serves as a terminal-based coding assistant with smart file editing tools and multi-provider support for OpenAI, Claude, and Grok. It features provider-agnostic design, intelligent code modifications with pattern matching, and a beautiful terminal interface with real-time streaming and colored diffs.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["ink", "stripe", "fastapi", "vercel"].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-mono rounded-full border border-white/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fifth Section - Contact */}
        <div className="min-h-screen bg-black relative overflow-hidden">
          {/* Dot Background Pattern */}
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:20px_20px]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
            )}
          />
          {/* Radial gradient for the container to give a faded look */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          
          <div className="container mx-auto px-8 py-16 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-16">
                <h2 className="font-bebas text-6xl font-bold text-white mr-8">Get In Touch</h2>
                <div className="flex-1 h-px bg-white/30"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info & Socials */}
                <div className="space-y-8">
                  <div className="rounded-lg border border-white/20 bg-black/70 p-8 shadow-2xl backdrop-blur-md">
                    <h3 className="mb-6 font-bebas text-3xl font-bold text-white">Let's Connect</h3>
                    <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6">
                      I'm always interested in discussing new opportunities, collaborating on exciting projects, or just having a chat about AI, software engineering, and the future of technology.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
                          <span className="text-black font-mono text-sm">@</span>
                        </div>
                        <a href="mailto:apekshik@gmail.com" className="text-gray-300 font-mono text-sm hover:text-white transition-colors">
                          apekshik@gmail.com
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-4">
                        <a href="https://github.com/apekshik" target="_blank" rel="noopener noreferrer" className="group">
                          <div className="w-10 h-10 bg-white rounded-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                            <Image
                              src="/social-media-icons/github.png"
                              alt="GitHub"
                              width={24}
                              height={24}
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                        </a>
                        <a href="https://x.com/apekshik" target="_blank" rel="noopener noreferrer" className="group">
                          <div className="w-10 h-10 bg-white rounded-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                            <Image
                              src="/social-media-icons/twitter.png"
                              alt="X (Twitter)"
                              width={24}
                              height={24}
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                        </a>
                        <a href="https://www.linkedin.com/in/apekshik-panigrahi/" target="_blank" rel="noopener noreferrer" className="group">
                          <div className="w-10 h-10 bg-white rounded-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                            <Image
                              src="/social-media-icons/linkedin.png"
                              alt="LinkedIn"
                              width={24}
                              height={24}
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                        </a>
                        <a href="https://www.youtube.com/@apekplusplus" target="_blank" rel="noopener noreferrer" className="group">
                          <div className="w-10 h-10 bg-white rounded-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                            <Image
                              src="/social-media-icons/youtube.png"
                              alt="YouTube"
                              width={24}
                              height={24}
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="rounded-lg border border-white/20 bg-black/70 p-8 shadow-2xl backdrop-blur-md">
                  <h3 className="mb-6 font-bebas text-3xl font-bold text-white">Send a Message</h3>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 font-mono text-sm mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-300 font-mono text-sm mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-300 font-mono text-sm mb-2">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-300 font-mono text-sm mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all resize-none"
                        placeholder="Tell me about your project, idea, or just say hi!"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-3 bg-white text-black font-bebas text-xl rounded-lg hover:bg-gray-200 transition-colors duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-white/20 text-center">
                <p className="text-gray-400 font-mono text-sm">
                  Built with Next.js, TypeScript, and Tailwind CSS • © 2025 Apekshik Panigrahi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-6 h-6 text-black transition-transform duration-300 group-hover:-translate-y-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

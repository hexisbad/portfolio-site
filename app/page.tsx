"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Scene3d from "./components/Scene3d";
import HeroSection from "./components/home/HeroSection";
import FeaturedProjects from "./components/home/FeaturedProjects";
import SkillsGrid from "./components/home/SkillsGrid";
import ContactCTA from "./components/home/ContactCTA";
import Loader from "./components/Loader";

const LOADER_STORAGE_KEY = "model-loaded";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Shared ref for GSAP → R3F communication (no React re-renders)
  const scrollProgress = useRef({ current: 0 });

  // Check localStorage to decide if we need the loader
  const [showLoader, setShowLoader] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasLoaded = localStorage.getItem(LOADER_STORAGE_KEY);
    if (hasLoaded) {
      setReady(true);
    } else {
      setShowLoader(true);
    }
  }, []);

  const handleLoaderComplete = useCallback(() => {
    localStorage.setItem(LOADER_STORAGE_KEY, "true");
    setShowLoader(false);
    setReady(true);
  }, []);

  useGSAP(() => {
    if (!ready) return;
    ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress.current.current = self.progress;
      },
    });
  }, { dependencies: [ready] });

  return (
    <div ref={scrollContainerRef} style={!ready ? { overflow: "hidden", height: "100vh" } : undefined}>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      <div className="absolute fixed w-screen h-screen z-11"></div>
      {/* 3D canvas — fixed, pointer-events disabled so DOM scrolls through */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Scene3d scrollProgress={scrollProgress} />
      </div>

      {/* Scrollable DOM content */}
      <div className="relative  z-20">
        <HeroSection ready={ready} />
        <FeaturedProjects />
        <SkillsGrid />
        <ContactCTA />
      </div>
    </div>
  );
}

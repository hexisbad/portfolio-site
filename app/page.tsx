"use client";

import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Scene3d from "./components/Scene3d";
import HeroSection from "./components/home/HeroSection";
import FeaturedProjects from "./components/home/FeaturedProjects";
import SkillsGrid from "./components/home/SkillsGrid";
import ContactCTA from "./components/home/ContactCTA";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Shared ref for GSAP → R3F communication (no React re-renders)
  const scrollProgress = useRef({ current: 0 });

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress.current.current = self.progress;
      },
    });
  });

  return (
    <div ref={scrollContainerRef}>
      {/* 3D canvas — fixed, pointer-events disabled so DOM scrolls through */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Scene3d scrollProgress={scrollProgress} />
      </div>

      {/* Scrollable DOM content */}
      <div className="relative z-20">
        <HeroSection />
        <FeaturedProjects />
        <SkillsGrid />
        <ContactCTA />
      </div>
    </div>
  );
}

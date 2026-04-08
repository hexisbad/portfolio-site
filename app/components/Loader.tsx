"use client";

import { useRef, useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
  sceneReady: React.RefObject<boolean>;
}

export default function Loader({ onComplete, sceneReady }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const displayValue = useRef({ value: 0 });
  const [done, setDone] = useState(false);

  const { progress, active } = useProgress();

  // Smoothly interpolate the counter toward the real progress
  useEffect(() => {
    gsap.to(displayValue.current, {
      value: progress,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(displayValue.current.value)}%`;
        }
        if (barRef.current) {
          barRef.current.style.width = `${displayValue.current.value}%`;
        }
      },
    });
  }, [progress]);

  // Wait for BOTH asset loading AND first frame render (shader compilation)
  useEffect(() => {
    if (progress < 100 || active || done) return;

    // Poll for sceneReady — it's a ref set by useFrame, not reactive state
    const interval = setInterval(() => {
      if (sceneReady.current) {
        clearInterval(interval);
        setDone(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress, active, done, sceneReady]);

  // Once done, animate out
  useEffect(() => {
    if (!done) return;

    const tl = gsap.timeline({
      delay: 0.4,
      onComplete,
    });

    tl.to(counterRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
    })
      .to(
        overlayRef.current?.querySelector("[data-initials]") as Element,
        { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" },
        "<0.05"
      )
      .to(
        barRef.current?.parentElement as Element,
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        "<0.1"
      )
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
  }, [done, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* AK monogram */}
      <div
        data-initials
        className="text-2xl font-bold tracking-[0.3em] text-foreground/20 mb-8 select-none"
      >
        AK
      </div>

      {/* Percentage counter */}
      <span
        ref={counterRef}
        className="text-6xl md:text-8xl font-bold text-foreground tabular-nums"
      >
        0%
      </span>

      {/* Progress bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-px bg-border overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-violet transition-none"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}

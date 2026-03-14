"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!nameRef.current) return;

      // Split name into characters for stagger
      const text = nameRef.current.textContent || "";
      nameRef.current.textContent = "";
      const chars = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        nameRef.current!.appendChild(span);
        return span;
      });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(chars, {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.out",
      })
        .from(
          subtitleRef.current,
          { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        )
        .from(
          scrollIndicatorRef.current,
          { opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen text-center px-6"
    >
      <h1
        ref={nameRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground"
      >
        Advaith Kometh
      </h1>
      <p
        ref={subtitleRef}
        className="mt-6 text-xl md:text-2xl text-foreground/50 font-light"
      >
        Frontend Developer
      </p>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-foreground/30 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent" />
      </div>
    </div>
  );
}

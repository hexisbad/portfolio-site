"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type Animation = "fade-up" | "fade-left" | "fade-right" | "none";

interface SectionProps {
  id?: string;
  className?: string;
  animation?: Animation;
  children: React.ReactNode;
}

const animationConfigs: Record<
  Exclude<Animation, "none">,
  gsap.TweenVars
> = {
  "fade-up": { y: 60, opacity: 0 },
  "fade-left": { x: -60, opacity: 0 },
  "fade-right": { x: 60, opacity: 0 },
};

export default function Section({
  id,
  className = "",
  animation = "fade-up",
  children,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (animation === "none" || !ref.current) return;

    const from = animationConfigs[animation];

    gsap.from(ref.current, {
      ...from,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <section
      ref={ref}
      id={id}
      className={`py-20 px-6 mx-auto max-w-6xl ${className}`}
    >
      {children}
    </section>
  );
}

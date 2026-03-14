"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Section from "../components/layout/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Badge from "../components/ui/Badge";
import { experiences } from "../lib/constants";
import { staggerFadeUp } from "../lib/animations";

export default function ExperiencePage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!timelineRef.current) return;
    const items = timelineRef.current.querySelectorAll("[data-entry]");
    staggerFadeUp(timelineRef.current, Array.from(items), { stagger: 0.2 });
  });

  return (
    <div className="pt-24">
      <Section id="experience" animation="none">
        <SectionHeading
          title="Experience"
          subtitle="Where I've worked"
        />
        <div ref={timelineRef} className="relative max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.role}`}
              data-entry
              className="relative pl-12 pb-12 last:pb-0"
            >
              {/* Dot */}
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-violet border-2 border-background" />

              <p className="text-xs text-foreground/40 uppercase tracking-wider mb-1">
                {exp.period}
              </p>
              <h3 className="text-lg font-semibold text-foreground">
                {exp.role}
              </h3>
              <p className="text-sm text-violet mb-2">{exp.company}</p>
              <p className="text-sm text-foreground/50 leading-relaxed mb-3">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

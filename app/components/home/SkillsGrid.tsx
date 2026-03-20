"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import BentoGrid from "../ui/BentoGrid";
import BentoCard from "../ui/BentoCard";
import { skillCategories } from "@/app/lib/constants";
import { staggerFadeUp } from "@/app/lib/animations";
import Badge from "../ui/Badge";

export default function SkillsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-card]");
    staggerFadeUp(gridRef.current, Array.from(cards), { stagger: 0.12 });
  });

  return (
    <Section id="skills">
      <SectionHeading
        title="Skills & Tools"
        subtitle="Technologies I work with"
      />
      <div ref={gridRef}>
        <BentoGrid>
          {skillCategories.map((cat) => (
            <BentoCard key={cat.name} data-card>
              <h3 className="text-lg font-semibold text-white mb-3 mr-3">
                {cat.name}
              </h3>
              <ul className="space-y-1.5">
                {cat.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="text-sm text-foreground/60"
                  >
                    {skill}
                  </Badge>
                ))}
              </ul>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
    </Section>
  );
}

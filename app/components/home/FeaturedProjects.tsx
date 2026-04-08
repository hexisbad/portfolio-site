"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import BentoGrid from "../ui/BentoGrid";
import BentoCard from "../ui/BentoCard";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { projects } from "@/app/lib/constants";
import { staggerFadeUp } from "@/app/lib/animations";

export default function FeaturedProjects() {
  const gridRef = useRef<HTMLDivElement>(null);
  const featured = projects.filter((p) => p.featured);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-card]");
    staggerFadeUp(gridRef.current, Array.from(cards), { stagger: 0.15 });
  });

  return (
    <Section id="projects" >
      <SectionHeading
        title="Featured Projects"
        subtitle="A selection of things I've built"
      />
      <div ref={gridRef}>
        <BentoGrid  className="min-h-100vh">
          {featured.map((project, i) => (
            <BentoCard
              key={project.title}
              colSpan={i === 0 ? 2 : 1}
              data-card
            >
              <div className="flex gap-4 w-full">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 items-end shrink-0">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
      <div className="mt-8 text-center">
        <Button href="/projects" >
          View All Projects &rarr;
        </Button>
      </div>
    </Section>
  );
}

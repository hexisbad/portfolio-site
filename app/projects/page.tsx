"use client";

import Section from "../components/layout/Section";
import SectionHeading from "../components/ui/SectionHeading";
import BentoGrid from "../components/ui/BentoGrid";
import BentoCard from "../components/ui/BentoCard";
import Badge from "../components/ui/Badge";
import { projects } from "../lib/constants";

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <Section id="all-projects">
        <SectionHeading
          title="Projects"
          subtitle="Everything I've built"
        />
        <BentoGrid>
          {projects.map((project, i) => (
            <BentoCard
              key={project.title}
              colSpan={i === 0 ? 2 : 1}
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-foreground/50 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </BentoCard>
          ))}
        </BentoGrid>
      </Section>
    </div>
  );
}

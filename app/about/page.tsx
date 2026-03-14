"use client";

import Section from "../components/layout/Section";
import SectionHeading from "../components/ui/SectionHeading";
import BentoGrid from "../components/ui/BentoGrid";
import BentoCard from "../components/ui/BentoCard";
import { skillCategories } from "../lib/constants";

export default function AboutPage() {
  return (
    <div className="pt-24">
      <Section id="about-intro">
        <SectionHeading
          title="About Me"
          subtitle="A bit about who I am and what I do"
        />
        <div className="max-w-2xl">
          <p className="text-foreground/70 leading-relaxed mb-4">
            I&apos;m a frontend developer who loves crafting interactive,
            visually rich web experiences. I specialize in React, TypeScript, and
            creative coding with Three.js and GSAP.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            When I&apos;m not coding, you&apos;ll find me experimenting with
            shaders, exploring new design tools, or diving into the latest web
            technologies.
          </p>
        </div>
      </Section>

      <Section id="about-skills" animation="fade-up">
        <SectionHeading title="Skills" />
        <BentoGrid>
          {skillCategories.map((cat) => (
            <BentoCard key={cat.name}>
              <h3 className="text-lg font-semibold text-violet mb-3">
                {cat.name}
              </h3>
              <ul className="space-y-1.5">
                {cat.skills.map((skill) => (
                  <li key={skill} className="text-sm text-foreground/60">
                    {skill}
                  </li>
                ))}
              </ul>
            </BentoCard>
          ))}
        </BentoGrid>
      </Section>
    </div>
  );
}

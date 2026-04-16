"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Section from "../components/layout/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { experiences, VISIBLE_EXPERIENCE_COUNT } from "../lib/constants";
import { staggerFadeUp } from "../lib/animations";

const visibleExperiences = experiences.slice(0, VISIBLE_EXPERIENCE_COUNT);
const hiddenExperiences = experiences.slice(VISIBLE_EXPERIENCE_COUNT);

function ExperienceEntry({ exp }: { exp: (typeof experiences)[0] }) {
  return (
    <>
      {/* Dot */}
      <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-violet border-2 border-background" />
      <p className="text-xs text-foreground/40 uppercase tracking-wider mb-1">
        {exp.period}
      </p>
      <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
      <p className="text-sm text-violet mb-2">{exp.company}</p>
      <p className="text-sm text-foreground/50 leading-relaxed mb-3">
        {exp.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </>
  );
}

export default function ExperiencePage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useGSAP(() => {
    if (!timelineRef.current) return;
    const items = timelineRef.current.querySelectorAll("[data-entry]");
    staggerFadeUp(timelineRef.current, Array.from(items), { stagger: 0.2 });
  });

  const toggleExpanded = useCallback(() => {
    if (!expanded && !hiddenRef.current) {
      setExpanded(true);
      requestAnimationFrame(() => {
        if (!hiddenRef.current) return;
        // Stagger-fade hidden entries
        const items = hiddenRef.current.querySelectorAll("[data-entry]");
        gsap.from(Array.from(items), {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scale: 2.5,
        });
        // Animate sticky note with a wobble
        if (stickyRef.current) {
          gsap.fromTo(
            stickyRef.current,
            { opacity: 0, y: 20, rotation: 6 },
            {
              opacity: 1,
              y: 0,
              rotation: 0.15,
              duration: 0.65,
              delay: 0.3,
              ease: "back.out(1.4)",
              scale: 1
            },
          );
        }
      });
    } else {
      setExpanded(false);
    }
  }, [expanded]);

  return (
    <div className="pt-24">
      <Section id="experience" animation="none">
        <SectionHeading title="Experience" subtitle="Where I've worked" />
        <div ref={timelineRef} className="relative max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          {visibleExperiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.role}`}
              data-entry
              className="relative pl-12 pb-12 last:pb-0"
            >
              <ExperienceEntry exp={exp} />
            </div>
          ))}

          {hiddenExperiences.length > 0 && (
            <>
              {expanded && (
                <div ref={hiddenRef}>
                  <div
                    ref={stickyRef}
                    id="sticky-note"
                    className="post-it mb-12 ml-12  md:absolute md:left-0 md:top-4 md:ml-10"
                  >
                    <h1>Some Context</h1>
                    <ul>
                      <text>
                        I got myself a degree in Mechanical Engineering, but I&apos;ve
                        always wanted to figure out how to code especially since
                        we kept learning it in school and it made no darn sense
                        to me 😤 So around 2022, I decided to take the plunge
                        and learn some{" "}
                        <span className="text-violet-400">javascript. </span>
                        Everything below this sticky note is my history prior to learning how to program
                      </text>
                    </ul>
                  </div>
                  {/* First hidden entry */}
                  <div
                    key={`${hiddenExperiences[0].company}-${hiddenExperiences[0].role}`}
                    data-entry
                    className="relative pl-12 pb-12"
                  >
                    <ExperienceEntry exp={hiddenExperiences[0]} />
                  </div>
                  {/* Sticky note: inline on mobile, absolute-right on desktop */}

                  {/* Remaining hidden entries */}
                  {hiddenExperiences.slice(1).map((exp) => (
                    <div
                      key={`${exp.company}-${exp.role}`}
                      data-entry
                      className="relative pl-12 pb-12 last:pb-0"
                    >
                      <ExperienceEntry exp={exp} />
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={toggleExpanded}
                className="relative my-12 pl-12 py-4 text-sm text-foreground/50 hover:text-violet transition-colors duration-300 cursor-pointer"
              >
                {expanded ? "Less is more 😌" : "There's more... 👀"}
              </Button>
            </>
          )}
        </div>
      </Section>
    </div>
  );
}

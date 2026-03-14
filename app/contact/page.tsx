"use client";

import Section from "../components/layout/Section";
import SectionHeading from "../components/ui/SectionHeading";
import BentoGrid from "../components/ui/BentoGrid";
import BentoCard from "../components/ui/BentoCard";
import Button from "../components/ui/Button";
import { socialLinks } from "../lib/constants";

export default function ContactPage() {
  return (
    <div className="pt-24">
      <Section id="contact-page">
        <SectionHeading
          title="Get In Touch"
          subtitle="I'd love to hear from you"
        />

        <div className="max-w-2xl mb-12">
          <p className="text-foreground/70 leading-relaxed mb-6">
            Whether you have a project in mind, a question, or just want to
            say hi — feel free to reach out. I&apos;m always open to new
            opportunities and collaborations.
          </p>
          <Button href="mailto:hello@example.com">Send an Email</Button>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-4">
          Find me elsewhere
        </h3>
        <BentoGrid>
          {socialLinks.map((link) => (
            <BentoCard key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <p className="text-foreground font-medium group-hover:text-violet transition-colors">
                  {link.label}
                </p>
                <p className="text-sm text-foreground/40 mt-1">
                  {link.href}
                </p>
              </a>
            </BentoCard>
          ))}
        </BentoGrid>
      </Section>
    </div>
  );
}

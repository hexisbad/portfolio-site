"use client";

import Section from "../layout/Section";
import Button from "../ui/Button";

export default function ContactCTA() {
  return (
    <Section id="contact" className="text-center">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
        Let&apos;s work together
      </h2>
      <p className="mt-4 text-lg text-foreground/50 max-w-md mx-auto">
        Got a project in mind? I&apos;d love to hear about it. Drop me a message
        and let&apos;s create something great.
      </p>
      <div className="mt-8">
        <Button href="/contact">Get In Touch</Button>
      </div>
    </Section>
  );
}

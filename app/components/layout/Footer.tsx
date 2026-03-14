"use client";

import Link from "next/link";
import { socialLinks } from "@/app/lib/constants";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground/40">
          &copy; {new Date().getFullYear()} Advaith Kometh
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/40 hover:text-violet transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

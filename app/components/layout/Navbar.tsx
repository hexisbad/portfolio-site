"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { navLinks } from "@/app/lib/constants";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useGSAP(() => {
    // Hide on scroll down, show on scroll up
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (!navRef.current) return;
        if (self.direction === 1 && self.scroll() > 80) {
          gsap.to(navRef.current, {
            y: -100,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      },
    });

    // Backdrop blur after scroll
    ScrollTrigger.create({
      start: "top -20",
      end: "max",
      onEnter: () =>
        navRef.current?.classList.add("backdrop-blur-md", "bg-background/60"),
      onLeaveBack: () =>
        navRef.current?.classList.remove(
          "backdrop-blur-md",
          "bg-background/60"
        ),
    });
  });

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        height: next ? "auto" : 0,
        opacity: next ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground hover:text-violet transition-colors"
        >
          AK
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-violet ${
                pathname === link.href
                  ? "text-violet"
                  : "text-foreground/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-foreground transition-transform ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="md:hidden overflow-hidden h-0 opacity-0 backdrop-blur-md bg-background/80"
      >
        <div className="px-6 pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`text-sm py-2 transition-colors hover:text-violet ${
                pathname === link.href
                  ? "text-violet"
                  : "text-foreground/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Stagger children fading up into view */
export function staggerFadeUp(
  trigger: Element,
  targets: Element | Element[] | string,
  options?: { delay?: number; stagger?: number }
) {
  return gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: options?.stagger ?? 0.1,
    delay: options?.delay ?? 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

/** Parallax vertical movement on scroll */
export function parallaxY(
  trigger: Element,
  target: Element,
  yPercent: number = -20
) {
  return gsap.to(target, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

/** Split text reveal — animates each character of an element */
export function splitTextReveal(element: Element, options?: { delay?: number }) {
  const text = element.textContent || "";
  element.textContent = "";

  const chars = text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.opacity = "0";
    element.appendChild(span);
    return span;
  });

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: 0.05,
    stagger: 0.03,
    delay: options?.delay ?? 0,
    ease: "power2.out",
    onStart: () => {
      gsap.set(chars, { y: 20 });
    },
  });
}

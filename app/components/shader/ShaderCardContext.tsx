"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

interface ShaderCardContextType {
  registerCard: (el: HTMLElement) => void;
  unregisterCard: (el: HTMLElement) => void;
  hasCards: boolean;
}

const ShaderCardContext = createContext<ShaderCardContextType>({
  registerCard: () => {},
  unregisterCard: () => {},
  hasCards: false,
});

export function useShaderCard() {
  return useContext(ShaderCardContext);
}

const SVG_NS = "http://www.w3.org/2000/svg";
const CARD_RADIUS = 16; // matches rounded-2xl (1rem)

export function ShaderCardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cardsRef = useRef<Set<HTMLElement>>(new Set());
  const clipPathRef = useRef<SVGClipPathElement>(null);
  const rafRef = useRef<number>(0);
  const [hasCards, setHasCards] = useState(false);
  const pathname = usePathname();

  const updateRects = useCallback(() => {
    const cp = clipPathRef.current;
    if (!cp) return;

    // Clear existing rects
    while (cp.firstChild) {
      cp.removeChild(cp.firstChild);
    }

    const cardCount = cardsRef.current.size;
    setHasCards(cardCount > 0);

    // Empty clipPath: add a zero-sized rect so clipping is explicitly empty
    if (cardCount === 0) {
      const rect = document.createElementNS(SVG_NS, "rect");
      rect.setAttribute("width", "0");
      rect.setAttribute("height", "0");
      cp.appendChild(rect);
      return;
    }

    const vh = window.innerHeight;
    const vw = window.innerWidth;

    cardsRef.current.forEach((el) => {
      const b = el.getBoundingClientRect();
      // Only include cards at least partially in the viewport
      if (b.bottom > 0 && b.top < vh && b.right > 0 && b.left < vw) {
        const rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttribute("x", String(b.x));
        rect.setAttribute("y", String(b.y));
        rect.setAttribute("width", String(b.width));
        rect.setAttribute("height", String(b.height));
        rect.setAttribute("rx", String(CARD_RADIUS));
        rect.setAttribute("ry", String(CARD_RADIUS));
        cp.appendChild(rect);
      }
    });
  }, []);

  const scheduleUpdate = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateRects);
  }, [updateRects]);

  const registerCard = useCallback(
    (el: HTMLElement) => {
      cardsRef.current.add(el);
      scheduleUpdate();
    },
    [scheduleUpdate]
  );

  const unregisterCard = useCallback(
    (el: HTMLElement) => {
      cardsRef.current.delete(el);
      scheduleUpdate();
    },
    [scheduleUpdate]
  );

  useEffect(() => {
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleUpdate]);

  // Re-measure card positions after route changes once layout settles
  useEffect(() => {
    const id = setTimeout(scheduleUpdate, 100);
    return () => clearTimeout(id);
  }, [pathname, scheduleUpdate]);

  return (
    <ShaderCardContext.Provider value={{ registerCard, unregisterCard, hasCards }}>
      {/* Hidden SVG providing the clip-path definition */}
      <svg
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath
            id="shader-card-clip"
            clipPathUnits="userSpaceOnUse"
            ref={clipPathRef}
          />
        </defs>
      </svg>
      {children}
    </ShaderCardContext.Provider>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import ShaderGradient from "./shader/ShaderGradient";
import { ShaderCardProvider, useShaderCard } from "./shader/ShaderCardContext";
import GSAPProvider from "./providers/GSAPProvider";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { useMobile } from "../lib/useMobile";

function ShaderCanvas() {
  const { hasCards } = useShaderCard();
  const pathname = usePathname();
  const isMobile = useMobile();

  // Only render the shader canvas on the about page
  if (!hasCards || pathname !== "/about") return null;

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ clipPath: "url(#shader-card-clip)" }}
    >
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1] }}
        dpr={isMobile ? 1 : [1, 2]}
        style={{ display: "block" }}
      >
        <ShaderGradient />
      </Canvas>
    </div>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GSAPProvider>
      <ShaderCardProvider>
        <ShaderCanvas />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="relative z-0 flex-1">{children}</main>
          <Footer />
        </div>
      </ShaderCardProvider>
    </GSAPProvider>
  );
}

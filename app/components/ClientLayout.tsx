"use client";

import { Canvas } from "@react-three/fiber";
import ShaderMesh from "./shader/ShaderGradient";
import GSAPProvider from "./providers/GSAPProvider";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GSAPProvider>
      {/* Persistent shader background */}
      <div className="fixed inset-0 -z-10">
        <Canvas
          orthographic
          camera={{ zoom: 1, position: [0, 0, 1] }}
          dpr={[1, 2]}
          style={{ display: "block" }}
        >
          <ShaderMesh />
        </Canvas>
      </div>

      <Navbar />
      <main className="relative z-0">{children}</main>
      <Footer />
    </GSAPProvider>
  );
}

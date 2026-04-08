"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import GeometricShape from "./GeometricShape";
import { useMobile } from "../lib/useMobile";

interface Scene3dProps {
  className?: string;
  scrollProgress: React.RefObject<{ current: number }>;
  sceneReady: React.RefObject<boolean>;
}

export default function Scene3d({ className, scrollProgress, sceneReady }: Scene3dProps) {
  const isMobile = useMobile();

  return (
    <Canvas
      className={className}
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 0], fov: 45 }}
      dpr={isMobile ? 1 : [1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Suspense fallback={null}>
        {!isMobile && <Environment preset="city" />}
        <GeometricShape scrollProgress={scrollProgress} sceneReady={sceneReady} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}

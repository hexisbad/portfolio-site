"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import GeometricShape from "./GeometricShape";

interface Scene3dProps {
  className?: string;
  scrollProgress: React.RefObject<{ current: number }>;
}

export default function Scene3d({ className, scrollProgress }: Scene3dProps) {
  return (
    <Canvas
      className={className}
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Environment preset="city" />
      <GeometricShape scrollProgress={scrollProgress} />
    </Canvas>
  );
}

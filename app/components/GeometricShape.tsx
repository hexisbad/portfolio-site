"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

interface GeometricShapeProps {
  scrollProgress: React.RefObject<{ current: number }>;
}

export default function GeometricShape({ scrollProgress }: GeometricShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    const progress = scrollProgress.current?.current ?? 0;

    // Scale: shrinks as user scrolls
    const scale = THREE.MathUtils.lerp(1, 0.4, progress);
    meshRef.current.scale.setScalar(scale);

    // Position: floats upward on scroll
    meshRef.current.position.y = THREE.MathUtils.lerp(0, 2, progress);

    // Rotation: base spin + accelerates on scroll
    const rotSpeed = 0.3 + progress * 1.5;
    meshRef.current.rotation.x += delta * rotSpeed * 0.5;
    meshRef.current.rotation.y += delta * rotSpeed;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <MeshTransmissionMaterial
          thickness={0.2}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.03}
          backside
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
        />
      </mesh>
    </Float>
  );
}

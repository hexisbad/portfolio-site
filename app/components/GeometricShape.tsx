"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface GeometricShapeProps {
  scrollProgress: React.RefObject<{ current: number }>;
  sceneReady: React.RefObject<boolean>;
  isMobile: boolean;
}

// Camera pullback range: completes by this fraction of total scroll
const CAMERA_DONE_AT = 0.25;
const CAMERA_START_Z = 400;
const CAMERA_END_Z = 1005;

export default function GeometricShape({ scrollProgress, sceneReady, isMobile }: GeometricShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const camera = useThree((s) => s.camera);
  const { scene } = useGLTF("/3d/abstract-globe.glb");

  // Extract the first mesh geometry from the loaded model
  let geometry: THREE.BufferGeometry | undefined;
  scene.traverse((child) => {
    if (!geometry && (child as THREE.Mesh).isMesh) {
      geometry = (child as THREE.Mesh).geometry;
    }
  });

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    // Signal that the first frame has rendered (shaders are compiled)
    if (!sceneReady.current) {
      sceneReady.current = true;
    }

    const progress = scrollProgress.current?.current ?? 0;

    // Camera: pull back from inside the globe as user scrolls
    const camT = THREE.MathUtils.clamp(progress / CAMERA_DONE_AT, 0, 1);
    const camSmooth = THREE.MathUtils.smoothstep(camT, 0, 1);
    camera.position.z = THREE.MathUtils.lerp(CAMERA_START_Z, CAMERA_END_Z, camSmooth);

    // Scale: shrinks as user scrolls
    const scale = THREE.MathUtils.lerp(1, 0.4, progress);
    meshRef.current.scale.setScalar(scale);

    // Position: floats upward on scroll
    meshRef.current.position.y = THREE.MathUtils.lerp(0, 2, progress);

    // Rotation: base spin + accelerates on scroll
    const rotSpeed = -0.3 + progress * 1.5;
    meshRef.current.rotation.x += delta * rotSpeed * 0.5;
    meshRef.current.rotation.y += delta * rotSpeed;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={isMobile ? 0.2 : 0.4}
      floatIntensity={isMobile ? 0.3 : 0.5}
    >
      <mesh ref={meshRef} geometry={geometry}>
        {isMobile ? (
          <meshStandardMaterial
            color="#b48cfa"
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.6}
            transparent
            opacity={0.85}
          />
        ) : (
          <MeshTransmissionMaterial
            thickness={0.2}
            roughness={0.05}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.06}
            backside
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={1.0}
            temporalDistortion={0.1}
            color="#b48cfa"
            emissive="#8b5cf6"
            emissiveIntensity={0.15}
          />
        )}
      </mesh>
      {!isMobile && (
        <pointLight color="#8a5cf681" intensity={4} distance={12} decay={2} />
      )}
    </Float>
  );
}

useGLTF.preload("/3d/abstract-globe.glb");

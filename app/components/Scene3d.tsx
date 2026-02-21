"use client";
import { Canvas } from "@react-three/fiber";
import RainbowPendant from "./RainbowPendant";
import { Environment, Text } from "@react-three/drei";

interface Scene3dProps {
  className?: string;
}
function Scene3d(props: Scene3dProps) {
  return (
      <Canvas className="card bg-zinc-950">
        {/* Lighting Controls */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <Environment preset="city" />

        {/* Camera Controls */}

        {/* 3D Objects */}
        <RainbowPendant scale={0.05} />
        <Text>
          Welcoom
        </Text>
      </Canvas>
  );
}

export default Scene3d;

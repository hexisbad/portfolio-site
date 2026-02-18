"use client";
import { Canvas } from "@react-three/fiber";
import RainbowPendant from "./RainbowPendant";

interface Scene3dProps {
    className?: string;
}
function Scene3d(props: Scene3dProps) {
  return (
    <Canvas className={props.className}>
      {/* Lighting Controls */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* Camera Controls */}

      {/* 3D Objects */}
      <RainbowPendant scale={0.05}/>
    </Canvas>
  );
}

export default Scene3d;

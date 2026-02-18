"use client";

import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface RainbowPendantProps {
  rotationSpeed?: number;
  scale?: number;
}
function RainbowPendant(props: RainbowPendantProps) {
  const { nodes, materials } = useGLTF("/3d/rainbow-pendant.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes["Hedra001_Material_#0_0"] as THREE.Mesh).geometry}
        material={materials.Material_0}
        position={[-0.618, 0, 3.478]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.641}
      />
    </group>
  );
}

export default RainbowPendant;

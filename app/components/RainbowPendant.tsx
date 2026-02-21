"use client";

import { useRef } from "react"
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva"
interface RainbowPendantProps {
  rotationSpeed?: number;
  scale?: number;
}
function RainbowPendant(props: RainbowPendantProps) {
  const meshRef = useRef(null);
  const { nodes } = useGLTF("/3d/rainbow-pendant-edited.glb");
  const { viewport } = useThree()

  useFrame ( (state, delta) => {
    if (meshRef.current) {
      (meshRef.current as THREE.Mesh).rotation.y += props.rotationSpeed || 0.001;
    }
  })
  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 1, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: {value: 1, min: 0, max: 3, step: 0.1},
    backside: { value: true },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    anisotropy: { value: 0.5, min: 0, max: 1 },
    anisotropicBlur: { value: 0.5, min: 0, max: 1 },
    distortion: { value: 0.1, min: 0, max: 1 },
    distortionScale: { value: 0.1, min: 0, max: 1 },
    temporalDistortion: { value: 0.1, min: 0, max: 1 },
    metallicness: { value: 0, min: 0, max: 1 },
  })

  return (
    <group {...props} dispose={null} scale={viewport.width / 3}>
      <mesh
        ref={meshRef}
        // castShadow
        // receiveShadow
        geometry={(nodes["Hedra001_Material"] as THREE.Mesh).geometry}
        // geometry={(nodes["Torus.002"] as THREE.Mesh).geometry}
   
      >

      <MeshTransmissionMaterial 
        {...materialProps}
        />
        </mesh>
    </group>
  );
}

export default RainbowPendant;

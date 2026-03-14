import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;

  // Palette colors: deep indigo, purple, magenta-rose
  vec3 colorA = vec3(0.153, 0.169, 0.498); // #272b7f
  vec3 colorB = vec3(0.341, 0.157, 0.529); // #111111
  vec3 colorC = vec3(0.533, 0.149, 0.565); // #882690

  void main() {
    vec2 fragCoord = vUv * iResolution;

    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

    float d = -iTime * 0.5;
    float a = 0.0;

    for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d - a * uv.x);
      d += sin(uv.y * i + a);
    }

    d += iTime * 0.1;

    // Use the pattern math to derive a 0–1 palette index
    float t = cos(a + d) * 0.5 + 0.5;

    // Mix across 3 colors: A → B (t: 0–0.5), B → C (t: 0.5–1)
    vec3 col = t < 0.5
      ? mix(colorA, colorB, t * 2.0)
      : mix(colorB, colorC, (t - 0.5) * 2.0);

    gl_FragColor = vec4(col, 1.0);
  }
`
export default function ShaderMesh() {
  const meshRef = useRef(null);
  const { viewport, size } = useThree();

  const uniforms = useRef({
    iTime: {value: 0},
    iResolution: {value: new THREE.Vector2(size.width, size.height)}
  });

  useFrame((state) => {
    uniforms.current.iTime.value = state.clock.elapsedTime;
    uniforms.current.iResolution.value.set(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial 
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        // eslint-disable-next-line react-hooks/refs
        uniforms={uniforms.current}
      />
    </mesh>
  )
  }



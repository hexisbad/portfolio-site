import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const vertexShader = `
  varying vec3 fragPos;
uniform float uTime;
uniform float uAmplitude;

void main() {
    // Calculate z-offset based on time and position
    float zOffset = sin(position.x + uTime) * uAmplitude + cos(position.y + uTime) * uAmplitude;
    
    // Apply the offset to the vertex position
    vec3 newPosition = vec3(position.x, position.y, position.z + zOffset);
    
    fragPos = newPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;

  void main() {
    vec2 fragCoord = vUv * iResolution;

    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

    float d = -iTime * 0.5;
    float a = 0.0;

    for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d -a * uv.x);
      d += sin(uv.y * i + a);
    }

    d += iTime * 0.5;

    vec3 col = vec3(cos(uv * vec2(d,a)) * 6.0 + 0.4, cos(a + d) * 0.5 + 0.5);
    col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);

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



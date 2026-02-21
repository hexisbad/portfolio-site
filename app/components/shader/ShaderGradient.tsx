import { Canvas, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { JSX, useRef } from "react"

  const ShaderGradientMaterial = shaderMaterial(
    {
       uTexture: new THREE.Texture(),
    },
    //vertex shader glsl
    `
      varying vec2 vUv;
      void main()
      {
        // FINAL POSITION
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        // VARYINGS
        vUv = uv;
      }
    `,
    //fragment shader glsl
    `
      uniform sampler2D uTexture;
      varying vec2 vUv;
      void main()
      {
          // Apply texture
          vec3 textureColor = texture2D(uTexture, vUv).rgb;

          // FINAL COLOR
          gl_FragColor = vec4(textureColor, 1.0);
      }
    `,
  );

  extend({ShaderGradientMaterial})

  declare module "@react-three/fiber" {
    interface ThreeElements {
      shaderGradientMaterial: JSX.IntrinsicElements['mesh'] & {
        uTexture?: THREE.Texture;
        ref?: React.Ref<THREE.ShaderMaterial>;
      }
    }
  }

function ShaderGradient() {
  const shaderGradientMaterialRef = useRef(null);

  return (
    <Canvas>
      <mesh>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderGradientMaterial  ref={shaderGradientMaterialRef}/>
      </mesh>
    </Canvas>
  );
}

export default ShaderGradient;

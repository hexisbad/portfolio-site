"use client";
import Scene3d from "./components/Scene3d";
import ShaderMesh from "./components/shader/ShaderGradient";
import { Canvas } from "@react-three/fiber";
export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      <div className="absolute w-full h-screen">
        <Canvas
          orthographic
          camera={{ zoom: 1, position: [0, 0, 1] }}
          dpr={[1, 2]}
          style={{ display: "block" }}
        >
          <ShaderMesh />
        </Canvas>
      </div>
      <div className="h-screen">
        <Scene3d className="relative w-full h-full" />
        {/* <section id="noise-section" className="w-[400px] h-[100px]  relative card"> */}
        {/* <div className="isolate h-full relative">
          <div className="noise h-full w-full"/>
          <div className="overlay top-0 h-full w-full absolute"/>
          </div> */}
        {/* </section> */}
      </div>
    </main>
  );
}

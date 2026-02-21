"use client";
import Scene3d from "./components/Scene3d";
import ShaderGradient from "./components/shader/ShaderGradient";
export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      <div className="h-screen card bg-zinc-950">
      <Scene3d className="relative w-full h-full" />
      {/* <ShaderGradient />  */}
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

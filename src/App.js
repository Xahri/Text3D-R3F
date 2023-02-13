import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Stats, Environment, Center } from "@react-three/drei";
import { PCFSoftShadowMap, sRGBEncoding } from "three";
import { useState, Suspense } from "react";

import { Overlay } from './components/Overlay';
import TextGenerator from './components/TextGenerator';

export default function App() {
  const [inputText, setInputText] = useState("Hello");
  const maxTextLength = 12;

  return (
    <>
      <Canvas dpr={[1, 2]} shadows gl={{ preserveDrawingBuffer: true, antialias: true, physicallyCorrectLights: true, toneMappingExposure: 0.5, shadowMap: { enabled: true, type: PCFSoftShadowMap }, outputEncoding: sRGBEncoding }} camera={{ fov: 45, position: [0, 0, 36]}} orthographic={false} >

        <OrbitControls autoRotate={false} autoRotateSpeed={0.4} enablePan={true}/>
        <Suspense fallback={null}>
          <ambientLight />
          <Center >
            <TextGenerator text={inputText} />
          </Center>
          <Stars radius={400} depth={50} count={1000} factor={8} />
          <Stats />
          <Environment preset="dawn" background blur={0.6} />
        </Suspense>

      </Canvas>
      
      <Overlay />
      <div className="text-field">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          maxLength={maxTextLength}
        />
        <span> {maxTextLength - inputText.length} </span>
      </div>
    </>
  )
}
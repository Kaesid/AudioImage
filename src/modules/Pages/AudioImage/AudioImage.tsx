import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { VisualPage } from "./styled-components";
import Visual from "./components/Visual/Visual";
import { setSessionActive } from "../../../redux/commonSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { Html } from "@react-three/drei";
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import Example from "./components/Example";
import sample from "./sample.mp3";

const AudioImage = () => {
  const dispatch = useAppDispatch();
  const setAppSessionActive = () => dispatch(setSessionActive());

  useEffect(() => {
    setAppSessionActive();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VisualPage>
      <Canvas
        camera={{ position: [0, 0, 3] }}
        gl={{
          powerPreference: "high-performance",
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }}
      >
        <color attach="background" args={["#c512a7"]} />
        <fog color="#ab1bcf" attach="fog" near={8} far={30} />

        <Suspense fallback={<Html>loading...</Html>}>
          <Example position={[0, 0, 0]} />
        </Suspense>
        <EffectComposer multisampling={0} disableNormalPass={true}>
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={3} />
          <Noise opacity={0.025} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </VisualPage>
  );
};

export default AudioImage;

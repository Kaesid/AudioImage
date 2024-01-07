import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, VisualPage } from "./styled-components";
import { setSessionActive } from "../../../redux/slice";
import { useAppDispatch } from "../../../redux/hooks";
import { Html } from "@react-three/drei";
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useMobileResolutionCheck } from "../../../hooks/useMobileResolutionCheck";
import AudioPlayer from "./components/AudioPlayer";
import AudioVisualiser from "./components/AudioVisualiser";

const AudioImage = () => {
  const dispatch = useAppDispatch();
  const setAppSessionActive = () => dispatch(setSessionActive());
  const { isMobile } = useMobileResolutionCheck();

  useEffect(() => {
    setAppSessionActive();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VisualPage>
      <Canvas
        id="canvas"
        data-testid="canvas"
        camera={{ position: [0, 0, isMobile ? 6 : 4] }}
        gl={{
          powerPreference: "high-performance",
          alpha: false,
          antialias: false,
          stencil: false,
          depth: true,
        }}
      >
        <color attach="background" args={["#1a032f"]} />
        <fog color="#1a0d27" attach="fog" near={8} far={30} />
        <Suspense
          fallback={
            <Html>
              <Loader>Loading...</Loader>
            </Html>
          }
        >
          <AudioPlayer />
          <AudioVisualiser />
        </Suspense>
        <EffectComposer multisampling={0} disableNormalPass={true}>
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={3} />
          <Noise opacity={0.025} />
          <Vignette eskil={false} offset={0.1} darkness={1} />
        </EffectComposer>
      </Canvas>
    </VisualPage>
  );
};

export default AudioImage;

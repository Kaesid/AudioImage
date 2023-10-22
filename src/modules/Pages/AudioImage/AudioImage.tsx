import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { VisualPage } from "./styled-components";
import Visual from "./components/Visual/Visual";
import { setSessionActive } from "../../../redux/commonSlice";
import { useAppDispatch } from "../../../redux/hooks";

const AudioImage = () => {
  const dispatch = useAppDispatch();
  const setAppSessionActive = () => dispatch(setSessionActive());

  useEffect(() => {
    setAppSessionActive();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VisualPage>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Visual position={[-1.2, 0, 0]} />
        </Suspense>
      </Canvas>
    </VisualPage>
  );
};

export default AudioImage;

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
      <Suspense fallback={<h2>loading...</h2>}>
        <Canvas>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <Visual position={[0, 0, 0]} />
        </Canvas>
      </Suspense>
    </VisualPage>
  );
};

export default AudioImage;

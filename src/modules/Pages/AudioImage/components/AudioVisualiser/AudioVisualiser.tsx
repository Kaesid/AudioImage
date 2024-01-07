import { MeshDistortMaterial, useCubeTexture, useTexture } from "@react-three/drei";
import { nx, ny, nz, px, py, pz } from "../../../../../assets/images/cube";
import { useState } from "react";
import { IMeshBasicMaterial } from "./types";
import { BackgroundSpheres, MainSphere } from "./components";

const AudioVisualiser = () => {
  const bumpMap = useTexture(nx);

  const envMap = useCubeTexture([px, nx, py, ny, pz, nz], { path: "" });

  const [material, setMaterial] = useState<IMeshBasicMaterial>(null!);

  return (
    <>
      <MeshDistortMaterial
        ref={setMaterial as () => IMeshBasicMaterial}
        envMap={envMap}
        bumpMap={bumpMap}
        color={"#a765a7"}
        roughness={0.1}
        metalness={1}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={1}
        distort={0.4}
      />
      {material && (
        <>
          <MainSphere material={material} />
          <BackgroundSpheres material={material} />
        </>
      )}
    </>
  );
};

export default AudioVisualiser;

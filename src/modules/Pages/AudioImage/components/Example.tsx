import { MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { MathUtils, Mesh, TextureLoader, AudioAnalyser } from "three";
import { canvasImage as backgroundImage } from "../../../../assets/images";
import { Html, MeshDistortMaterial, Icosahedron, useTexture, useCubeTexture, PositionalAudio } from "@react-three/drei";
import { nx, ny, nz, px, py, pz } from "../../../../assets/images/cube";
import { getCurrentTrackData } from "../audioImageSlice";
import { useAppSelector } from "../../../../redux/hooks";
import AudioPlayer from "./AudioPlayer/AudioPlayer";

const MainSphere = ({ material, playerRef }: any) => {
  const main = useRef<any>(null!);
  const trackData = useAppSelector(getCurrentTrackData);

  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    if (!main.current.rotation) return;
    main.current.rotation.z = clock.getElapsedTime();
    if (trackData) {
      const number = trackData.getAverageFrequency();
      // const data = analyzer.current.getFrequencyData();

      // console.log(material);
      // console.log(number);
      // console.log(data);
      if (number > 20) {
        //?WIP
        // main.current.geometry.parameters.detail = number;
        // if (main.current?.geometry?.matrixWorld?.elements) {
        //   main.current.geometry.matrixWorld.elements[0] = number / 100;
        // }
        // material._radius.value = number / 50;
        //decent
        material._distort.value = number / 120;
        material.color.r = number / 50;
        material.color.b = number / 70;
        material.color.g = number / 70;
        material.metalness = number / 70;
        main.current.rotation.x = number / 70;
        main.current.rotation.y = number / 40;
        main.current.scale.x = number / 65;
        main.current.scale.y = number / 40;
        main.current.scale.z = number / 55;
        //
      } else if (number === 0) {
        main.current.scale.x = 1;
        main.current.scale.y = 1;
        main.current.scale.z = 1;
        main.current.rotation.x = 0;
        main.current.rotation.y = 0;
        material.metalness = 1;
      }

      // main.current.x = data[5];
      // main.current.y = data[6];
    }
  });
  return <Icosahedron args={[0.7, 4]} ref={main} material={material} position={[0.2, 0.5, 0]} />;
};

const Instances = ({ material }: any) => {
  // we use this array ref to store the spheres after creating them
  const [sphereRefs] = useState(() => []);
  // we use this array to initialize the background spheres
  const initialPositions = [
    [-4, 20, -12],
    [-10, 12, -4],
    [-11, -12, -23],
    [-16, -6, -10],
    [12, -2, -3],
    [13, 4, -12],
    [14, -2, -23],
    [8, 10, -20],
  ];
  // smaller spheres movement
  useFrame(() => {
    // animate each sphere in the array
    sphereRefs.forEach((el: any) => {
      el.position.y += 0.02;
      if (el.position.y > 19) el.position.y = -18;
      el.rotation.x += 0.06;
      el.rotation.y += 0.06;
      el.rotation.z += 0.02;
    });
  });
  return (
    <>
      <MainSphere material={material} />
      {initialPositions.map((pos, i) => (
        <Icosahedron
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          material={material}
          key={i}
          ref={(ref: never) => (sphereRefs[i] = ref)}
        />
      ))}
    </>
  );
};

const Example = (props: MeshProps) => {
  const bumpMap = useTexture(px);

  const envMap = useCubeTexture([px, nx, py, ny, pz, nz], { path: "" });
  // We use `useState` to be able to delay rendering the spheres until the material is ready
  const [material, set] = useState();

  return (
    <>
      <AudioPlayer />
      <MeshDistortMaterial
        ref={set as any}
        envMap={envMap}
        bumpMap={bumpMap}
        color={"#c50ceb"}
        roughness={0.1}
        metalness={1}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={1}
        distort={0.4}
      />
      {material && <Instances material={material} />}
    </>
  );
};

export default Example;

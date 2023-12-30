import {
  IcosahedronBufferGeometryProps,
  IcosahedronGeometryProps,
  MeshProps,
  useFrame,
  useLoader,
} from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import {
  MathUtils,
  Mesh,
  TextureLoader,
  AudioAnalyser,
  IcosahedronGeometry,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3DEventMap,
  Vector3,
} from "three";
import { canvasImage as backgroundImage } from "../../../../assets/images";
import { Html, MeshDistortMaterial, Icosahedron, useTexture, useCubeTexture, PositionalAudio } from "@react-three/drei";
import { nx, ny, nz, px, py, pz } from "../../../../assets/images/cube";
import { getCurrentTrackData } from "../slice";
import { useAppSelector } from "../../../../redux/hooks";
import AudioPlayer from "./AudioPlayer/AudioPlayer";

const MainSphere = ({ material, playerRef }: any) => {
  const main = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null!);
  const trackData = useAppSelector(getCurrentTrackData);

  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    if (!main.current.rotation) return;
    const time = clock.getElapsedTime();
    main.current.rotation.z = time * 3;
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
        // main.current.position.setZ(number / 50);
        // main.current.position.setX(number / 30);
        // main.current.position.setY(number / 40);
        // main.current.rotation.z -= number / 10;
        material._distort.value = Math.min(number / 120, 0.4);
        const colors = ["r", "g", "b"];
        const rand = Math.floor(Math.random() * 3);
        const color = colors[rand];
        console.log(number);
        material.color[color] = Math.min(number / 80, 0.7);
        // material.color[color] = number / 100;
        // material.color.r = Math.max(number / 40, 0.2);
        // material.color.b = Math.max(number / 90, 0.5);
        // material.color.g = Math.max(number / 70, 0.3);
        material.metalness = number / 70;
        main.current.rotation.x = time + number / 70;
        main.current.rotation.y = time + number / 40;
        main.current.scale.x = Math.min(number / 65, 4);
        main.current.scale.y = Math.min(number / 40, 6);
        main.current.scale.z = Math.min(number / 55, 8);
        // main.current.lookAt(new Vector3(number / 20, number / 40, number / 50));
        // main.current.translateZ(number / 40);
        // main.current.
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
      if (el.position.y > 22) el.position.y = -18;
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
        color={"#aa6db5"}
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

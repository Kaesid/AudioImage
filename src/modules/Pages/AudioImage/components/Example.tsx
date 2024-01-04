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
import {
  Html,
  MeshDistortMaterial,
  Icosahedron,
  useTexture,
  useCubeTexture,
  PositionalAudio,
  Trail,
  GradientTexture,
} from "@react-three/drei";
import { nx, ny, nz, px, py, pz } from "../../../../assets/images/cube";
import { getCurrentTrackData } from "../slice";
import { useAppSelector } from "../../../../redux/hooks";
import AudioPlayer from "./AudioPlayer/AudioPlayer";

const MainSphere = ({ material }: any) => {
  const main = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null!);
  const trackData = useAppSelector(getCurrentTrackData);

  useFrame(({ clock }) => {
    if (!main.current.rotation) return;
    const time = clock.getElapsedTime();
    main.current.rotation.z = time * 3;

    if (trackData) {
      const number = trackData.getAverageFrequency();

      if (number > 20) {
        const data = trackData.getFrequencyData();
        material._distort.value = Math.min(number / 120, 0.4);
        material.color.r = data[Math.floor(Math.random() * 6)] / 300;
        material.metalness = number / 40;
        main.current.rotation.x = time + number / 70;
        main.current.rotation.y = time + number / 40;
        main.current.scale.x = Math.min(number / 65, 4);
        main.current.scale.y = Math.min(number / 40, 6);
        main.current.scale.z = Math.min(number / 55, 8);
      } else if (number === 0) {
        main.current.scale.x = 1;
        main.current.scale.y = 1;
        main.current.scale.z = 1;
        main.current.rotation.x = 0;
        main.current.rotation.y = 0;
        material.metalness = 1;
        material.color.r = 0.4;
      }
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
  const bumpMap = useTexture(nx);

  const envMap = useCubeTexture([px, nx, py, ny, pz, nz], { path: "" });
  // We use `useState` to be able to delay rendering the spheres until the material is ready
  const [material, setMaterial] = useState(null!);

  return (
    <>
      <AudioPlayer />
      <MeshDistortMaterial
        ref={setMaterial as any}
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
      {material && <Instances material={material} />}
    </>
  );
};

export default Example;

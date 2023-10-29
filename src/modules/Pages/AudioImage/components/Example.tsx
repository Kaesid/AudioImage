import { MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { MathUtils, Mesh, TextureLoader, AudioAnalyser } from "three";
import { canvasImage as backgroundImage } from "../../../../assets/images";
import { Html, MeshDistortMaterial, Icosahedron, useTexture, useCubeTexture, PositionalAudio } from "@react-three/drei";
import { nx, ny, nz, px, py, pz } from "../../../../assets/images/cube";
import sample from "./sample.mp3";
import { PlayButton } from "../styled-components";

const useAnalyse = ({ playerRef }: any) => {
  const analyzer = useRef<AudioAnalyser | null>(null);

  useEffect(() => {
    if (!playerRef?.current) return;
    analyzer.current = new AudioAnalyser(playerRef.current, 128);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerRef?.current]);

  return { analyzer };
};

const MainSphere = ({ material, playerRef }: any) => {
  const main = useRef<any>(null!);
  const { analyzer } = useAnalyse({ playerRef });

  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    if (!main.current.rotation) return;
    if (analyzer?.current) {
      const data = analyzer.current.getFrequencyData();
      console.log(data);
      main.current.rotation.y = data[5];
      main.current.rotation.x = data[6];
    }

    main.current.rotation.z = clock.getElapsedTime();
  });
  return <Icosahedron args={[1, 4]} ref={main} material={material} position={[0, 0, 0]} />;
};

const Instances = ({ material, playerRef }: any) => {
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
      <MainSphere material={material} playerRef={playerRef} />
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

const AudioPlayer = ({ source, playerRef, toggleStatus }: any) => {
  return (
    <>
      <PositionalAudio ref={playerRef} url={source} />
      <Html>
        <PlayButton onClick={toggleStatus}>PLAY</PlayButton>
      </Html>
    </>
  );
};

const Example = (props: MeshProps) => {
  const bumpMap = useTexture(px);

  const envMap = useCubeTexture([px, nx, py, ny, pz, nz], { path: "" });
  // We use `useState` to be able to delay rendering the spheres until the material is ready
  const [material, set] = useState();
  const source = sample;
  const playerRef = useRef<any>(null!);
  const [isPlaying, setIsPlaying] = useState(false);
  // const playerRef = useRef<any>(null!);

  const toggleStatus = () => {
    isPlaying ? playerRef.current.pause() : playerRef.current.play();
    setIsPlaying(prev => !prev);
  };

  return (
    <>
      <AudioPlayer source={source} playerRef={playerRef} toggleStatus={toggleStatus} />
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
      {material && <Instances material={material} playerRef={playerRef} />}
    </>
  );
};

export default Example;

import { MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils, Mesh, TextureLoader } from "three";
import { canvasImage as backgroundImage } from "../../../../assets/images";
import { Html, MeshDistortMaterial, Icosahedron, useTexture, useCubeTexture } from "@react-three/drei";
import { nx, ny, nz, px, py, pz } from "../../../../assets/images/cube";

const MainSphere = ({ material }: any) => {
  const main = useRef<any>(null!);

  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    if (!main.current.rotation) return;
    main.current.rotation.z = clock.getElapsedTime();
    main.current.rotation.y = MathUtils.lerp(main.current.rotation.y, mouse.x * Math.PI, 0.1);
    main.current.rotation.x = MathUtils.lerp(main.current.rotation.x, mouse.y * Math.PI, 0.1);
  });
  return <Icosahedron args={[1, 4]} ref={main} material={material} position={[0, 0, 0]} />;
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
  const bumpMap = useTexture(backgroundImage);

  const envMap = useCubeTexture([px, ny, py, ny, pz, nz], { path: "" });
  // We use `useState` to be able to delay rendering the spheres until the material is ready
  const [material, set] = useState();

  return (
    <>
      <MeshDistortMaterial
        ref={set as any}
        envMap={envMap}
        bumpMap={bumpMap}
        color={"#082175"}
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

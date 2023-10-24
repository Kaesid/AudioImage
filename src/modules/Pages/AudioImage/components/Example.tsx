import { MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils, Mesh, TextureLoader } from "three";
import { backgroundImage } from "../../../../assets/images";
import { Html, MeshDistortMaterial, Icosahedron, useTexture, useCubeTexture } from "@react-three/drei";

const Example2 = ({ material }: any) => {
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

const Example = (props: MeshProps) => {
  const bumpMap = useTexture(backgroundImage);

  const [map, second, third, forth] = useLoader(TextureLoader, [
    backgroundImage,
    backgroundImage,
    backgroundImage,
    backgroundImage,
  ]);
  // We use `useResource` to be able to delay rendering the spheres until the material is ready
  const [material, set] = useState();

  return (
    <>
      <MeshDistortMaterial
        ref={set as any}
        envMap={map}
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
      {material && <Example2 material={material} />}
    </>
  );
};

export default Example;

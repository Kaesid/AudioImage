import { MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, TextureLoader } from "three";
import { backgroundImage, canvasImage } from "../../../../../assets/images";

const Visual = (props: MeshProps) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>(null!);

  //The exclamation mark is a non-null assertion that will let TS know that ref.current is defined when we access it in effects.
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    return (ref.current.rotation.x += delta);
  });

  const [map, second, third, forth] = useLoader(TextureLoader, [
    backgroundImage,
    backgroundImage,
    backgroundImage,
    backgroundImage,
  ]);
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 0.75 : 1}
      onClick={event => click(!clicked)}
      onPointerOver={event => hover(true)}
      onPointerOut={event => hover(false)}
    >
      <sphereGeometry args={[3, 128, 128]} />
      <meshStandardMaterial map={map} />
    </mesh>
  );
};

export default Visual;

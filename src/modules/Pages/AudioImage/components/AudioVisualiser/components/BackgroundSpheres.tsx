import { useRef } from "react";
import { IMaterialProps, IcosahedronProps } from "../types";
import { useFrame } from "@react-three/fiber";
import { initialSpheresPositions } from "../constants";
import { Icosahedron } from "@react-three/drei";

const BackgroundSpheres = ({ material }: IMaterialProps) => {
  const sphereRefs = useRef<IcosahedronProps[]>([]);

  useFrame(() => {
    sphereRefs.current.forEach((el: IcosahedronProps) => {
      el.position.y += 0.02;
      if (el.position.y > 22) el.position.y = -18;
      el.rotation.x += 0.06;
      el.rotation.y += 0.06;
      el.rotation.z += 0.02;
    });
  });
  return (
    <>
      {initialSpheresPositions.map((pos, i) => (
        <Icosahedron
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          material={material}
          key={i}
          ref={(ref: IcosahedronProps) => (sphereRefs.current[i] = ref)}
        />
      ))}
    </>
  );
};

export default BackgroundSpheres;

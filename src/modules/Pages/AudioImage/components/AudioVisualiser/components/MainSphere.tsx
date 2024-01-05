import { useRef } from "react";
import { IMaterialProps, IcosahedronProps } from "../types";
import { useAppSelector } from "../../../../../../redux/hooks";
import { getCurrentTrackData } from "../../../slice";
import { useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";

const MainSphere = ({ material }: IMaterialProps) => {
  const main = useRef<IcosahedronProps>(null!);
  const trackData = useAppSelector(getCurrentTrackData);

  useFrame(({ clock }) => {
    if (!main.current.rotation) return;

    const time = clock.getElapsedTime();
    main.current.rotation.z = time * 3;

    if (!trackData) return;

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
  });

  return <Icosahedron args={[0.7, 4]} ref={main} material={material} position={[0.2, 0.5, 0]} />;
};

export default MainSphere;

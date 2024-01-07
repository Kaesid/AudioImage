import { BufferGeometry, Material, Mesh, MeshBasicMaterial, NormalBufferAttributes, Object3DEventMap } from "three";

interface IMaterialProps {
  material: IMeshBasicMaterial;
}

interface IMeshBasicMaterial extends MeshBasicMaterial {
  metalness: number;
  _distort: {
    value: number;
  };
}

type IcosahedronProps = Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>;

export type { IMaterialProps, IMeshBasicMaterial, IcosahedronProps };

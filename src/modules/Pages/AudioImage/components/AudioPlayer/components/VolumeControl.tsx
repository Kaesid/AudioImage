import { VolumeInput } from "../styled-components";
import { OnVolumeChange } from "../types";

const VolumeControl = ({ onVolumeChange }: { onVolumeChange: OnVolumeChange }) => {
  return (
    <VolumeInput>
      <input type="range" min={0} max={1} step={0.01} defaultValue={0.8} id="myRange" onChange={onVolumeChange} />
    </VolumeInput>
  );
};

export default VolumeControl;

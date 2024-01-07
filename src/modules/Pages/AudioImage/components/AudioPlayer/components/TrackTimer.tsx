import { ControlPanelTime } from "../styled-components";
import { getDisplayedTime } from "../helpers";

const TrackTimer = ({ displayedTime, duration }: { displayedTime: number; duration: number }) => {
  return (
    <ControlPanelTime>
      <span>{getDisplayedTime(displayedTime)}</span>
      <span>/</span>
      <span>{getDisplayedTime(duration)}</span>
    </ControlPanelTime>
  );
};

export default TrackTimer;

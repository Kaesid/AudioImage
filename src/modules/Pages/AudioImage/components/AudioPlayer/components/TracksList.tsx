import { useState } from "react";
import { TrackData, TrackListTrigger } from "../styled-components";
import Collapsible from "react-collapsible";
import { IconDown } from "../../../../../../assets/images/svgrepo";
import { IAudioImageState } from "../../../types";
import { ITrackListProps, SetTrackActive } from "../types";

const TracksList = ({ tracksList, setTrackActive, currentTrackUrl }: ITrackListProps) => {
  const [isTrackListVisible, setIsTrackListVisible] = useState(true);

  return (
    <Collapsible
      contentElementId="content"
      overflowWhenOpen="auto"
      open={isTrackListVisible}
      onOpening={() => setIsTrackListVisible(true)}
      onClosing={() => setIsTrackListVisible(false)}
      trigger={
        <TrackListTrigger $isOpen={isTrackListVisible}>
          <div>
            <p>Tracklist</p> <IconDown />
          </div>
        </TrackListTrigger>
      }
    >
      <div>
        {tracksList.map(({ url, name }) => (
          <TrackData key={name} $isActive={currentTrackUrl === url} onClick={() => setTrackActive(url)}>
            {name}
          </TrackData>
        ))}
      </div>
    </Collapsible>
  );
};

export default TracksList;

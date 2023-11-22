import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { getTracksList, setCurrentTrack } from "../../../audioImageSlice";
import { TrackData } from "../styled-components";

const TracksList = ({ addFile, tracklist }: any) => {
  return (
    <div>
      {tracklist.map(({ src, name }: any) => (
        <TrackData>{name}</TrackData>
      ))}
      <div>
        <label htmlFor="audio">ADD</label>
        <input id="audio" accept="audio/*" type="file" onChange={addFile} />
      </div>
    </div>
  );
};

export default TracksList;

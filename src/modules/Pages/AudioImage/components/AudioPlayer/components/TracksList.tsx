import { AddTrack, TrackData, TrackList, TrackListBox } from "../styled-components";

const TracksList = ({ addFile, tracklist, setTrackActive, currentTrackUrl }: any) => {
  return (
    <TrackList>
      <TrackListBox>
        {tracklist.map(({ url, name }: any) => (
          <TrackData key={name} $isActive={currentTrackUrl === url} onClick={() => setTrackActive(url)}>
            {name}
          </TrackData>
        ))}
      </TrackListBox>

      <AddTrack>
        <label htmlFor="audio">ADD</label>
        <input id="audio" accept="audio/*" type="file" onChange={addFile} />
      </AddTrack>
    </TrackList>
  );
};

export default TracksList;

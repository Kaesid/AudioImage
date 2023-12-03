import { AddTrack, HiddenInput, InputLabel, TrackData, TrackList, TrackListBox } from "../styled-components";

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
        <InputLabel htmlFor="audio">+</InputLabel>
        <HiddenInput id="audio" accept="audio/*" type="file" onChange={addFile} />
      </AddTrack>
    </TrackList>
  );
};

export default TracksList;

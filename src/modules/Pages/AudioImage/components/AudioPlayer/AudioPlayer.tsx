import { Html, PositionalAudio } from "@react-three/drei";
import { appName } from "../../../../../constants/text";
import {
  AppName,
  ControlPanel,
  ControlPanelButtons,
  ControlTrackButtons,
  PlayButton,
  PlayerTopContent,
  TrackList,
} from "./styled-components";
import { AddTrackButton, TrackTimer, TracksList, VolumeControl } from "./components";
import { useAudioControl } from "./hooks";

const AudioPlayer = () => {
  const {
    duration,
    updateTracks,
    setTrackActive,
    toggleStatus,
    onVolumeChange,
    currentTrackUrl,
    playerRef,
    tracksList,
    displayedTime,
    changeTrack,
    isPlaying,
  } = useAudioControl();

  return (
    <>
      {currentTrackUrl && <PositionalAudio ref={playerRef} url={currentTrackUrl} />}
      <Html>
        <TrackList>
          <PlayerTopContent>
            <AppName>{appName}</AppName>
            <AddTrackButton updateTracks={updateTracks} />
          </PlayerTopContent>
          {playerRef.current && (
            <TracksList tracksList={tracksList} setTrackActive={setTrackActive} currentTrackUrl={currentTrackUrl} />
          )}
          <ControlPanelButtons>
            {currentTrackUrl && (
              <ControlPanel>
                {playerRef.current && <TrackTimer displayedTime={displayedTime} duration={duration} />}
                <ControlTrackButtons>
                  {tracksList.length > 1 && <PlayButton onClick={() => changeTrack(-1)}>PREV</PlayButton>}
                  <PlayButton onClick={toggleStatus}>{isPlaying ? "PAUSE" : "PLAY"}</PlayButton>
                  {tracksList.length > 1 && <PlayButton onClick={() => changeTrack(1)}>NEXT</PlayButton>}
                </ControlTrackButtons>
              </ControlPanel>
            )}
            {playerRef.current && <VolumeControl onVolumeChange={onVolumeChange} />}
          </ControlPanelButtons>
        </TrackList>
      </Html>
    </>
  );
};

export default AudioPlayer;

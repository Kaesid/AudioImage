import { Html, PositionalAudio } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { AudioAnalyser, PositionalAudio as PositionalAudioType } from "three";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  getAudioImageState,
  getCurrentTrack,
  getTracksList,
  setCurrentTrack,
  setCurrentTrackData,
  updateTracksList,
} from "../../slice";
import sample from "../sample.mp3";
import TracksList from "./components/TracksList";
import {
  AddTrack,
  ControlPanel,
  ControlPanelButtons,
  ControlPanelTime,
  ControlTrackButtons,
  HiddenInput,
  HtmlWrap,
  InputLabel,
  PlayButton,
  TrackData,
  TrackList,
  TrackListBox,
} from "./styled-components";
import { getDisplayedTime } from "./helpers";

const AudioPlayer = () => {
  const playerRef = useRef<PositionalAudioType>(null!);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayedTime, setDisplayedTime] = useState(0);
  const { currentTrackUrl, tracksList } = useAppSelector(getAudioImageState);
  const dispatch = useAppDispatch();
  const duration = Math.trunc(playerRef.current?.buffer?.duration || 0);

  // const currentTrack = useAppSelector(getCurrentTrack);

  // const tracklist = useAppSelector(getTracksList);

  const addFile = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      dispatch(updateTracksList(file));
    }
  };

  const toggleStatus = () => {
    isPlaying ? playerRef.current.pause() : playerRef.current.play();
    setIsPlaying(prev => !prev);
  };

  const changeTrack = (increment: number) => {
    const currentElemIndex = tracksList.findIndex(({ url }) => currentTrackUrl === url);
    dispatch(setCurrentTrack(tracksList[(currentElemIndex + increment) % tracksList.length].url));
  };

  const setTrackActive = (url: string) => dispatch(setCurrentTrack(url));

  useEffect(() => {
    if (!currentTrackUrl) return;
    playerRef.current.stop();
    if (isPlaying) {
      playerRef.current.play();
    }
    dispatch(setCurrentTrackData(new AudioAnalyser(playerRef.current, 128)));
    setDisplayedTime(Math.trunc((playerRef.current as any)._progress));
  }, [currentTrackUrl]);

  useEffect(() => {
    if (!isPlaying) {
      if (playerRef.current) setDisplayedTime(Math.trunc((playerRef.current as any)._progress));
      return;
    }
    const interval = setInterval(() => {
      setDisplayedTime(oldTime => {
        if (oldTime < duration - 2) return oldTime + 1;
        // clearInterval(interval);
        return -1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (displayedTime === -1) changeTrack(1);
  }, [displayedTime]);

  const setRefDistance = (increment: number) => {
    let number = playerRef.current.getRefDistance() + increment;
    if (number > 100) number = 100;
    if (number < 0) number = 0;
    playerRef.current.setRefDistance(number);
    // playerRef.current.setDirectionalCone(increment, increment, increment);
  };

  return (
    <>
      {currentTrackUrl && <PositionalAudio ref={playerRef} url={currentTrackUrl} />}
      <HtmlWrap>
        {/* <TracksList
          addFile={addFile}
          tracklist={tracksList}
          currentTrackUrl={currentTrackUrl}
          setTrackActive={setTrackActive}
        /> */}
        <TrackList>
          <TrackListBox>
            {tracksList.map(({ url, name }: any) => (
              <TrackData key={name} $isActive={currentTrackUrl === url} onClick={() => setTrackActive(url)}>
                {name}
              </TrackData>
            ))}
          </TrackListBox>
          <ControlPanelButtons>
            {currentTrackUrl && (
              <ControlPanel>
                {playerRef.current && (
                  <ControlPanelTime>
                    <span>{getDisplayedTime(displayedTime)}</span>
                    <span>/</span>
                    <span>{getDisplayedTime(duration)}</span>
                  </ControlPanelTime>
                )}
                <ControlTrackButtons>
                  {tracksList.length > 1 && <PlayButton onClick={() => changeTrack(-1)}>PREV</PlayButton>}
                  <PlayButton onClick={toggleStatus}>{isPlaying ? "PAUSE" : "PLAY"}</PlayButton>
                  {tracksList.length > 1 && <PlayButton onClick={() => changeTrack(1)}>NEXT</PlayButton>}

                  {/* <PlayButton onClick={() => setRefDistance(+1)}>+</PlayButton> */}
                  {/* <PlayButton onClick={() => setRefDistance(-1)}>-</PlayButton> */}
                </ControlTrackButtons>
              </ControlPanel>
            )}
            <AddTrack>
              <InputLabel htmlFor="audio">+</InputLabel>
              <HiddenInput id="audio" accept="audio/*" type="file" onChange={addFile} />
            </AddTrack>
          </ControlPanelButtons>
          <div>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="20"
              id="myRange"
              onChange={event => playerRef.current.setRefDistance(Math.trunc(Number(event.target.value)))}
            />
          </div>
        </TrackList>
      </HtmlWrap>
    </>
  );
};

export default AudioPlayer;

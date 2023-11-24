import { Html, PositionalAudio } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { PlayButton } from "../../styled-components";
import { PositionalAudioProps } from "@react-three/fiber";
import { AudioAnalyser, PositionalAudio as PositionalAudioType } from "three";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  getAudioImageState,
  getCurrentTrack,
  getTracksList,
  setCurrentTrack,
  setCurrentTrackData,
  updateTracksList,
} from "../../audioImageSlice";
import sample from "../sample.mp3";
import TracksList from "./components/TracksList";
import { ControlPanel, HtmlWrap } from "./styled-components";

const AudioPlayer = () => {
  const playerRef = useRef<PositionalAudioType>(null!);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentTrackUrl, tracksList } = useAppSelector(getAudioImageState);
  const dispatch = useAppDispatch();
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
  }, [currentTrackUrl]);

  return (
    <>
      {currentTrackUrl && <PositionalAudio ref={playerRef} url={currentTrackUrl} />}
      <HtmlWrap>
        <TracksList
          addFile={addFile}
          tracklist={tracksList}
          currentTrackUrl={currentTrackUrl}
          setTrackActive={setTrackActive}
        />
        {currentTrackUrl && (
          <ControlPanel>
            {tracksList.length > 1 && <PlayButton onClick={() => changeTrack(-1)}>PREV</PlayButton>}
            <PlayButton onClick={toggleStatus}>{isPlaying ? "PAUSE" : "PLAY"}</PlayButton>
            {tracksList.length > 1 && <PlayButton onClick={() => changeTrack(1)}>NEXT</PlayButton>}
          </ControlPanel>
        )}
      </HtmlWrap>
    </>
  );
};

export default AudioPlayer;

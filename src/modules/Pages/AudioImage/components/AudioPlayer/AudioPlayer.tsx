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
} from "../../audioImageSlice";
import sample from "../sample.mp3";
import TracksList from "./components/TracksList";

const AudioPlayer = () => {
  const playerRef = useRef<PositionalAudioType>(null!);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioImageState = useAppSelector(getAudioImageState);
  const dispatch = useAppDispatch();
  const source = sample;
  const currentTrack = useAppSelector(getCurrentTrack);

  const tracklist = useAppSelector(getTracksList);

  const addFile = (e: any) => {
    if (e.target.files[0]) {
      dispatch(setCurrentTrack(URL.createObjectURL(e.target.files[0])));
    }
  };

  const toggleStatus = () => {
    isPlaying ? playerRef.current.pause() : playerRef.current.play();
    setIsPlaying(prev => !prev);
  };

  useEffect(() => {
    if (!currentTrack) return;
    setIsPlaying(false);
    playerRef.current.stop();
    dispatch(setCurrentTrackData(new AudioAnalyser(playerRef.current, 128)));
  }, [currentTrack]);

  return (
    <>
      {currentTrack && <PositionalAudio ref={playerRef} url={currentTrack} />}
      <Html>
        <TracksList addFile={addFile} tracklist={tracklist} />
        {currentTrack && <PlayButton onClick={toggleStatus}>{isPlaying ? "PAUSE" : "PLAY"}</PlayButton>}
      </Html>
    </>
  );
};

export default AudioPlayer;

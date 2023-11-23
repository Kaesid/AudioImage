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

const AudioPlayer = () => {
  const playerRef = useRef<PositionalAudioType>(null!);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentTrackUrl } = useAppSelector(getAudioImageState);
  const dispatch = useAppDispatch();
  // const currentTrack = useAppSelector(getCurrentTrack);

  const tracklist = useAppSelector(getTracksList);

  const addFile = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    console.log(URL.createObjectURL(file));
    if (file) {
      dispatch(updateTracksList(file));
    }
  };

  const toggleStatus = () => {
    isPlaying ? playerRef.current.pause() : playerRef.current.play();
    setIsPlaying(prev => !prev);
  };

  const setTrackActive = (url: string) => dispatch(setCurrentTrack(url));

  useEffect(() => {
    if (!currentTrackUrl) return;
    setIsPlaying(false);
    playerRef.current.stop();
    dispatch(setCurrentTrackData(new AudioAnalyser(playerRef.current, 128)));
  }, [currentTrackUrl]);

  return (
    <>
      {currentTrackUrl && <PositionalAudio ref={playerRef} url={currentTrackUrl} />}
      <Html>
        <TracksList
          addFile={addFile}
          tracklist={tracklist}
          currentTrackUrl={currentTrackUrl}
          setTrackActive={setTrackActive}
        />
        {currentTrackUrl && <PlayButton onClick={toggleStatus}>{isPlaying ? "PAUSE" : "PLAY"}</PlayButton>}
      </Html>
    </>
  );
};

export default AudioPlayer;

import { PositionalAudio } from "@react-three/drei";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AudioAnalyser, PositionalAudio as PositionalAudioType } from "three";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { getAudioImageState, setCurrentTrack, setCurrentTrackData, updateTracksList } from "../../slice";

import {
  AddTrack,
  AppName,
  ControlPanel,
  ControlPanelButtons,
  ControlPanelTime,
  ControlTrackButtons,
  HiddenInput,
  HtmlWrap,
  InputLabel,
  PlayButton,
  PlayerTopContent,
  TrackData,
  TrackList,
  TrackListBox,
  TrackListTrigger,
  VolumeInput,
} from "./styled-components";
import { getDisplayedTime } from "./helpers";
import { appName } from "../../../../../constants/text";
import Collapsible from "react-collapsible";
import { IconDown } from "../../../../../assets/images/svgrepo";

interface IPositionalAudioType extends PositionalAudioType {
  _progress: number;
}

const AudioPlayer = () => {
  const playerRef = useRef<IPositionalAudioType>(null!);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayedTime, setDisplayedTime] = useState(0);
  const displayedTimeRef = useRef(0);
  const [isTrackListVisible, setIsTrackListVisible] = useState(true);
  const { currentTrackUrl, tracksList } = useAppSelector(getAudioImageState);
  const dispatch = useAppDispatch();
  const duration = Math.trunc(playerRef.current?.buffer?.duration || 0);

  const addFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];

    if (file) dispatch(updateTracksList(file));
  };

  const toggleStatus = () => {
    isPlaying ? playerRef.current.pause() : playerRef.current.play();
    setIsPlaying(prev => !prev);
  };

  const changeTrack = (increment: number) => {
    const currentElemIndex = tracksList.findIndex(({ url }) => currentTrackUrl === url);

    if (tracksList.length > 1) {
      const nextIndex = (currentElemIndex + increment) % tracksList.length;
      dispatch(setCurrentTrack(tracksList[nextIndex].url));
    } else {
      playerRef.current.play();
    }
  };

  const setTrackActive = (url: string) => dispatch(setCurrentTrack(url));

  const setProgress = () => {
    const progress = Math.trunc(playerRef.current._progress);
    displayedTimeRef.current = progress;
    setDisplayedTime(progress);
  };

  useEffect(() => {
    if (!currentTrackUrl) return;
    playerRef.current.stop();
    if (isPlaying) {
      playerRef.current.play();
    }
    dispatch(setCurrentTrackData(new AudioAnalyser(playerRef.current, 128)));
    setProgress();
  }, [currentTrackUrl]);

  useEffect(() => {
    if (!isPlaying) {
      if (playerRef.current) {
        setProgress();
      }
      return;
    }
    const interval = setInterval(() => {
      const duration = playerRef.current?.buffer?.duration;
      console.log(duration);
      console.log(displayedTimeRef.current);
      if (duration) {
        if (displayedTimeRef.current < duration - 1) {
          displayedTimeRef.current += 1;
          setDisplayedTime(displayedTimeRef.current);
        } else {
          playerRef.current.stop();
          setDisplayedTime(-1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (displayedTime === -1) {
      setProgress();
      changeTrack(1);
    }
  }, [displayedTime]);

  return (
    <>
      {currentTrackUrl && <PositionalAudio ref={playerRef} url={currentTrackUrl} />}
      <HtmlWrap>
        <TrackList>
          <PlayerTopContent>
            <AppName>{appName}</AppName>
            <AddTrack>
              <InputLabel htmlFor="audio">+</InputLabel>
              <HiddenInput id="audio" accept="audio/*" type="file" onChange={addFile} />
            </AddTrack>
          </PlayerTopContent>
          {playerRef.current && (
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
              <TrackListBox>
                {tracksList.map(({ url, name }) => (
                  <TrackData key={name} $isActive={currentTrackUrl === url} onClick={() => setTrackActive(url)}>
                    {name}
                  </TrackData>
                ))}
              </TrackListBox>
            </Collapsible>
          )}

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
                </ControlTrackButtons>
              </ControlPanel>
            )}
            {playerRef.current && (
              <VolumeInput>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  defaultValue={0.8}
                  id="myRange"
                  onChange={event => playerRef.current.setVolume(Number(event.target.value))}
                />
              </VolumeInput>
            )}
          </ControlPanelButtons>
        </TrackList>
      </HtmlWrap>
    </>
  );
};

export default AudioPlayer;

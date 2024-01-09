import { useCallback, useEffect, useRef, useState } from "react";
import { AudioAnalyser } from "three";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { getAudioImageState, setCurrentTrack, setCurrentTrackData, updateTracksList } from "../../slice";
import { IPositionalAudioType, OnVolumeChange, SetTrackActive, UpdateTracks } from "./types";

const useAudioControl = (isMobile: boolean) => {
  const dispatch = useAppDispatch();
  const { currentTrackUrl, tracksList } = useAppSelector(getAudioImageState);

  const playerRef = useRef<IPositionalAudioType>(null!);
  const displayedTimeRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [displayedTime, setDisplayedTime] = useState(0);

  const duration = Math.trunc(playerRef.current?.buffer?.duration || 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateTracks: UpdateTracks = useCallback(track => dispatch(updateTracksList(track)), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setTrackActive: SetTrackActive = useCallback(url => dispatch(setCurrentTrack(url)), []);

  const onVolumeChange: OnVolumeChange = event => playerRef.current.setVolume(Number(event.target.value));

  const toggleStatus = () => {
    isPlaying ? playerRef.current.pause() : playerRef.current.play();
    setIsPlaying(prev => !prev);
  };

  const changeTrack = (increment: number) => {
    const currentElemIndex = tracksList.findIndex(({ url }) => currentTrackUrl === url);

    const nextIndex = (currentElemIndex + increment) % tracksList.length;
    dispatch(setCurrentTrack(tracksList[nextIndex].url));
  };

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
    setProgress(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackUrl]);

  useEffect(() => {
    if (isMobile) window.scrollTo(0, document.body.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracksList.length]);

  useEffect(() => {
    if (!isPlaying) {
      if (playerRef.current) setProgress();
      return;
    }

    const interval = setInterval(() => {
      const duration = playerRef.current?.buffer?.duration;

      if (duration) {
        if (displayedTimeRef.current < duration - 2) {
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
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    if (displayedTime === -1) {
      setProgress();
      tracksList.length > 1 ? changeTrack(1) : playerRef.current.play();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedTime]);

  return {
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
  };
};

export { useAudioControl };

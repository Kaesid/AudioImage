import { ChangeEvent } from "react";
import { PositionalAudio as PositionalAudioType } from "three";
import { IAudioImageState } from "../../types";

interface IPositionalAudioType extends PositionalAudioType {
  _progress: number;
}

type OnVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {};

type SetTrackActive = (url: string) => {};

interface ITrackListProps {
  setTrackActive: SetTrackActive;
  tracksList: IAudioImageState["tracksList"];
  currentTrackUrl: IAudioImageState["currentTrackUrl"];
}

type UpdateTracks = (file: File) => {};

export type { IPositionalAudioType, OnVolumeChange, SetTrackActive, ITrackListProps, UpdateTracks };

import { AudioAnalyser } from "three";

interface ITrack {
  name: string;
  url: string;
}

interface IAudioImageState {
  currentTrackData: AudioAnalyser | null;
  tracksList: ITrack[];
  currentTrackUrl: string;
}

export type { IAudioImageState, ITrack };

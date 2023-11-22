import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";
import { AudioAnalyser } from "three";

interface IAudioImageState {
  currentTrackData: AudioAnalyser | null;
  tracksList: ITrack[];
  currentTrack: string;
}

interface ITrack {
  //key?
  name: string;
  src: string;
}

const initialState: IAudioImageState = {
  currentTrackData: null,
  tracksList: [],
  currentTrack: "",
};

export const audioImageSlice = createSlice({
  name: "audioImage",
  initialState,
  reducers: {
    setCurrentTrackData: (state, action: PayloadAction<AudioAnalyser>) => {
      state.currentTrackData = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<string>) => {
      state.currentTrack = action.payload;
    },
  },
});

const getCurrentTrackData = (state: RootState) => state.audioImage.currentTrackData;
const getTracksList = (state: RootState) => state.audioImage.tracksList;
const getCurrentTrack = (state: RootState) => state.audioImage.currentTrack;
const getAudioImageState = (state: RootState) => state.audioImage;

export const { setCurrentTrackData, setCurrentTrack } = audioImageSlice.actions;

export default audioImageSlice.reducer;

export { getCurrentTrackData, getAudioImageState, getTracksList, getCurrentTrack };

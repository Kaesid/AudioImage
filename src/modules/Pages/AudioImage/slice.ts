import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";
import { AudioAnalyser } from "three";

interface IAudioImageState {
  currentTrackData: AudioAnalyser | null;
  tracksList: ITrack[];
  currentTrackUrl: string;
}

interface ITrack {
  name: string;
  url: string;
}

const initialState: IAudioImageState = {
  currentTrackData: null,
  tracksList: [],
  currentTrackUrl: "",
};

export const audioImageSlice = createSlice({
  name: "audioImage",
  initialState,
  reducers: {
    setCurrentTrackData: (state, action: PayloadAction<AudioAnalyser>) => {
      state.currentTrackData = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<string>) => {
      state.currentTrackUrl = action.payload;
    },
    updateTracksList: (state, action: PayloadAction<File>) => {
      const file = action.payload;
      const isTrackExist = Boolean(state.tracksList.find(({ name }) => name === file.name));
      if (isTrackExist) return;
      const url = URL.createObjectURL(file);
      if (!state.currentTrackUrl) state.currentTrackUrl = url;

      state.tracksList = [...state.tracksList, { name: file.name, url }];
    },
  },
});

const getCurrentTrackData = (state: RootState) => state.audioImage.currentTrackData;
const getTracksList = (state: RootState) => state.audioImage.tracksList;
const getCurrentTrack = (state: RootState) => state.audioImage.currentTrackUrl;
const getAudioImageState = (state: RootState) => state.audioImage;

export const { setCurrentTrackData, setCurrentTrack, updateTracksList } = audioImageSlice.actions;

export default audioImageSlice.reducer;

export { getCurrentTrackData, getAudioImageState, getTracksList, getCurrentTrack };

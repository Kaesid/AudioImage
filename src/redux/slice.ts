import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ICommonState {
  isSessionActive: boolean;
}

const initialState: ICommonState = {
  isSessionActive: false,
};

export const commonSlice = createSlice({
  name: "commmon",
  initialState,

  reducers: {
    setSessionActive: state => {
      state.isSessionActive = true;
    },
  },
});

const getIsSessionActive = (state: RootState) => state.common.isSessionActive;

export const { setSessionActive } = commonSlice.actions;

export default commonSlice.reducer;

export { getIsSessionActive };

import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./sagas";
import commonSlice from "./commonSlice";
import audioImageSlice from "../modules/Pages/AudioImage/audioImageSlice";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    common: commonSlice,
    audioImage: audioImageSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

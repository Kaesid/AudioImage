import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./sagas";
import commonSlice from "./slice";
import audioImageSlice from "../modules/Pages/AudioImage/slice";

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

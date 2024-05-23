import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "@/redux/reducers/rooReducers";
import baseApi from "./api/baseApi";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

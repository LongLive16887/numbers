import { configureStore } from "@reduxjs/toolkit";
import { numbersApi } from "../../api/NumbersApi";
import factReducer from "./factSlice";

export const store = configureStore({
  reducer: {
    [numbersApi.reducerPath]: numbersApi.reducer,
    fact: factReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(numbersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

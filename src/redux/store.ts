import { configureStore } from "@reduxjs/toolkit";
import libraryIndexReducer from "./libraryIndex";
import libraryDetailsReducer, { addBook, removeBook } from "./libraryDetails";

export const store = configureStore({
    reducer: {
        libraryIndex: libraryIndexReducer,
        libraryDetails: libraryDetailsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import libraryIndexReducer from "./libraryIndex";
import libraryDetailsReducer, { addBook, removeBook } from "./libraryDetails";

const store = configureStore({
    reducer: {
        libraryIndex: libraryIndexReducer,
        libraryDetails: libraryDetailsReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
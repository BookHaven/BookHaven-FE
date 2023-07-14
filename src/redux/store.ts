import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import libraryIndexReducer from "./libraryIndex";
import booksReducer from "./books";
import formReducer from "./form";

const store = configureStore({
    reducer: {
        libraryIndex: libraryIndexReducer,
        books: booksReducer,
        form: formReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
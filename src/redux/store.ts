import { configureStore } from "@reduxjs/toolkit";
import libraryIndexReducer from "./libraryIndex";

export default configureStore({
    reducer: {
        libraryIndex: libraryIndexReducer
    }
})
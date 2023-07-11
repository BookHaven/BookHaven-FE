import { configureStore } from "@reduxjs/toolkit";
import libraryIndexReducer from "./libraryIndex";
import libraryDetailsReducer from "./libraryDetails";

export default configureStore({
    reducer: {
        libraryIndex: libraryIndexReducer,
        libraryDetails: libraryDetailsReducer
    }
})
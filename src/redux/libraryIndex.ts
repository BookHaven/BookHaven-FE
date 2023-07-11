import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLibraries = createAsyncThunk("libraryIndex/fetchLibraries", () => {
    return axios
        .get("")
        .then(response => response.data)
})

interface InitialState {
    loading: boolean,
    libraries: [], 
    error: string
}

const initialState: InitialState = {
    loading: false, 
    libraries: [], 
    error: ""
}

export const libraryIndexSlice = createSlice({
    name: "libraryIndex",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchLibraries.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchLibraries.fulfilled, (state, action) => {
            state.loading = false, 
            state.libraries = action.payload, 
            state.error= ""
        })
        builder.addCase(fetchLibraries.rejected, (state, action) => {
            state.loading = false, 
            state.libraries = [], 
            state.error = action.error.message || "Error: Unable to fetch data"
        })
    }
})
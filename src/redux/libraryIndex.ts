import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLibraries = createAsyncThunk("libraryIndex/fetchLibraries", () => {
    return axios
        .get("https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries")
        .then(response => response.data)
})

interface InitialState {
    loading: boolean,
    libraries: Library[], 
    error: string
}

interface Library {
    id: number, 
    type: string, 
    attributes: {
        name: string, 
        address: {
            street: string, 
            city: string, 
            state: string
        }
        location: {
            latitude: number, 
            longitude: number
        }
        book_count: number, 
    }
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
            state.loading = true;
        })
        builder.addCase(fetchLibraries.fulfilled, (state, action: PayloadAction<Library[]>) => {
                state.loading = false;
                state.libraries = action.payload;
                state.error= "";
        })
        builder.addCase(fetchLibraries.rejected, (state, action) => {
            state.loading = false;
            state.libraries = [];
            state.error = action.error.message || "Error: Unable to fetch data";
        })
    }
})

export default libraryIndexSlice.reducer
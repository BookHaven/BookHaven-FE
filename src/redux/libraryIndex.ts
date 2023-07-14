import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLibraries = createAsyncThunk("libraryIndex/fetchLibraries", () => {
    return axios
        .get("https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries")
        .then(response => response.data)
});

interface InitialState {
    loading: boolean,
    libraries: Library[],
    error: string
};

interface LibraryIndexResponse {
    data: Library[]
};

interface Library {
    id: number, 
    type: string, 
    attributes: {
        name: string, 
        address: {
            street: string, 
            city: string, 
            state: string,
            zip: number
        }
        location: {
            latitude: number, 
            longitude: number
        }
        book_count: number, 
    }
};

const initialState: InitialState = {
    loading: false, 
    libraries: [], 
    error: ""
};

export const libraryIndexSlice = createSlice({
    name: "libraryIndex",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchLibraries.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchLibraries.fulfilled, (state, action: PayloadAction<LibraryIndexResponse>) => {
            state.loading = false;
            state.libraries = action.payload.data;
            state.error= "";
        })
        builder.addCase(fetchLibraries.rejected, (state, action) => {
            state.loading = false;
            state.libraries = [];
            state.error = action.error.message || "Error: Unable to fetch data";
        })
    }
});

export default libraryIndexSlice.reducer;
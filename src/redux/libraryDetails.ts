import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLibraries = createAsyncThunk("libraryIndex/fetchLibraries", () => {
    return axios
        .get("https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/1/books")
        .then(response => response.data)
})

interface InitialState {
    loading: boolean,
    books: Book[],
    error: string
}

interface Book {
   id: number, 
   type: string, 
   attributes: {
    isbn: string, 
    book_image: string, 
    description: string, 
    title: string, 
    author: string, 
    genre: string,
    library_id: number
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
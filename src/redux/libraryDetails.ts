import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("libraryDetails/fetchBooks", () => {
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
    books: [], 
    error: ""
}

export const libraryDetailsSlice = createSlice({
    name: "libraryDetails",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchBooks.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.loading = false;
                state.books = action.payload;
                state.error= "";
        })
        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false;
            state.books = [];
            state.error = action.error.message || "Error: Unable to fetch data";
        })
    }
})

export default libraryDetailsSlice.reducer
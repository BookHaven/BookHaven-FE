import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

interface BookDetailsResponse {
  data: Book[]
}

const initialState: InitialState = {
  loading: false,
  books: [],
  error: ""
}

export const fetchBooks = createAsyncThunk('bookDetails/fetchBooks', ({libraryId, bookId}: { libraryId: number, bookId: number}) => {
  return axios 
    .get(`https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/${libraryId}/books/${bookId}`)
    .then(response => response.data)
})

// reducers = do addBook and removeBook need to live here?

export const bookDetailsSlice = createSlice({
  name: "bookDetails",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<BookDetailsResponse>) => {
      state.loading = false;
      state.books = action.payload.data;
      state.error = "";
    })
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.books = [];
      state.error = action.error.message || "Error: Unable to fetch data";
    })
  }
})

export default bookDetailsSlice.reducer;

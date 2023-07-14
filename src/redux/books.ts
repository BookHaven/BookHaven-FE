import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  loading: boolean,
  books: Book[],
  error: string
};

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
};

interface Isbn {
  isbn: string
}

interface BooksResponse {
  data: Book[]
};

const initialState: InitialState = {
  loading: false,
  books: [],
  error: ""
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', (libraryId: number) => {
  return axios 
    .get(`https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/${libraryId}/books`)
    .then(response => response.data)
});

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Isbn>) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<BooksResponse>) => {
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
});

export default booksSlice.reducer;
export const { addBook, removeBook } = booksSlice.actions;

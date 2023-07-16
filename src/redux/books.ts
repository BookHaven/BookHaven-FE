import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";
import { useAppSelector } from '../redux/store';

interface InitialState {
  loading: boolean,
  books: Book[],
  error: string
};

interface Book {
  id: number, 
  type: string, 
  attributes: {
    title: string;
    author: string;
    isbn: string;
    book_image: string;
    description: string;
    genre: string;
    library_id: number;
  }
};

interface GetBooksResponse {
  data: Book[]
};

interface PostBooksRequest {
  libraryId: number,
  isbn: string
};

interface PostBooksResponse {
  data: Book
};

interface RemoveBooksRequest {
  libraryId: number,
  bookId: number
};

interface RemoveBooksResponse {
  data: {
    bookId: number,
    detail: string
  }
};

const initialState: InitialState = {
  loading: false,
  books: [],
  error: ""
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', (libraryId: number) => {
  return axios 
    .get(`https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/${libraryId}/books`)
    // .get(`https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/${libraryId}/books`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(useAppSelector(state => state.books.error = error.message))
    });
});

export const postBook = createAsyncThunk('books/postBook', async (parameterObject: PostBooksRequest) => {
  try {
    const { libraryId, isbn } = parameterObject;
    const response = await axios.post(`https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/${libraryId}/books`, { isbn });
    // const response = await axios.post(`https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/${libraryId}/books`, { isbn });
    return response.data;
  } catch (error) {
    throw new Error('Error: Unable to add book');
  }
});

export const removeBook = createAsyncThunk('books/removeBook', async (parameterObject: RemoveBooksRequest) => {
  try {
    const { libraryId, bookId } = parameterObject;
    const response = await axios.delete(`https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/${libraryId}/books/${bookId}`);
    // const response = await axios.delete(`https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/${libraryId}/books/${bookId}`);
    
    return response.data;
  } catch (error) {
    throw new Error('Error: Unable to remove book');
  }
});

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    removeBook: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<GetBooksResponse>) => {
      state.loading = false;
      state.books = action.payload.data;
      state.error = "";
    })
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.books = [];
      state.error = action.error.message || "Error: Unable to fetch data";
    })
    builder.addCase(postBook.fulfilled, (state, action: PayloadAction<PostBooksResponse>) => {
      state.books.push(action.payload.data);
    });
    builder.addCase(removeBook.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(removeBook.fulfilled, (state, action: PayloadAction<RemoveBooksResponse>) => {
      const index = state.books.findIndex(book => book.id === action.payload.data.bookId)
      state.books.splice(index, 1);
    });
    builder.addCase(removeBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error: Unable to remove book";
    })
  },
});

export default booksSlice.reducer;

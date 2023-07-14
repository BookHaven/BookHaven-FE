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

interface BookDetailsResponse {
  data: Book[]
};

const initialState: InitialState = {
  loading: false,
  books: [],
  error: ""
};

interface ParameterObject {
  libraryId: number,
  bookId: number
};

export const fetchSpecificBooks = createAsyncThunk('bookDetails/fetchSpecificBooks', (parameterObject: ParameterObject) => {
  const { libraryId, bookId } = parameterObject;

  return axios 
    .get(`https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/${libraryId}/books`)
    .then(response => response.data)
});

export const bookDetailsSlice = createSlice({
  name: "bookDetails",
  initialState,
  reducers: {}, // TO CHECK: do addBook and removeBook need to be reducers here for buttons?
  extraReducers: builder => {
    builder.addCase(fetchSpecificBooks.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchSpecificBooks.fulfilled, (state, action: PayloadAction<BookDetailsResponse>) => {
      state.loading = false;
      state.books = action.payload.data;
      state.error = "";
    })
    builder.addCase(fetchSpecificBooks.rejected, (state, action) => {
      state.loading = false;
      state.books = [];
      state.error = action.error.message || "Error: Unable to fetch data";
    })
  }
});

export default bookDetailsSlice.reducer;

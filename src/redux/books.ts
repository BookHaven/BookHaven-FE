import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import axios from "axios";

export const fetchBooks = createAsyncThunk('bookDetails/fetchBooks', ({libraryId, bookId}: { libraryId: number, bookId: number}) => {
  return axios 
    .get(`https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/${libraryId}/books/${bookId}`)
    .then(response => response.data)
})

// Create bookDetailsSlice
// extra reducers = 3 cases for request outcomes
// reducers = do addBook and removeBook need to live here?
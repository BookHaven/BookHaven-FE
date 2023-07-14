import React, { Component } from "react";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { useAppSelector } from '../redux/store';
// import { RootState } from './store';

// interface InitialState {
//     isbn: number, 
//     books: Book[]
// }

// interface Book {
//     id: number, 
//     type: string, 
//     attributes: {
//      isbn: number, 
//      book_image: string, 
//      description: string, 
//      title: string, 
//      author: string, 
//      genre: string,
//      library_id: number
//     }
// }

// const libraryDetails = useAppSelector((state: RootState) => state.libraryDetails);

// const initialState: InitialState = {
//     isbn: 0,
//     books: libraryDetails.books
// }

// export const formSlice = createSlice({

//     name: "form",
//     initialState,
//     reducers: {
//         addBook: (state, action: PayloadAction<Book>) => {
//             state.books = [...state.books, action.payload];
//         }
//     }
// })

// export default formSlice.reducer;
// export const { addBook } = formSlice.actions;
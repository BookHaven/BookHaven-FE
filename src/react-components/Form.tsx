import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { addBook } from "../redux/form";
import form from '../redux/form';
import { LibraryInfo } from './LibraryInfo';

export const FormView = (id: number) => {
    const libraryDetails = useAppSelector(state => state.libraryDetails);
    const dispatch = useAppDispatch()
    const newBook = 

    const handleClick = () => {
        dispatch(addBook(newBook))
    }

    return (
        <div>
            <LibraryInfo id={id}/>
            <form>  
                <h2>Add a book to this library</h2>  
                <input type="number" placeholder='ISBN'></input>
                <button onClick={handleClick}>Add Book</button>
            </form>
        </div>
     
    )
};
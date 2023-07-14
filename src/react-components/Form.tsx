import React, { ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
// import form from '../redux/form';
import { LibraryInfo } from './LibraryInfo';
import books from '../redux/books';
import { postBook } from '../redux/books';

interface FormViewProps {
  currentLibraryId: number;
}

export const FormView = ({ currentLibraryId }: FormViewProps) => {

    interface Isbn {
        isbn: string
    }

    const [isbn, setIsbn] = React.useState<Isbn>({ isbn: '' });
    const dispatch = useAppDispatch()

    const handleIsbnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsbn({ isbn: event.target.value });
    };

    const handleClick = () => {
        dispatch(postBook(isbn.isbn))
    }

    return (
        <div>
            <LibraryInfo id={currentLibraryId}/>
            <form>  
                <h2>Add a book to this library</h2>  
                <input type="text" placeholder='ISBN' value={isbn.isbn} onChange={handleIsbnChange}/>
                <button onClick={handleClick}>Add Book</button>
            </form>
        </div>
    )
};

// pass isbn value to addBook()
    //trigger POST request 
    //wait for response 
    //add response to books array 
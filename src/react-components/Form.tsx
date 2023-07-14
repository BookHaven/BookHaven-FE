import React, { ChangeEvent } from 'react';
import { useAppDispatch } from '../redux/store';
import { LibraryInfo } from './LibraryInfo';
import { postBook } from '../redux/books';
import { NavLink, useHistory } from 'react-router-dom';

interface FormViewProps {
  currentLibraryId: number;
}

interface Isbn {
  isbn: string
}

export const FormView = ({ currentLibraryId }: FormViewProps) => {

    const [isbn, setIsbn] = React.useState<Isbn>({ isbn: '' });
    const dispatch = useAppDispatch();
    const history = useHistory();

    const handleIsbnChange = (event: ChangeEvent<HTMLInputElement>) => {
      setIsbn({ isbn: event.target.value });
    };

    const parameterObject = {
      libraryId: currentLibraryId,
      isbn: isbn.isbn
    };

    const handleClick = (event: any) => {
      event.preventDefault();
      dispatch(postBook(parameterObject));
      history.push(`/libraries/${currentLibraryId}`);
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


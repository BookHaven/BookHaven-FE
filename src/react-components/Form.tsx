import React, { ChangeEvent } from 'react';
import { useAppDispatch } from '../redux/store';
import { postBook } from '../redux/books';
import '../styles/form.css';

interface FormViewProps {
  currentLibraryId: number;
};

interface Isbn {
  isbn: string
};

export const FormView = ({ currentLibraryId }: FormViewProps) => {
    const [isbn, setIsbn] = React.useState<Isbn>({ isbn: '' });
    const dispatch = useAppDispatch();
    const parameterObject = {
      libraryId: currentLibraryId,
      isbn: isbn.isbn
    };

    const handleIsbnChange = (event: ChangeEvent<HTMLInputElement>) => {
      setIsbn({ isbn: event.target.value });
    };

    const handleClick = (event: any) => {
      event.preventDefault();
      dispatch(postBook(parameterObject));
    };

    return (
        <form>
          <h2 className="comment">Add a book to this library</h2>  
          <input id="isbn-input" type="text" name="isbn" placeholder='Enter ISBN' value={isbn.isbn} onChange={handleIsbnChange}/>
          <button className="add-book-btn" onClick={handleClick}>Add Book</button>
        </form>
    );
};


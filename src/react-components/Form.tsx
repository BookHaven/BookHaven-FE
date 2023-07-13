import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchLibraries } from '../redux/libraryIndex';
import { SingleLibrary } from './SingleLibrary';
import { ErrorView } from './ErrorView';

export const FormView = () => {
  const libraryDetails = useAppSelector(state => state.libraryDetails);
  const library = libraryDetails.

  

  return (
    <form>  
        <h1>{library.attributes.name}</h1>
        <p>{library.attributes.address.street}</p>
        <p>{library.attributes.address.city}, {library.attributes.address.state} {library.attributes.address.zip}</p>
        <p>{library.attributes.book_count} Books</p>
        <Link to="/form">
            <button className="addBookBtn">Add a Book</button>
        </Link>
        <ul> 
            {libraryDetails.books.map(book=> (
            <li key={book.id}>{book.attributes.book_image}</li>
            ))}
        </ul>
    </form>
  )
};
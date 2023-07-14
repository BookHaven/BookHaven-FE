import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchBooks } from "../redux/books";
import { fetchLibraries } from '../redux/libraryIndex';
import { ErrorView } from './ErrorView';
import '../styles/bookDetailsView.css';

export const BookDetailsView = ({ currentBookId, currentLibraryId }: {currentBookId: number, currentLibraryId: number}) => {
  const booksDetails = useAppSelector(state => state.books);
  const libraryDetails = useAppSelector(state => state.libraryIndex);
  const dispatch = useAppDispatch();
  let renderWhenFulfilled;

  useEffect(() => {
    dispatch(fetchBooks(currentLibraryId));
    dispatch(fetchLibraries());
  }, []);

  const bookToDisplay = booksDetails.books.find(book => book.id === currentBookId);
  const libraryToDisplay = libraryDetails.libraries.find(library => library.id === currentLibraryId);

  if (bookToDisplay && libraryToDisplay) {
    renderWhenFulfilled =
      <>
        <div className="books-container">
          <img className="books-image" src={`${bookToDisplay.attributes.book_image}`} alt="Book cover"/>
          <div className="books-details">
            <p className="books-library-name">Library: {libraryToDisplay.attributes.name}</p>
            <h1>{bookToDisplay.attributes.title}</h1>
            <h3>{bookToDisplay.attributes.author}</h3>
            <p>{bookToDisplay.attributes.genre} • ISBN {bookToDisplay.attributes.isbn}</p>
            <h3>About</h3>
            <p>{bookToDisplay.attributes.description}</p>
          </div>
          <div className="books-buttons-container">
            <button>Checkout Book</button>
            <button>Book Not Here</button>
            <button>Return to Libraries</button>
          </div>
        </div>
      </>
  };

  console.log(`Books: ${booksDetails}`)
  console.log(`Book to display: ${bookToDisplay}`)
  
  return (
    <div>
      {booksDetails.loading && <div>Loading...</div>}
      {!booksDetails.loading && booksDetails.error && <div><ErrorView error={booksDetails.error} /></div>}
      {!booksDetails.loading && booksDetails.books.length && bookToDisplay && <>{renderWhenFulfilled}</>}
    </div>
  );
};

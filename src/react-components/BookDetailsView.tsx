import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { NavLink } from 'react-router-dom';
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
            <h1 className='books-title'>{bookToDisplay.attributes.title}</h1>
            <h3 className='books-author'>{bookToDisplay.attributes.author}</h3>
            <p className='books-genre-isbn'>{bookToDisplay.attributes.genre} • ISBN {bookToDisplay.attributes.isbn}</p>
            <h3>About</h3>
            <p className='books-desc'>{bookToDisplay.attributes.description}</p>
          </div>
          <div className="books-buttons-container">
            <button>Checkout Book</button>
            <button>Book Not Here</button>
            <NavLink to={`/libraries/${currentLibraryId}`}>
              <button className="books-return">Return to Library</button>
            </NavLink>
          </div>
        </div>
      </>
  };

  return (
    <div>
      {booksDetails.loading && <div>Loading...</div>}
      {!booksDetails.loading && booksDetails.error || !bookToDisplay && <div><ErrorView error={booksDetails.error} /></div>}
      {!booksDetails.loading && booksDetails.books.length && bookToDisplay && <>{renderWhenFulfilled}</>}
    </div>
  );
};

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchBooks, removeBook } from "../redux/books";
import { fetchLibraries } from '../redux/libraryIndex';
import { ErrorView } from './ErrorView';
import '../styles/bookDetailsView.css';

export const BookDetailsView = ({ currentBookId, currentLibraryId }: {currentBookId: number, currentLibraryId: number}) => {
  const booksDetails = useAppSelector(state => state.books);
  const libraryDetails = useAppSelector(state => state.libraryIndex);
  const history = useHistory();
  const dispatch = useAppDispatch();
  let renderWhenFulfilled, toRender;

  const bookToDisplay = booksDetails.books.find(book => book.id === currentBookId);
  const libraryToDisplay = libraryDetails.libraries.find(library => library.id === currentLibraryId);

  const parameterObject = {
    libraryId: currentLibraryId,
    bookId: currentBookId
  };

  const handleRemove = (event: any) => {
    event.preventDefault();
    dispatch(removeBook(parameterObject));
    history.push(`/libraries/${currentLibraryId}`);
  };

  useEffect(() => {
    dispatch(fetchLibraries());
    dispatch(fetchBooks(currentLibraryId));
  }, []);

  if (bookToDisplay && libraryToDisplay) {
    renderWhenFulfilled =
      <>
        <div className="books-top-container">
          <img className="books-image" src={`${bookToDisplay.attributes.book_image}`} alt="Book cover"/>
          <div className="books-details">
            <NavLink to={`/libraries/${currentLibraryId}`} style={{ color: '#684526', textDecoration: 'underline'}}>
              <p className="books-library-name">{libraryToDisplay.attributes.name}</p>
            </NavLink>
            <h1 className='books-title'>{bookToDisplay.attributes.title}</h1>
            <h3 className='books-author'>{bookToDisplay.attributes.author}</h3>
            <div className="books-isbn-genre-container">
              <p className='books-isbn'>ISBN: {bookToDisplay.attributes.isbn}</p>
              <p className='books-genre'>Genre: {bookToDisplay.attributes.genre}</p>
            </div>
          </div>
          <div className='tooltip'>
            <button className='books-remove-button tooltip' onClick={handleRemove}>Remove Book</button>
            <span className='tooltiptext'>Remove book from this library's inventory</span>
            {/* TO DO: popup message to confirm or deny remove action? */}
          </div>
        </div>
        <div className='books-bottom-container'>
            <h3>About</h3>
            <p className='books-desc'>{bookToDisplay.attributes.description}</p>
        </div>
      </>
  };

  if (booksDetails.loading) {
    toRender = <div>Loading...</div>
  } else if (booksDetails.error || !bookToDisplay) {
    toRender = <div><ErrorView error={booksDetails.error} /></div>
  } else if (booksDetails.books.length && bookToDisplay) {
    toRender = <>{renderWhenFulfilled}</>
  };

  return (
    <div>
      {toRender}
    </div>
  );
};

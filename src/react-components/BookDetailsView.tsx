import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchBooks, removeBook } from "../redux/books";
import { fetchLibraries } from '../redux/libraryIndex';
import { ErrorView } from './ErrorView';
import '../styles/bookDetailsView.css';

export const BookDetailsView = ({ currentBookId, currentLibraryId }: { currentBookId: number, currentLibraryId: number }) => {
  const books = useAppSelector(state => state.books);
  const libraryDetails = useAppSelector(state => state.libraryIndex);
  const modalRef: any = useRef(null);
  const history = useHistory();
  const dispatch = useAppDispatch();
  let renderWhenFulfilled, toRender;

  const bookToDisplay = books.books.find(book => book.id === currentBookId);
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

  const openModal = (event: any) => {
    event.preventDefault();
    modalRef.current.classList.remove('hidden')
  };

  const closeModal = (event: any) => {
    event.preventDefault();
    modalRef.current.classList.add('hidden')
  };

  useEffect(() => {
    dispatch(fetchLibraries());
    dispatch(fetchBooks(currentLibraryId));
  }, []);

  if (bookToDisplay && libraryToDisplay) {
    renderWhenFulfilled =
      <>
        <div className="books-top-container">
          <div className="books-top-left">
            <img className="books-image" src={`${bookToDisplay.attributes.book_image}`} alt="Book cover" />
            <div className="books-details">
              <NavLink to={`/libraries/${currentLibraryId}`} style={{ color: '#684526', textDecoration: 'underline' }}>
                <p className="books-library-name">{libraryToDisplay.attributes.name}</p>
              </NavLink>
              <h1 className='books-title'>{bookToDisplay.attributes.title}</h1>
              <h3 className='books-author'>{bookToDisplay.attributes.author}</h3>
              <div className="books-isbn-genre-container">
                <p className='books-isbn'>ISBN: {bookToDisplay.attributes.isbn}</p>
                <p className='books-genre'>Genre: {bookToDisplay.attributes.genre}</p>
              </div>
            </div>
          </div>
          <button className='books-remove-button' onClick={openModal}>Remove Book</button>
        </div>
        <div className='books-bottom-container'>
          <h3>About</h3>
          <p className='books-desc'>{bookToDisplay.attributes.description}</p>
        </div>
        <div ref={modalRef} className="modal-for-remove-book hidden">
          <form className="modal-content" action="/action_page.php">
            <div className="modal-text">
              <h1>Remove Book</h1>
              <p>Are you sure you want to remove this book from this library?</p>
              <div className="clearfix">
                <button type="button" onClick={closeModal} className="cancelbtn">Cancel</button>
                <button type="button" onClick={handleRemove} className="deletebtn">Remove</button>
              </div>
            </div>
          </form>
        </div>
      </>
  };

  if (books.loading) {
    toRender = <div className='loading-message'>Loading...</div>
  } else if (books.error || !bookToDisplay) {
    toRender = <div><ErrorView error={books.error} /></div>
  } else if (books.books.length && bookToDisplay) {
    toRender = <>{renderWhenFulfilled}</>
  };

  return (
    <div>
      {toRender}
    </div>
  );
};

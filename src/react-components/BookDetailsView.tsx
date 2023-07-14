import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchSpecificBooks } from "../redux/books";
import { fetchLibraries } from '../redux/libraryIndex';
import { ErrorView } from './ErrorView';

export const BookDetailsView = ({ currentBookId, currentLibraryId }: {currentBookId: number, currentLibraryId: number}) => {
  const booksDetails = useAppSelector(state => state.books);
  const libraryDetails = useAppSelector(state => state.libraryIndex);
  const dispatch = useAppDispatch();
  let renderWhenFulfilled;

  useEffect(() => {
    dispatch(fetchSpecificBooks(currentLibraryId));
    dispatch(fetchLibraries());
  }, []);

  const bookToDisplay = booksDetails.books.find(book => book.id === currentBookId);
  const libraryToDisplay = libraryDetails.libraries.find(library => library.id === currentLibraryId);

  if (bookToDisplay && libraryToDisplay) {
    renderWhenFulfilled =
      <>
        <img src={`${bookToDisplay.attributes.book_image}`} alt={`${bookToDisplay.attributes.title}`}/>
        <div>
          <p>Library: {libraryToDisplay.attributes.name}</p>
          <p>{bookToDisplay.attributes.title}</p>
          <p>{bookToDisplay.attributes.author}</p>
          <span>
            <p>{bookToDisplay.attributes.genre}</p>
            <p>{bookToDisplay.attributes.isbn}</p>
          </span>
          <p>About</p>
          <p>{bookToDisplay.attributes.description}</p>
        </div>
        <div>
          <button>Checkout Book</button>
          <button>Book Not Here</button>
          <button>Return to Libraries</button>
        </div>
      </>
  };

  return (
    <div>
      <h2>Book Details</h2>
      {booksDetails.loading && <div>Loading...</div>}
      {!booksDetails.loading && booksDetails.error && <div><ErrorView error={booksDetails.error} /></div>}
      {!booksDetails.loading && booksDetails.books.length && bookToDisplay && <>{renderWhenFulfilled}</>}
    </div>
  );
};

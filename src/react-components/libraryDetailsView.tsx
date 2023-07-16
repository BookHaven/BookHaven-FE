import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/books';
import { NavLink } from 'react-router-dom';
import { LibraryInfo } from './LibraryInfo';
import { ErrorView } from './ErrorView';

interface LibraryDetailsViewProps {
  currentLibraryId: number;
}

export const LibraryDetailsView = ({ currentLibraryId }: LibraryDetailsViewProps) => {
  const books = useAppSelector(state => state.books);
  const libraryDetails = useAppSelector(state => state.libraryIndex);
  const dispatch = useAppDispatch();
  let errorProp;

  if (libraryDetails.error) {
    errorProp = libraryDetails.error
  } else if (books.error) {
    errorProp = books.error
  };

  useEffect(() => {
    dispatch(fetchBooks(currentLibraryId))
  }, [])

  return (
    <div>
      <LibraryInfo currentLibraryId={currentLibraryId} />
      {books.loading && <div className="books-loading">Loading...</div>}
      {!books.loading && errorProp ? <div className="books-error-message"><ErrorView error={errorProp}/></div> : null}
      {!books.loading && books.books.length && !errorProp ? (
        <div className="libraryDetailsPage">
            <NavLink to={`/libraries/${currentLibraryId}/form`}>
              <button className="addBookBtn">Add a Book</button>
            </NavLink>
            <section className="books-section">
              {books.books.map(book=> (
                <NavLink to={`/libraries/${currentLibraryId}/books/${book.id}`}>
                  <article key={book.id} className="book">{book.attributes.book_image}</article>
                </NavLink>
                ))}
            </section>
        </div>
        ) : null } 
    </div>
  )
}
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
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchBooks(currentLibraryId))
  }, [])

  return (
    <div>
      <LibraryInfo currentLibraryId={currentLibraryId} />
      {books.loading && <div className="books-loading">Loading...</div>}
      {!books.loading && books.error ? <div className="books-error-message"><ErrorView error=""/></div> : null}
      {!books.loading && books.books.length ? (
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
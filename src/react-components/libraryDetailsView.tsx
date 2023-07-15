import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/books';
import { NavLink } from 'react-router-dom';
import { LibraryInfo } from './LibraryInfo';

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
      <LibraryInfo id={currentLibraryId} />
      {books.loading && <div>Loading...</div>}
      {!books.loading && books.error ? <div className="books-error-message">Error: {books.error}</div> : null}
      {!books.loading && books.books.length ? (
        <div className="libraryDetailsPage">
            <NavLink to={`/libraries/${currentLibraryId}/form`}>
              <button className="addBookBtn">Add a Book</button>
            </NavLink>
            <section>
              {books.books.map(book=> (
                <NavLink to={`/libraries/${currentLibraryId}/books/${book.id}`}>
                  <article key={book.id}>{book.attributes.book_image}</article>
                </NavLink>
                ))}
            </section>
        </div>
        ) : "Library Not Found"} 
    </div>
  )
}
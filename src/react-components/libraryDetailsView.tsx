import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/books';
import { NavLink } from 'react-router-dom';
import { LibraryInfo } from './LibraryInfo';
import { FormView } from './Form';

interface LibraryDetailsViewProps {
  currentLibraryId: number;
}

export const LibraryDetailsView = ({ currentLibraryId }: LibraryDetailsViewProps) => {
  const books = useAppSelector(state => state.books);
  const dispatch = useAppDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  useEffect(() => {
    dispatch(fetchBooks(currentLibraryId))
  }, [])

  const displayForm = () => {
    setIsFormVisible(true);
  }

  const hideForm = () => {
    setIsFormVisible(false);
  }

  return (
    <div>
      <LibraryInfo currentLibraryId={currentLibraryId} />
      {books.loading && <div className="books-loading">Loading...</div>}
      {!books.loading && books.error ? <div className="books-error-message">Error: {books.error}</div> : null}
      {!books.loading && books.books.length ? (
        <div className="libraryDetailsPage">
          {isFormVisible ? (
          <section className="form-container">
            <button className="hide-form-btn" onClick={hideForm}>Hide form</button>
            <FormView currentLibraryId={currentLibraryId} />
          </section>
          ) : (
          <button className="addBookBtn" onClick={displayForm}>Add a Book</button>
          )}
          <section className="books-section">
            {books.books.map(book=> (
              <NavLink to={`/libraries/${currentLibraryId}/books/${book.id}`}>
                <article key={book.id} className="book">{book.attributes.book_image}</article>
              </NavLink>
            ))}
          </section>
        </div>
        ) : "Library Not Found"} 
    </div>
  )
}
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/books';
import { NavLink } from 'react-router-dom';
import { LibraryInfo } from './LibraryInfo';

export const LibraryDetailsView = (libraryId: number) => {
  const books = useAppSelector(state => state.books);
  // const libraryIndex = useAppSelector(state => state.libraryIndex);
  const dispatch = useAppDispatch();

  // const getLibrary = () => {
  //   libraryIndex.libraries.find(library => library.id === libraryId)
  // }

  // const library = getLibrary();

  useEffect(() => {
    dispatch(fetchBooks(libraryId))
  }, [])

  return (
    <div>
      <LibraryInfo id={libraryId} />
      {books.loading && <div>Loading...</div>}
      {!books.loading && books.error ? <div>Error: {books.error}</div> : null}
      {!books.loading && books.books.length ? (
        <div className="libraryDetailsPage">
            <NavLink to="/form">
              <button className="addBookBtn">Add a Book</button>
            </NavLink>
            <section>
              {books.books.map(book=> (
                <NavLink to={`/libraries/${libraryId}/books/${book.id}`}>
                  <article key={book.id}>{book.attributes.book_image}</article>
                </NavLink>
                ))}
            </section>
        </div>
        ) : "Library Not Found"} 
    </div>
  )
}
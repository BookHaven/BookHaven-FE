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
  // const libraryIndex = useAppSelector(state => state.libraryIndex);
  const dispatch = useAppDispatch();

  // const getLibrary = () => {
  //   libraryIndex.libraries.find(library => library.id === libraryId)
  // }

  // const library = getLibrary();

  useEffect(() => {
    dispatch(fetchBooks(currentLibraryId))
  }, [])

  return (
    <div>
      <LibraryInfo id={currentLibraryId} />
      {books.loading && <div>Loading...</div>}
      {!books.loading && books.error ? <div>Error: {books.error}</div> : null}
      {!books.loading && books.books.length ? (
        <div className="libraryDetailsPage">
            <NavLink to="/form">
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
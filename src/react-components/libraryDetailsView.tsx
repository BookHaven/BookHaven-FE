import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/libraryDetails';
import { Link } from 'react-router-dom';
import { LibraryInfo } from './LibraryInfo';

export const LibraryDetailsView = (id: number) => {
  const libraryDetails = useAppSelector(state => state.libraryDetails);
  const libraryIndex = useAppSelector(state => state.libraryIndex);
  const dispatch = useAppDispatch();

  const getLibrary = () => {
    libraryIndex.libraries.find(library => library.id === id)
  }

  const library = getLibrary();

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  return (
    <div>
      <LibraryInfo id={id} />
      {libraryDetails.loading && <div>Loading...</div>}
      {!libraryDetails.loading && libraryDetails.error ? <div>Error: {libraryDetails.error}</div> : null}
      {!libraryDetails.loading && libraryDetails.books.length ? (
        <div className="libraryDetailsPage">
            <Link to="/form">
                <button className="addBookBtn">Add a Book</button>
            </Link>
            <ul> 
                {libraryDetails.books.map(book=> (
                <li key={book.id}>{book.attributes.book_image}</li>
                ))}
            </ul>
        </div>
        ) : "Library Not Found"} 
    </div>
  )
}
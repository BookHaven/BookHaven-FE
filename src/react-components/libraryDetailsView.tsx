import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/libraryDetails';
import { Link } from 'react-router-dom';

export const LibraryDetailsView = () => {
  const libraryDetails = useAppSelector(state => state.libraryDetails);
  const libraryIndex = useAppSelector(state => state.libraryIndex);
  const dispatch = useAppDispatch();

  const getLibrary = (id: number) => {
    return libraryIndex.libraries.find(library => library.id === id);
  }

  const library = getLibrary(1);

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  return (
    <div>
      <h2></h2>
      {libraryDetails.loading && <div>Loading...</div>}
      {!libraryDetails.loading && libraryDetails.error ? <div>Error: {libraryDetails.error}</div> : null}
      {library && !libraryDetails.loading && libraryDetails.books.length ? (
        <div className="libraryDetailsPage">
            <h1>{library.attributes.name}</h1>
            <p>{library.attributes.address.street}</p>
            <p>{library.attributes.address.city}, {library.attributes.address.state} {library.attributes.address.zip}</p>
            <p>{library.attributes.book_count} Books</p>
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
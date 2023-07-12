import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/libraryDetails';

export const LibraryDetailsView = (id: number) => {
  const libraryDetails = useAppSelector(state => state.libraryDetails);
  const libraryIndex = useAppSelector(state => state.libraryIndex);
  const dispatch = useAppDispatch();

  const getLibrary = () => {
    return libraryIndex.libraries.find(library => library.id === id);
  }

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  const library = getLibrary();

  return (
    <div>
      <h2></h2>
      {libraryDetails.loading && <div>Loading...</div>}
      {!libraryDetails.loading && libraryDetails.error ? <div>Error: {libraryDetails.error}</div> : null}
      {!libraryDetails.loading && libraryDetails.books.length ? (
        <div className="libraryDetailsPage">
            <h1>{library ? library.attributes.name : "Library Not Found"}</h1>
            <ul>
                {libraryDetails.books.map(book=> (
                <li key={book.id}>{book.attributes.book_image}</li>
                ))}
            </ul>
        </div>
        ) : null} 
    </div>
  )
}
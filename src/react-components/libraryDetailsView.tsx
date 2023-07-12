import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/libraryDetails';

export const LibraryDetailsView = () => {
  const libraryDetails = useAppSelector(state => state.libraryDetails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  return (
    <div>
      <h2></h2>
      {libraryDetails.loading && <div>Loading...</div>}
      {!libraryDetails.loading && libraryDetails.error ? <div>Error: {libraryDetails.error}</div> : null}
      {!libraryDetails.loading && libraryDetails.books.length ? (
        <ul>
          {libraryDetails.books.map(book=> (
              <li key={book.id}>{book.attributes.book_image}</li>
            ))}
        </ul>
        ) : null} 
    </div>
  )
}
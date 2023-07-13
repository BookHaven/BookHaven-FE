import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchLibraries } from '../redux/libraryIndex';
import { SingleLibrary } from './SingleLibrary';

export const LibraryIndexView = () => {
  const libraryIndex = useAppSelector(state => state.libraryIndex);
  const dispatch = useAppDispatch();
  
  const libraryCards = libraryIndex.libraries.map(library => {
    return (
      <SingleLibrary
        key={library.id}
        name={library.attributes.name}
        address={library.attributes.address}
        book_count={library.attributes.book_count}
      />
    )
  })

  useEffect(() => {
    dispatch(fetchLibraries())
  }, [])

  return (
    <div>
      <h2>List of Libraries</h2>
      {libraryIndex.loading && <div>Loading...</div>}
      {!libraryIndex.loading && libraryIndex.error ? <div>Error: {libraryIndex.error}</div> : null}
      {!libraryIndex.loading && libraryIndex.libraries.length ? (
        <ul>
          {
            libraryIndex.libraries.map(library => (
              <li key={library.id}>{library.attributes.name}</li>
            ))
          }
        </ul>
      ) : null} 
    </div>
  )
}
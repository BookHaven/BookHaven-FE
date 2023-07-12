import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchLibraries } from '../redux/libraryIndex';

export const LibraryIndexView = () => {
  const libraryIndex = useAppSelector(state => state.libraryIndex);
  const dispatch = useAppDispatch();

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
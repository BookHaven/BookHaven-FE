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
        id={library.id}
        name={library.attributes.name}
        address={library.attributes.address}
        bookCount={library.attributes.book_count}
      />
    )
  })

  useEffect(() => {
    dispatch(fetchLibraries())
  }, [])

  return (
    <div>
      <h2>All Libraries</h2>
      {libraryIndex.loading && <div>Loading...</div>}
      {/* TO DO: Refactor line 31 to render Error component instead of current error message ? */}
      {!libraryIndex.loading && libraryIndex.error ? <div>Error: {libraryIndex.error}</div> : null}
      {!libraryIndex.loading && libraryIndex.libraries.length ?
        <section className="libraries-container">{libraryCards}</section> : null} 
    </div>
  )
};
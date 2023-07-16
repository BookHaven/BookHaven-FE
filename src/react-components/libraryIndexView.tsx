import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchLibraries } from '../redux/libraryIndex';
import { SingleLibrary } from './SingleLibrary';
import { ErrorView } from './ErrorView';
import '../styles/libraryIndexView.css'

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
  });

  useEffect(() => {
    dispatch(fetchLibraries())
  }, []);

  return (
    <div>
      <h2 className='libraries-title'>All Libraries</h2>
      {libraryIndex.loading && <div className='loading-message'>Loading...</div>}
      {!libraryIndex.loading && libraryIndex.error ? <div><ErrorView error={libraryIndex.error} /></div> : null}
      {!libraryIndex.loading && libraryIndex.libraries.length ?
        <section className="libraries-container">{libraryCards}</section> : null} 
    </div>
  )
};
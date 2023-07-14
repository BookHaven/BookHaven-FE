import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchSpecificBooks } from "../redux/books";
import { ErrorView } from './ErrorView';

export const BookDetailsView = ({ currentBookId, currentLibraryId }: {currentBookId: number, currentLibraryId: number}) => {
  const booksDetails = useAppSelector(state => state.books);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSpecificBooks(currentLibraryId, currentBookId))
  })

  const bookToDisplay = booksDetails.books.find(book => book.id === currentBookId);

  return (
    <div>
      <h2>Book Details</h2>
      {booksDetails.loading && <div>Loading...</div>}
      {!booksDetails.loading && booksDetails.error && <div><ErrorView error={booksDetails.error} /></div>}

      {!booksDetails.loading && booksDetails.books.length && bookToDisplay &&
        <>
          <img src={`${bookToDisplay.attributes.book_image}`} alt={`${bookToDisplay.attributes.title}`}/>
          {/* add library name */}
          <p>${bookToDisplay.attributes.title}</p>
          <p>${bookToDisplay.attributes.author}</p>
          <span>
            <p>${bookToDisplay.attributes.genre}</p>
            <p>${bookToDisplay.attributes.isbn}</p>
          </span>
          <p>About</p>
          <p>${bookToDisplay.attributes.description}</p>
          <button>Checkout Book</button>
          <button>Book Not Here</button>
          <button>Return to Libraries</button>
        </>
      }

    </div>
  )
};

// --> do we need to fetch all data within App?

// Access that store data here using Selector hook & store in a object variable
// Use object to write return statement rendering, following wireframe
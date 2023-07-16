import { NavLink } from 'react-router-dom';
import '../styles/singleLibrary.css'

interface SingleLibraryProps {
  id: number,
  name: string,
  address: {
    street: string,
    city: string,
    state: string,
    zip: string
  },
  bookCount: number
};

export const SingleLibrary = (props: SingleLibraryProps) => {
  const { id, name, address, bookCount } = props;

  return (
  <NavLink to={`/libraries/${id}`} className='single-library-link'
    style={{textDecoration: 'none'}}>
    <div className="single-library-container">
        <div>
          <h3 className="single-library-name">{name}</h3>
          <p className="single-library-address">
            {address.street}<br/>
            {address.city}, {address.state} {address.zip}
          </p>
        </div>
        <div className="book-count">
          <p className="single-library-count">{`${bookCount}`}</p>
          <p className="single-library-count-message">books in this library</p>
        </div>
    </div>
  </NavLink>
  )
};
import { NavLink } from 'react-router-dom';
import '../styles/singleLibrary.css'

interface SingleLibraryProps {
  id: number,
  name: string,
  address: {
    street: string,
    city: string,
    state: string,
    zip: number
  },
  bookCount: number
};

export const SingleLibrary = (props: SingleLibraryProps) => {
  const { id, name, address, bookCount } = props;

  return (
    <div className="single-library-container">
      <NavLink to={`/libraries/${id}`} className='single-library-link'
        style={{ color: 'black', textDecoration: 'none'}}>{name}
      </NavLink>
      <p className="single-library-address">
        {address.street}<br/>
        {address.city}, {address.state} {address.zip}
      </p>
      <p className="single-library-count">{`${bookCount}`}</p>
      <p className="single-library-count-message">books in this library</p>
    </div>
  )
};
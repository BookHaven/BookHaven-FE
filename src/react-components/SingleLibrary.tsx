import { Link } from 'react-router-dom';

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
      <Link to={`/libraries/${id}`} className='single-library-link'>{name}</Link>
      <p className="single-library-address">
        {address.street}<br/>
        {address.city}, {address.state} {address.zip}
      </p>
      <p className="single-library-count">{`${bookCount}`}</p>
      <p>books in this library</p>
    </div>
  )
};
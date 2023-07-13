import { Link } from 'react-router-dom';

interface SingleLibraryProps {
  id: number,
  name: string,
  address: {
    street: string,
    city: string,
    state: string
  },
  bookCount: number
};

export const SingleLibrary = (props: SingleLibraryProps) => {
  const { id, name, address, bookCount } = props;

  return (
    <div className="single-library-container">
      <Link to={`/libraries/${id}`}>{name}</Link>
      <p className="single-library-address">
        {address.street}<br/>
        {address.city}, {address.state}
      </p>
      <p className="single-library-count">{`${bookCount} books available`}</p>
    </div>
  )
};
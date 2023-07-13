interface SingleLibraryProps {
  name: string,
  address: {
    street: string,
    city: string,
    state: string
  },
  bookCount: number
};

export const SingleLibrary = (props: SingleLibraryProps) => {
  const { name, address, bookCount } = props;

  return (
    <div className="single-library-container">
      {/* TO DO: add NavLink to Details page */}
      <h3 className="single-library-name">{name}</h3>
      <p className="single-library-address">
        {address.street}<br/>
        {address.city}, {address.state}
      </p>
      <p className="single-library-count">{`${bookCount} books available`}</p>
    </div>
  )
};
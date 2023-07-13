export const SingleLibrary = ({ name, address, bookCount }) => {
  return (
    <div className="single-library-container">
      {/* TO DO: add NavLink to Details page */}
      <h3 className="single-library-name">{name}</h3>
      <p className="single-library-address">{address}</p>
      <p className="single-library-count">{`${bookCount} books available`}</p>
    </div>
  )
}
export const BookDetailsView = ({ currentBook, currentLibrary }) => {
  return (
    <h2>Book Details</h2>
  )
};

// In App Route, use match.params to identify libraryID + bookID
// Pass selected library/book combo to this component via props
// --> do we need to fetch all data within App?

// Need 'Books' endpoint data added to redux store (aka our state)
// --> Write that fetch request, import here & call using Effect/Dispatch hooks
// Access that store data here using Selector hook & store in a object variable

// Use object to write return statement rendering, following wireframe
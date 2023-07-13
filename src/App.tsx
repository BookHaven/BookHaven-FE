import { Route, Switch } from 'react-router-dom';
import './App.css';
import { LibraryIndexView } from './react-components/libraryIndexView';
import { LibraryDetailsView } from './react-components/libraryDetailsView';
import { BookDetailsView } from './react-components/BookDetailsView';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="header">Book Haven</h1>
      <Switch>
        <Route exact path='/' />
        <Route exact path='/libraries' component={LibraryIndexView} />
        <Route path='/libraries/:id' component={LibraryDetailsView} />
        <Route path='/libraries/:id/form' />
        <Route exact path='/libraries/:id/books/:book_id' render={({match}) => {
          const currentBook = match.params.book_id;
          const currentLibrary = match.params.id;
          return <BookDetailsView currentBook={currentBook} currentLibrary={currentLibrary}/> }}
        />
      </Switch>
    </div>
  )
}

export default App;

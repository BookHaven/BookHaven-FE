import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { LibraryIndexView } from './react-components/libraryIndexView';
import { LibraryDetailsView } from './react-components/libraryDetailsView';
import { LandingView } from './react-components/LandingView';
import { BookDetailsView } from './react-components/BookDetailsView';
// import { FormView } from './react-components/Form';
import { ErrorView } from './react-components/ErrorView';
import Header from './react-components/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={LandingView}/>
        <Route exact path='/libraries' component={LibraryIndexView} />
        <Route exact path='/libraries/:id' render={({match}) => {
          const currentLibrary = parseInt(match.params.id);
          return <LibraryDetailsView currentLibraryId={currentLibrary}/> }}
        />

        {/* <Route exact path='/libraries/:id/form' render={({match}) => {
          const currentLibrary = parseInt(match.params.id);
          return <FormView currentLibraryId={currentLibrary}/> }}/> */}

        <Route exact path='/libraries/:id/books/:book_id' render={({match}) => {
          const currentBook = parseInt(match.params.book_id)
          const currentLibrary = parseInt(match.params.id);
          return <BookDetailsView currentBookId={currentBook} currentLibraryId={currentLibrary}/> }}
        />
        <Route path='/*' render={() => <ErrorView error=""/> }/>
      </Switch>
    </div>
  )
};

export default App;

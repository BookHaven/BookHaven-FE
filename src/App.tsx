import React from 'react';
import './App.css';
import { LibraryIndexView, LibraryDetailsView } from './react-components/libraryIndexView';

function App() {
  return (
    <div className="App">
      <h1>Book Haven</h1>
      <LibraryIndexView />
      <LibraryDetailsView />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { LibraryIndexView } from './react-components/libraryIndexView';
import { LibraryDetailsView } from './react-components/libraryDetailsView';

function App() {
  return (
    <div className="App">
      <h1 className="header">Book Haven</h1>
      <LibraryIndexView />
      <LibraryDetailsView />
    </div>
  );
}

export default App;

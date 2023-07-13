import React from 'react';
import './App.css';
import { LibraryIndexView } from './react-components/libraryIndexView';
import { LibraryDetailsView } from './react-components/libraryDetailsView';
import { Route, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1 className="header">Book Haven</h1>
      <NavLink to="/libraries" className="nav">View Libraries</NavLink>
      <LibraryIndexView />
      <LibraryDetailsView />
    </div>
  );
}

export default App;

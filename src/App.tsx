import { Route, Switch, NavLink } from 'react-router-dom';
import './App.css';
import { LibraryIndexView } from './react-components/libraryIndexView';
import { LibraryDetailsView } from './react-components/libraryDetailsView';


const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="header">Book Haven</h1>
      <NavLink to="/libraries" className="nav">View Libraries</NavLink>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/libraries' component={LibraryIndexView} />
        <Route path='/libraries/:id' component={LibraryDetailsView} />
      </Switch>
    </div>
  )
}

export default App;

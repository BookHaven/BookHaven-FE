import { Link } from "react-router-dom";
import '../styles/errorView.css';
import { NavLink, useHistory } from 'react-router-dom';

export const ErrorView = ({ error }: {error: string}) => {
  let displayedError;

  if (error.length > 0) {
    // TO DO: update error message text
    displayedError = "We seem to be having technical issues. Please try again later."
  } else {
    displayedError = "We can't seem to find the page you're looking for. You can head over to our homepage or recheck if you used the right address."
    displayErrorImage = <img src="/404.png" alt="404"/> 
  }

  const history = useHistory();

  const returnToHome = () => {
    history.push(`/`);
  }

return (
 <>
    <div className="error-container">
      <div className="error-foreground">
        <div className="error-text">
          <img src="/404.png" alt="404" className="error-title"/> 
          <h1 className="error-title">Oops, sorry!</h1>
          <p className="error-desc">{displayedError}</p>  
          <button className="return-to-books-btn" onClick={returnToHome}>Return to Home</button>
        </div>
        <img src="/library.png" alt="Free Library" className="library-image"/>
      </div>
      <img src="/grass.png" alt="Grass" className="grass-image"/> 
    </div>
  </> 
  )
  // return <p className="error-message">{displayedError}</p>
};


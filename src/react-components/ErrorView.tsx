import '../styles/errorView.css';
import { NavLink, useHistory } from 'react-router-dom';

export const ErrorView = ({ error }: { error: string }) => {
  let displayedError, displayedErrorImage;

  if (error.length > 0) {
    displayedError = "We seem to be having technical issues. Please try again later.";
    displayedErrorImage = <img src='/503.png' alt="503" />;
  } else {
    displayedError = "We can't seem to find the page you're looking for. You can head over to our homepage or recheck if you used the right address.";
    displayedErrorImage = <img src="/404.png" alt="404" />;
  };

  const history = useHistory();

  const returnToHome = () => {
    history.push(`/`);
  };

  return (
    <>
      <div className="error-container">
        <div className="error-foreground">
          <div className="error-text">
            {displayedErrorImage}
            <h1 className="error-title">Oops, sorry!</h1>
            <p className="error-desc">{displayedError}</p>
            <button className="error-button" onClick={returnToHome}>Return to Home</button>
          </div>
          <img src="/library.png" alt="Free Library" className="library-image" />
        </div>
        <img src="/grass.png" alt="Grass" className="grass-image" />
      </div>
    </>
  )
};


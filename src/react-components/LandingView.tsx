import { Link } from "react-router-dom";
import '../styles/landingView.css';

export const LandingView = () => {
  return (
    <>
      <div className="landing-container">
        <div className="landing-foreground">
          <div className="landing-text">
            <h1 className="landing-title">Find a Book, Share a Book</h1> 
            <p className="landing-desc">BookHaven brings together book lovers and book sharers. Find a book you want to read, and borrow it from a library near you.</p>  
            <Link to={'/libraries'} className="landing-button">See All Libraries</Link>
          </div>
          <img src="/library.png" alt="Free Library" className="library-image"/>
        </div>
        <img src="/grass.png" alt="Grass" className="grass-image"/> 
      </div>
    </>
  )
};


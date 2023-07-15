import { Link } from "react-router-dom";
import Header from './Header';

export const LandingView = () => {
  return (
    <>
      {/* Add background image */}
      <Header />
      <Link to={'/libraries'} className="landing-button">See All Libraries</Link>
    </>
  )
};
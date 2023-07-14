import { Link } from "react-router-dom";

export const LandingView = () => {
  return (
    <>
      {/* Add background image */}
      <Link to={'/libraries'} className="landing-button">View Libraries</Link>
    </>
  )
};
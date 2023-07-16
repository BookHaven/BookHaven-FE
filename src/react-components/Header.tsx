import '../styles/Header.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

function Header() {
    const history = useHistory();
    const location = useLocation();
    let checkCurrentPath;

    const returntoLibraries = () => {
        history.push(`/libraries`);
    };

    if (location.pathname === '/' || location.pathname === '/libraries') {
        checkCurrentPath = null
    } else {
        checkCurrentPath = <button className="return-to-libraries-btn" onClick={returntoLibraries}>Return to Libraries</button>
    };

    return (
        <header className="header">
            <NavLink exact to="/">
                <img src="/bookhaven_logo.png" alt="BookHaven logo" className="bookhaven-logo"></img>
            </NavLink>
            {checkCurrentPath}
        </header>
    );
};

export default Header;
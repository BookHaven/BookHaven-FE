import React from "react";
import '../styles/Header.css';
import { NavLink, useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();

    const returntoLibraries = () => {
        history.push(`/libraries`);
    }

    return (
        <header className="header">
            <NavLink exact to="/">
                <img src="/bookhaven_logo.png" alt="BookHaven logo" className="bookhaven-logo"></img>
            </NavLink>
            {((window.location.pathname === '/') || (window.location.pathname === '/libraries')) ? null : <button className="return-to-libraries-btn" onClick={returntoLibraries}>Return to Libraries</button>}
        </header>
    );
};

export default Header;
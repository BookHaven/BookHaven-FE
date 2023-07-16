import React from "react";
import '../styles/Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
    let renderButton;

    return (
        <header className="header">
            <NavLink exact to="/">
                <img src="/bookhaven_logo.png" alt="BookHaven logo" className="bookhaven-logo"></img>
            </NavLink>
            <div className="return-btn-container">{renderButton}</div>
            {((window.location.pathname === '/') || (window.location.pathname === '/libraries')) ? renderButton=null : renderButton=<button className="return-to-libraries-btn">Return to Libraries</button>}
        </header>
    );
};

export default Header;
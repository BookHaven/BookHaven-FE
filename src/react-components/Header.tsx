import React from "react";
import '../styles/Header.css';
import { NavLink } from 'react-router-dom';

function Header() {

    return (
        <header className="header">
            <NavLink exact to="/">
                <img src="https://files.slack.com/files-pri/T029P2S9M-F05H7FKSV8T/bookhaven_logo.png" alt="BookHaven logo" className="bookhaven-logo"></img>
            </NavLink>
            <div className="return-btn-container">{((window.location.pathname === '/') || (window.location.pathname === '/libraries')) ? null : <button className="return-to-libraries-btn">Return to Libraries</button>}</div>
        </header>
    );
};

export default Header;
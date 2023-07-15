import React from "react";
import '../
import { NavLink } from 'react-router-dom';

function Header() {
    let renderButton;

    return (
        <header>
            <NavLink exact to="/">
                <img src="https://files.slack.com/files-pri/T029P2S9M-F05H7FKSV8T/bookhaven_logo.png" alt="BookHaven logo" className="bookhaven-logo"></img>
            </NavLink>
            <div className="return-to-libraries-btn">{renderButton}</div>
            {((window.location.pathname === '/') || (window.location.pathname === '/libraries')) ? renderButton=null : renderButton=<button>Return to Libraries</button>}
        </header>
    );
};

export default Header;
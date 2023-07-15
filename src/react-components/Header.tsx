import React from "react";
import '../react-components/Headers.css';
import { NavLink } from 'react-router-dom';

function Header() {
    let renderButton;

    return (
        <>
            <NavLink exact to="/">
                <img src="https://files.slack.com/files-pri/T029P2S9M-F05H7FKSV8T/bookhaven_logo.png" alt="BookHaven logo"></img>
            </NavLink>
            <div className="return-to-libraries-btn">{renderButton}</div>
            {((window.location.pathname === '/') || (window.location.pathname === '/libraries')) ? renderButton=null : renderButton=<button>Return to Libraries</button>}
        </>
    );
};

export default Header;
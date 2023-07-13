import React from "react";
import '../react-components/Headers.css';
import { NavLink } from 'react-router-dom';

function Header() {

    return (
        <NavLink to="/">
            <h1 className="header">Book Haven</h1>
        </NavLink>
    );
};

export default Header;
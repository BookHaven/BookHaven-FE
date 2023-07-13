import React from "react";
import '../react-components/Headers.css';
import { Route, Link } from 'react-router-dom';

function Header() {

    return (
        <Link to="/">
            <h1 className="header">Book Haven</h1>
        </Link>
    );
};

export default Header;
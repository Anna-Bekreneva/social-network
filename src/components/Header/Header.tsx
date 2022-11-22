import React from "react";
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <a className="logo" href="src/components/Header/Header#">
                <img className="logo__img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png" alt="Logo" width="150" height="70"/>
            </a>
        </header>
    )
}

export default Header;
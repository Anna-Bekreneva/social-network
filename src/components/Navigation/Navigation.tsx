import React from "react";
import './Navigation.css';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__items">
                <li className="navigation__item">
                    <NavLink className="navigation__link" to="/profile">Profile</NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink className="navigation__link" to="/dialogs">Message</NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink className="navigation__link" to="/news">News</NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink className="navigation__link" to="/music">Music</NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink className="navigation__link" to="/settings">Settings</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
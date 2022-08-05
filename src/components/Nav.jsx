import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.png'

const Nav = () => {
    return (
        <nav>
            <div className="nav__container">
                <a className="nav__left" href='/'>
                    <img src={logo} alt="" className="logo"/>
                </a>
                <div className="nav__right">
                    <a href="https://www.google.com" target="_blank" className="social__link">
                        <FontAwesomeIcon icon="fa-brands fa-instagram" />
                    </a>
                    <a href="https://www.google.com" target="_blank" className="social__link">
                        <FontAwesomeIcon icon="fa-brands fa-twitter"/>
                    </a>
                    <button className="login">Log In</button>
                    <button className="signup">Sign Up</button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

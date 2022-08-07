import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.png'
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';


const Nav = () => {

    function registerOpen() {
        document.querySelector(".App").classList += " register__open"
    }
    
    function loginOpen() {
        document.querySelector(".App").classList += " login__open"
    }

    function logout() {
        signOut(auth)
        document.querySelector(".App").classList = ("App")
    }

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
                    <button className="login__btn" onClick={loginOpen}>Log In</button>
                    <button className="signup__btn" onClick={registerOpen}>Sign Up</button>
                    <button className="profile__btn" >Profile</button>
                    <button className="logout__btn" onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

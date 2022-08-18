import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavMenu = ({ user }) => {

    let isNavOpen = false
    function navMenuOpen() {
        if (!isNavOpen) {
            document.body.classList += ' nav__menu--open'
            isNavOpen = !isNavOpen
        }
        else {
            document.body.classList.remove('nav__menu--open')
            isNavOpen = !isNavOpen
        }
    }

    function modalOpen(modal) {
        document.querySelector(".App").classList += ` ${modal}__open`
        document.body.classList.remove('nav__menu--open')
        document.querySelector(".error__register").innerHTML = ""
        document.querySelector(".error__login").innerHTML = ""
    }

    return (
        <>
        <div className="nav__menu" onClick={navMenuOpen}>
            <hr className="nav__menu--icon"></hr>
            <hr className="nav__menu--icon"></hr>
        </div>
        <div className="nav__menu--page">
            <p className="nav__menu--link" onClick={() => modalOpen('login')}>Log In</p>
            <p className="nav__menu--link" onClick={() => modalOpen('register')}>Sign Up</p>
            <a href="www.google.com" className="nav__menu--link">Instagram</a>
            <a href="www.google.com" className="nav__menu--link">Twitter</a>
        </div>
        </>
    );
}

export default NavMenu;

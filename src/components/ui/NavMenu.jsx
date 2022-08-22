import React from 'react';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../Functions'; 

const NavMenu = ({ user }) => {

    let navigate = useNavigate()

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

    function goToAccount() {
        document.body.classList.remove('nav__menu--open')
        navigate('/myaccount')
    }

    return (
        <>
        <div className="nav__menu" onClick={navMenuOpen}>
            <hr className="nav__menu--icon"></hr>
            <hr className="nav__menu--icon"></hr>
        </div>
        <div className="nav__menu--page">
            {
                !user &&
                <p className="nav__menu--link" onClick={() => modalOpen('login')}>Log In</p>
            }
            {
                !user &&
                <p className="nav__menu--link" onClick={() => modalOpen('register')}>Sign Up</p>
            }
            {
                user &&
                <p className="nav__menu--link" onClick={goToAccount}>Account</p>
            }
            {
                user &&
                <a href="/" className="nav__menu--link" onClick={logout}>Logout</a>
            }
            <a className="nav__menu--link">Instagram</a>
            <a className="nav__menu--link">Twitter</a>
        </div>
        </>
    );
}

export default NavMenu;

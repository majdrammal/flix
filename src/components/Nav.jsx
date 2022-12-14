import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import NavMenu from './ui/NavMenu';
import { logout } from '../Functions'

const Nav = () => {

    const [user, setUser] = useState()

    function modalOpen(modal) {
        document.querySelector(".App").classList += ` ${modal}__open`
        document.querySelector(".error__register").innerHTML = ""
        document.querySelector(".error__login").innerHTML = ""
    }

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
          setUser(user)
          }
      })
    }, [user]) 

    return (
        <nav>
            <div className="nav__container">
                <Link to="/" className="nav__left" >
                    <img src={logo} alt="" className="logo" />
                </Link>
                <div className="nav__right">
                    <a target="_blank" className="social__link">
                        <FontAwesomeIcon icon="fa-brands fa-instagram" />
                    </a>
                    <a target="_blank" className="social__link">
                        <FontAwesomeIcon icon="fa-brands fa-twitter"/>
                    </a>
                    {!user && <button className="login__btn" onClick={() => modalOpen('login')}>Log In</button>}
                    {!user && <button className="signup__btn" onClick={() => modalOpen('register')}>Sign Up</button>}
                    {user && <Link to="/myaccount" className="profile__btn" >Account </Link>}
                    {user && <a href="/" className="logout__btn" onClick={logout}>Logout</a>}
                    <NavMenu user={user} auth={auth}/>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

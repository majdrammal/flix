import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.png'
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';


const Nav = () => {

    const [user, setUser] = useState()
    const [loading, isLoading] = useState(true)

    function registerOpen() {
        document.querySelector(".App").classList += " register__open"
    }
    
    function loginOpen() {
        document.querySelector(".App").classList += " login__open"
    }

    function logout() {
        signOut(auth)
        setUser(null)
        document.querySelector(".App").classList = ("App")
    }

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
        //   setLoading(false)
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
                    <a href="https://www.google.com" target="_blank" className="social__link">
                        <FontAwesomeIcon icon="fa-brands fa-instagram" />
                    </a>
                    <a href="https://www.google.com" target="_blank" className="social__link">
                        <FontAwesomeIcon icon="fa-brands fa-twitter"/>
                    </a>
                    {!user && <button className="login__btn" onClick={loginOpen}>Log In</button>}
                    {!user && <button className="signup__btn" onClick={registerOpen}>Sign Up</button>}
                    {user && <Link to="/myaccount" className="profile__btn" >Account </Link>}
                    {user && <a href="/" className="logout__btn" onClick={logout}>Logout</a>}
                </div>
            </div>
        </nav>
    );
}

export default Nav;

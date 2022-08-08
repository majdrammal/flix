import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.png'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';


const Nav = () => {

    let navigate = useNavigate()
    const [user, setUser] = useState()

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
          // setLoading(false)
          if (user) {
          setUser(user)
          }
      })
    }, [user]) 

    return (
        <nav>
            <div className="nav__container">
                <a className="nav__left" >
                    <img src={logo} alt="" className="logo" onClick={() => navigate('/')}/>
                </a>
                <div className="nav__right">
                    <a href="https://www.google.com" target="_blank" className="social__link">
                        <FontAwesomeIcon icon="fa-brands fa-instagram" />
                    </a>
                    <a href="https://www.google.com" target="_blank" className="social__link">
                        <FontAwesomeIcon icon="fa-brands fa-twitter"/>
                    </a>
                    {!user && <button className="login__btn" onClick={loginOpen}>Log In</button>}
                    {!user && <button className="signup__btn" onClick={registerOpen}>Sign Up</button>}
                    {user && <button className="profile__btn" onClick={() => navigate(`/account`)}>Account</button>}
                    {user && <button className="logout__btn" onClick={logout}>Logout</button>}
                </div>
            </div>
        </nav>
    );
}

export default Nav;

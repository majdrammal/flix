import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { auth } from '../firebase-config';
import { 
  signInWithEmailAndPassword, 
} from 'firebase/auth';

const Login = () => {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    function login() {
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then(() => {
            document.querySelector(".App").classList += " logged__in"
            loginClose()
        })
        .catch(() => {
            document.querySelector(".error__login").innerHTML = "Wrong Email or Password! Please try again."
        })
    }

    function loginClose() {
        document.querySelector(".App").classList.remove("login__open")
    }

    return (
        <div id="login">
            <div className="login__container">
                <FontAwesomeIcon icon="fa-solid fa-x" className="login__closer" onClick={loginClose}/>
                <h3 className="login__title">
                    Log In to Flix!
                </h3>
                <p className="error error__login"></p>
                <form className="login__form" onKeyPress={(event) => event.key === 'Enter' && login()}>
                    <div className="form__item">
                        <label className="form__item--label">Email</label>
                        <input type="email" className="input" required onChange={(event) => setLoginEmail(event.target.value)}></input>
                    </div>
                    <div className="form__item">
                        <label className="form__item--label">Password</label>
                        <input type="password" className="input" required onChange={(event) => setLoginPassword(event.target.value)}></input>
                    </div>
                    <button type='button' className="form__submit" onClick={login}>
                        Log In
                    </button>
                </form>
                <div className="login__overlay login__overlay--loading">
                    <FontAwesomeIcon icon="fa-solid fa-spinner" />
                </div>
                <div className="login__overlay login__overlay--success">
                    You have successfully Logged In! 
                </div>
                <div className="dark__cover"></div>
            </div>
        </div>
    );
}

export default Login;

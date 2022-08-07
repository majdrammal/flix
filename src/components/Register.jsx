import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { auth } from '../firebase-config';
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged
} from 'firebase/auth';

const Register = () => {

    const [user, setUser] = useState()
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    function register() {
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((user) => {
          console.log(user)
          document.querySelector(".App").classList += " logged__in"
        })
        .catch((error) => {
          console.log(error)
        })
      }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            // setLoading(false)
            if (user) {
            setUser(user)
            }
        })
    }, []) 

    function registerClose() {
        document.querySelector(".App").classList.remove("register__open")
    }



    return (
        <div id="register">
            <div className="register__container">
                <FontAwesomeIcon icon="fa-solid fa-x" className="register__closer" onClick={registerClose}/>
                <h3 className="register__title">
                    Register to Flix!
                </h3>
                <form className="register__form">
                    <div className="form__item">
                        <label className="form__item--label">Email</label>
                        <input type="email" className="input" required onChange={(event) => setRegisterEmail(event.target.value)}></input>
                    </div>
                    <div className="form__item">
                        <label className="form__item--label">Password</label>
                        <input type="password" className="input" required onChange={(event) => setRegisterPassword(event.target.value)}></input>
                    </div>
                    <button type='button' className="form__submit" onClick={register}>
                        Register
                    </button>
                </form>
                <div className="register__overlay register__overlay--loading">
                    <FontAwesomeIcon icon="fa-solid fa-spinner" />
                </div>
                <div className="register__overlay register__overlay--success">
                    You have successfully registered to Flix! 
                </div>
                <div className="dark__cover"></div>
            </div>
        </div>
    );
}

export default Register;

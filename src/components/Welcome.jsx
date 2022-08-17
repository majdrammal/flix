import React from 'react';
import logo from '../assets/logo.png'

const Welcome = () => {
    return (
        <div className="welcome">
            Welcome to
            <img src={logo} alt="" className="welcome__logo"/>
            <div className="loading__bar--wrapper">
                <div className="loading__bar"></div>
            </div>
        </div>
    );
}

export default Welcome;

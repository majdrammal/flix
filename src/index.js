import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faSpinner, faLeftLong, faHeart, faX, faBars } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faImdb } from '@fortawesome/free-brands-svg-icons';

library.add(faTwitter, faInstagram, faMagnifyingGlass, faSpinner, faLeftLong, faImdb, faHeart, faX, faBars)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

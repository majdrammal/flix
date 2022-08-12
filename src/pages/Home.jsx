import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import Copyright from '../components/Copyright';
import SearchBar from '../components/ui/searchBar';

const Home = ({ user }) => {

    function registerOpen() {
        document.querySelector(".App").classList += " register__open"
    }
    
    function loginOpen() {
        document.querySelector(".App").classList += " login__open"
    }

    useEffect(() => {
        document.querySelector("nav").style.background = "#242424"
    }, [])

    return (
        <div id="home">
            <img src="https://wallpaperaccess.com/full/752715.jpg" alt="" className="home__bg"/>
            <div className="dark__cover"></div>
            <Nav user={user}/>
            <div className="home__main">
                <h1 className="home__main--title">
                    Search for your favorite Films &amp; TV Shows
                </h1>
                <SearchBar />
                <div className="home__main--registration">
                    {
                        !user && 
                        <>
                        <p className="home__main--login" onClick={loginOpen}>Login</p>
                        <p className="home__main--create" onClick={registerOpen}>Create an account</p>
                        </>
                    }
                </div>
            </div>
            <Copyright /> 
        </div>
    );
}

export default Home;


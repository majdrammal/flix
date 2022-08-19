import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import Copyright from '../components/Copyright';
import SearchBar from '../components/ui/searchBar';

const Home = ({ user }) => {

    function modalOpen(modal) {
        document.querySelector(".App").classList += ` ${modal}__open`
    }

    useEffect(() => {
        document.querySelector("nav").style.background = "#24242450"
        document.querySelector("body").classList.remove("remove__bg")
    }, [])


    return (
        <div id="home">
            <div className="dark__cover"></div>
            <Nav user={user} />
            <div className="home__main">
                <h1 className="home__main--title">
                    Search for your favorite Films &amp; TV Shows
                </h1>
                <SearchBar />
                <div className="home__main--registration">
                    {
                        !user && 
                        <>
                        <p className="home__main--login" onClick={() => modalOpen('login')}>Login</p>
                        <p className="home__main--create" onClick={() => modalOpen('register')}>Create an account</p>
                        </>
                    }
                </div>
            </div>
            <Copyright /> 
        </div>
    );
}

export default Home;


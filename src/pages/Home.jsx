import React from 'react';
import Nav from '../components/Nav';
import Copyright from '../components/Copyright';
import SearchBar from '../components/ui/searchBar';

const Home = () => {

    return (
        <div id="home">
            <img src="https://wallpaperaccess.com/full/752715.jpg" alt="" className="home__bg"/>
            <div className="dark__cover"></div>
            <Nav />
            <div className="home__main">
                <h1 className="home__main--title">
                    Search for your favorite Films &amp; TV Shows
                </h1>
                <SearchBar />
                <div className="home__main--registration">
                    <p className="home__main--login">Login</p>
                    <p className="home__main--create">Create an account</p>
                </div>
            </div>
            <Copyright />
        </div>
    );
}

export default Home;

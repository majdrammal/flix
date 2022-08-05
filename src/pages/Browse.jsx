import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputChildren from 'react-input-children/lib';
import Nav from '../components/Nav';
import Copyright from '../components/ui/Copyright';
import Movie from '../components/ui/Movie';

const Browse = () => {

    const { title } = useParams()
    const [searchTitle, setSearchTitle] = useState(title)
    const [moviesData, setMoviesData] = useState()
    const [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    function newSearch() {
        navigate(`/browse/${searchTitle}`)
        getMovies()
    }

    async function getMovies() {
        setLoading(true)
        const promise = await fetch(`https://www.omdbapi.com/?apikey=e9de4a78&s=${searchTitle}`)
        const { Search } = await promise.json()
        setMoviesData(Search.slice(0, 8))
        setLoading(false)
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <div id="browse">
            <Nav />
            <div className="browse__search">
            <InputChildren 
                type="text" 
                className="search__input" 
                placeholder="Search by Title..." 
                onChange={(event) => setSearchTitle(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' && newSearch()}>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="search__icon" onClick={newSearch} />
                </InputChildren>
            </div>
            <div className="movies__section">
                <p className="browse__results">
                    Showing results for: `{title}`
                </p>
                <div className="movies__container">
                {  
                    loading ? ( 
                        new Array(10).fill(0).map((_, index) => (
                            <div className="movie__skeleton" key={index}>
                                <div className="movie__img">
                                    <p className="movie__img--skeleton"></p>
                                </div>
                                <div className="movie__text">
                                    <div className="movie__title--skeleton"></div>
                                    <div className="movie__year--skeleton"></div>
                                </div>
                            </div>
                        ))
                    ) : ( moviesData.map(movie => (
                        <Movie img={movie.Poster} title={movie.Title} year={movie.Year} id={movie.imdbID}/>
                    )))
                }
                </div>
            </div>
            <Copyright />
        </div>
    );
}

export default Browse;

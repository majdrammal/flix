import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from '../components/Nav';
import Copyright from '../components/ui/Copyright';
import MovieInfo from '../components/ui/MovieInfo';
import rottenTomatoes from '../assets/rotten tomatoes.png'
import imdb from '../assets/imdb.png'
import metacritic from '../assets/metacritic.png'

const Details = () => {

    const { id } = useParams()
    const { type } = useParams()
    const [movieDetails, setMovieDetails] = useState()
    const [loading, setLoading] = useState(true)

    async function getMovieDetails() {
        setLoading(true)
        const promise = await fetch(`https://www.omdbapi.com/?apikey=e9de4a78&i=${id}`)
        const data = await promise.json()
        setMovieDetails(data)
        setLoading(false)
    }

    useEffect(() => {
        getMovieDetails()
        console.log(type)
    }, [])

    let navigate = useNavigate()

    return (
        <div id="details">
            <Nav />  
            <div className="details__container">
                <div className="back" onClick={() => navigate(-1)}>
                    <h3 className="back__text">Go Back</h3>
                    <FontAwesomeIcon icon="fa-solid fa-left-long"/>
                </div>      
                <div className="movie__details">
                    {
                     loading ? (
                            <div className="movie__details--skeleton">
                                <div className="movie__details--left">
                                    <div className="movie__details--img--skeleton"></div>
                                </div>
                                <div className="movie__details--right">
                                    <div className="movie__details--title--skeleton"></div>
                                    <div className="movie__details--year--skeleton"></div>
                                    <div className="movie__details--plot-skeleton"></div>
                                    <div className="movie__details--info--skeleton"></div>
                                    <div className="movie__details--ratings--skeleton"></div>
                                </div>
                            </div> 
                     ) : ( 
                     <>
                     <MovieInfo data={movieDetails} type={type} imdb={imdb} rotten={rottenTomatoes} meta={metacritic}/>
                     </>  
                     )     
                    }
                </div>
            </div>
            <Copyright />
        </div>
    );
}

export default Details;

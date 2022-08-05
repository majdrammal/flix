import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Movie = ({ img, title, year, id }) => {

    const [movieId, setMovieId] = useState()

    return (
        <div className="movie">
            <img src={img} alt="" className="movie__img"/>
            <div className="movie__text">
                <h2 className="movie__title">{title}</h2>
                <p className="movie__year">({year})</p>
                <div className="movie__more">
                    <a href="#" className="movie__more--text">More Details</a>
                </div>
            </div>
        </div>
    );
}

export default Movie;

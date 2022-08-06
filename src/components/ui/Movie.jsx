import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Movie = ({ img, title, year, id, type }) => {

    let navigate = useNavigate()

    return (
        <div className="movie" onClick={() => navigate(`/${type}/${id}`)}>
            <img src={img} alt="" className="movie__img"/>
            <div className="movie__text">
                <h2 className="movie__title">{title}</h2>
                <p className="movie__type">{type}</p>
                <div className="movie__more">
                    <a className="movie__more--text" onClick={() => navigate(`/${type}/${id}`)}>More Details</a>
                </div>
            </div>
        </div>
    );
}

export default Movie;

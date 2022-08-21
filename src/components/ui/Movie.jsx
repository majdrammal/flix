import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Movie = ({ img, title, id, type }) => {

    let navigate = useNavigate()

    function storeId( passedId, passedType ) {
        localStorage.setItem('id', passedId);
        localStorage.setItem('type', passedType);
        navigate(`/details`)
    }

    return (
        <div className="movie" onClick={() => storeId(id, type)}>
            <img src={img} alt="" className="movie__img"/>
            <div className="movie__text">
                <h2 className="movie__title">{title}</h2>
                <p className="movie__type">{type}</p>
                <div className="movie__more">
                    <a className="movie__more--text" onClick={() => storeId(id, type)}>More Details</a>
                </div>
            </div>
        </div>
    );
}

export default Movie;

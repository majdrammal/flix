import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Movie = ({ img, title, year, id, type }) => {

    let navigate = useNavigate()

    const [movieId, setMovieId] = useState();

    function storeId( passedId, passedType ) {
        localStorage.removeItem('id')
        localStorage.setItem('id', JSON.stringify(passedId));
        localStorage.setItem('type', JSON.stringify(passedType));
        navigate(`/details`)
    }

    return (
        <div className="movie" onClick={() => storeId(id)}>
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

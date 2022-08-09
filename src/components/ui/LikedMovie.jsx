import React from 'react';
import { useNavigate } from 'react-router-dom';

const LikedMovie = ({ id, img, title }) => {

    let navigate = useNavigate()

    function goToMovie(id) {
        localStorage.setItem('id', id)
        navigate('/details')
    }

    return (
        <div className='liked__movie' onClick={() => goToMovie(id)}>
            <img src={img} alt="" className="liked__movie--img" />
            <p className="liked__movie--title">{title}</p>
        </div>
    );
}

export default LikedMovie;

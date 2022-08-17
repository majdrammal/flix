import React from 'react';

const MovieInfoSkeleton = () => {
    return (
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
    );
}

export default MovieInfoSkeleton;

import React from 'react';

const MovieInfo = ({ data, type, imdb, rotten, meta }) => {
    return (
        <>
            <div className="movie__details--left">
                {
                    data.Poster !== 'N/A' ? <img src={data.Poster} alt="" className="movie__details--img" />
                    : <img src={"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"} alt="" className="movie__details--no-img" />
                }
                
            </div>
            <div className="movie__details--right">
                <h1 className="movie__details--title">{data.Title}</h1>
                <p className="movie__details--year">{type} | Release Date: {data.Released} | {data.Rated}</p>
                <h4 className="movie__details--plot">{data.Plot}</h4>
                <h4 className="movie__details--director">Director: {data.Director}</h4>
                <h4 className="movie__details--actors">Starring: {data.Actors}</h4>
                <h4 className="movie__details--genre">Genre: {data.Genre}</h4>
                <h4 className="movie__details--runtime">Runtime: {data.Runtime}</h4>
                <div className="ratings">
                    <p className="imdb__rating">
                        <a href={`https://www.imdb.com/title/${data.imdbID}`} className="imdb__anchor" target="_blank">
                            <img src={imdb} alt="" className="imdb__logo rating__logo" />
                            {data.imdbRating}/10
                        </a>
                    </p>
                    {
                        data.Ratings.length > 1 &&
                    <p className="rotten__rating">
                        <img src={rotten} alt="" className="rotten__logo rating__logo" />
                        {data.Ratings[1].Value}</p>
                    }
                    {
                        data.Metascore !== 'N/A' && <p className="metascore__rating">
                        <img src={meta} alt="" className="metascore__logo rating__logo" />
                        {data.Metascore}% </p>
                    }
                    
                </div>
            </div>
        </>
    );
}

export default MovieInfo;

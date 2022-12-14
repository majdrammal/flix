import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from '../components/Nav';
import Copyright from '../components/Copyright';
import MovieInfo from '../components/ui/MovieInfo';
import rottenTomatoes from '../assets/rotten tomatoes.png'
import imdb from '../assets/imdb.png'
import metacritic from '../assets/metacritic.png'
import { db } from '../firebase-config';
import { collection, getDocs, getDoc, doc, setDoc, query, where, deleteDoc } from 'firebase/firestore'
import MovieInfoSkeleton from '../components/ui/MovieInfoSkeleton';
import { getUserById } from '../Functions';

const Details = ({ user }) => {

    const id = localStorage.getItem('id')
    const type = localStorage.getItem('type')
    const [movieDetails, setMovieDetails] = useState()
    const [loading, setLoading] = useState(true)

    let isLiked = false
    function liked() {
        if (!isLiked) {
            document.querySelector(".movie__details").classList += ' like__button--clicked'
            setDoc(doc(db, 'likes', id + user.uid), {
                uid: user.uid,
                title: movieDetails.Title,
                movieId: id,
                type: type,
                poster: movieDetails.Poster
            })
            isLiked = true
        } 
        else {
            document.querySelector(".movie__details").classList.remove('like__button--clicked')
            const likeRef = doc(db, "likes", id + user.uid)
            deleteDoc(likeRef)
            isLiked = false
        }
    }

    async function getMovieDetails() {
        setLoading(true)
        const promise = await fetch(`https://www.omdbapi.com/?apikey=e9de4a78&i=${id}`)
        const data = await promise.json()
        setMovieDetails(data)
        setLoading(false)
    }

    useEffect(() => {
        getMovieDetails()
        checkIfMovieIsLiked()
        document.querySelector("#root").style.background = "./assets/root-bg.jpg";
    }, [user])

    useEffect(() => {
        document.querySelector("body").classList.remove("remove__bg")
        window.scrollTo(0, 0)
    }, [])

    let navigate = useNavigate()

    async function checkIfMovieIsLiked() {
        if (user) { 
        const likesCollectionRef = await query(
          collection(db, "likes"),
          where("uid", "==", user.uid)
        )
        const { docs } = await getDocs(likesCollectionRef)
        let likedMovies = docs.map(doc => doc.data()).filter(like => like.movieId == id)
        likedMovies.length !== 0 && ( document.querySelector(".movie__details").classList += ' like__button--clicked')
        likedMovies.length !== 0 ? isLiked = true : isLiked = false
        }
      }

    async function profilePic() {
        const currentState = await getUserById(user.uid)
        setDoc(doc(db, 'users', user.uid), {
            ... currentState,
            image: movieDetails.Poster
        })
        // REMEMBER: update profile pic for all followers as well 
    }

    return (
        <div id="details">
            <div className="dark__cover"></div>
            <Nav />  
            <div className="details__container">
                <div className="back" onClick={() => navigate(-1)}>
                    <h3 className="back__text">Go Back</h3>
                    <FontAwesomeIcon icon="fa-solid fa-left-long"/>
                </div>      
                <div className="movie__details">
                    {
                     loading ? (
                        <MovieInfoSkeleton />
                     ) : ( 
                     <>
                     <MovieInfo data={movieDetails} type={type} imdb={imdb} rotten={rottenTomatoes} meta={metacritic}/>
                     </>  
                     )     
                    }
                    {
                        user ? (
                            <>
                            <FontAwesomeIcon icon="fa-solid fa-heart" className="like__button" onClick={liked}/>
                            <p className="set__profile-pic" onClick={profilePic}>Set As Account Avatar</p>
                            </>
                            ) : (
                                <>
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

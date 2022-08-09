import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, getDocs, getDoc, doc, setDoc, query, where, updateDoc, deleteDoc } from 'firebase/firestore'
import Nav from '../components/Nav';
import Copyright from '../components/Copyright';
import test from '../assets/rotten tomatoes.png'
import LikedMovie from '../components/ui/LikedMovie';

const Account = ({ user, userInfo }) => {

    const [likedMovies, setLikedMovies] = useState()
    const [loading, setLoading] = useState(true)

    async function getLikedMovies() {
        const postCollectionRef = await query(
          collection(db, "likes"),
          where("uid", "==", user.uid)
        )
        const { docs } = await getDocs(postCollectionRef)
        setLikedMovies(docs.map(doc => doc.data()))
        setLoading(false)
    }

    getLikedMovies()

    return (
        <div id="account">
            <Nav />
            <div className="account__container">
                <div className="account__upper">
                    <div className="account__img--wrapper">
                        <img src={test} alt="" className="account__img"/>
                    </div>
                    <div className="account__details">
                        {
                            userInfo && 
                        
                        <h1 className="account__name">{userInfo.username}</h1>
                        }
                        <p className="account__status">Online</p>
                    </div>
                </div>
                <hr className="account__hr--upper"/>
                <div className="account__lower">
                    <div className="account__lower--left">
                        <div className="account__about">
                            <h2 className="account__about--title">
                                About
                            </h2>
                            <div className="account__about--para">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, totam?
                            </div>
                        </div>
                        <div className="account__likes">
                            <h2 className="account__likes--title">Likes <span className="smaller">({likedMovies.length})</span></h2>
                            <div className="account__likes--movies">
                                {   !loading &&
                                    likedMovies.slice(0,4).map(movie => {
                                        return (
                                            <LikedMovie id={movie.movieId} img={movie.poster} title={movie.title}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="account__friends">
                            <h2 className="account__friends--title">Friends</h2>
                            <div className="account__friends--added">Here</div>
                        </div>
                    </div>
                    <div className="account__lower--right">
                        <div className="account__comments">
                            <h2 className="account__comments--title">
                                Recent Comments
                            </h2>
                            <div className="comment">
                                Hey
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Copyright />
        </div>
    );
}

export default Account;

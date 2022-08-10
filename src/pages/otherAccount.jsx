import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { doc, getDoc, query, collection, getDocs, where } from 'firebase/firestore';
import Copyright from '../components/Copyright';
import Nav from '../components/Nav';
import LikedMovie from '../components/ui/LikedMovie';

const OtherAccount = () => {

    // const { id } = useParams()
    const id = localStorage.getItem('friendId')

    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(true)
    const [likedMovies, setLikedMovies] = useState()

    async function getUserById() {
        const userRef = doc(db, "users", id)
        const userSnap = await getDoc(userRef)
        setUserInfo(userSnap.data())
        const likeCollectionRef = await query(
            collection(db, "likes"),
            where("uid", "==", id)
        )
        const { docs } = await getDocs(likeCollectionRef)
        setLikedMovies(docs.map(doc => doc.data()))
        setLoading(false)
    }

    useEffect(() => {
        console.log(id)
        getUserById()
    }, [])

    return (
        <div id="account">
            <Nav />
            <div className="account__container">
                <div className="account__upper">
                    <div className="account__upper--left">
                        <div className="account__img--wrapper">
                            {
                                !loading &&
                                <img src={userInfo.image} alt="" className="account__img"/>
                            }
                        </div>
                        <div className="account__details">
                            {
                                userInfo && 
                                <h1 className="account__name">{userInfo.username}</h1>
                            }
                            {/* <p className="account__status">{userInfo.lastSeen}</p> */}
                        </div>
                    </div>
                </div>
                <div className="account__lower">
                    <div className="account__likes">
                        { loading ? 
                        (
                        <h2 className="account__likes--title">Likes <span className="smaller">(0)</span></h2>
                        )
                        :
                        (
                            <h2 className="account__likes--title">Likes <span className="smaller">({likedMovies.length})</span></h2>
                        )}
                        <div className="account__likes--movies">
                            {   !loading &&
                                likedMovies.map(movie => {
                                    return (
                                        <LikedMovie id={movie.movieId} img={movie.poster} title={movie.title}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Copyright />
        </div>
    );
}

export default OtherAccount;

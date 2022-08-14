import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { doc, getDoc, query, collection, getDocs, where } from 'firebase/firestore';
import Copyright from '../components/Copyright';
import Nav from '../components/Nav';
import LikedMovie from '../components/ui/LikedMovie';

const OtherAccount = ({ user }) => {

    

    const { username } = useParams()

    const [userImg, setUserImg] = useState()
    const [loading, setLoading] = useState(true)
    const [likedMovies, setLikedMovies] = useState()
    const [id, setId] = useState()

    async function getUserByUsername() {
        const userRef = await query(
            collection(db, "users"),
            where("username", "==", username)
        )
        const { docs } = await getDocs(userRef)
        setUserImg(docs[0]._document.data.value.mapValue.fields.image.stringValue)
        setId(docs[0]._key.path.segments[6])
        getLikes(docs[0]._key.path.segments[6])
    }

    async function getLikes(id) {
        const likeCollectionRef = await query(
            collection(db, "likes"),
            where("uid", "==", id)
        )
        const { docs}  = await getDocs(likeCollectionRef)
        setLikedMovies(docs.map(doc => doc.data()))
        setLoading(false)
    }

    useEffect(() => {
        getUserByUsername()
    }, [username])

    return (
        <div id="account">
            <Nav />
            <div className="account__container">
                <div className="account__upper">
                    <div className="account__upper--left">
                        <div className="account__img--wrapper">
                            {
                                !loading &&
                                <img src={userImg} alt="" className="account__img"/>
                            }
                        </div>
                        <div className="account__details">
                                <h1 className="account__name">{username}</h1>
                        </div>
                    </div>
                    <div className="account__upper--right">
                        <button className="follow__button">Follow</button>
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

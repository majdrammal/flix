import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, addDoc, getDocs, getDoc, doc, setDoc, query, where, updateDoc, deleteDoc } from 'firebase/firestore'
import Nav from '../components/Nav';
import Copyright from '../components/Copyright';
import LikedMovie from '../components/ui/LikedMovie';

const Account = ({ user, userInfo }) => {

    let navigate = useNavigate()


    const [likedMovies, setLikedMovies] = useState()
    const [loading, setLoading] = useState(true)
    const [profilePic, setProfilePic] = useState("https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg")
    const [friendId, setFriendId] = useState()

    async function getLikedMovies() {
        const likeCollectionRef = await query(
          collection(db, "likes"),
          where("uid", "==", user.uid)
        )
        const { docs } = await getDocs(likeCollectionRef)
        setLikedMovies(docs.map(doc => doc.data()))
        setLoading(false)
        // console.log(docs[0]._key.path.segments[6])
    }

    useEffect(() => {
        getLikedMovies()
    }, [user])

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
                            <p className="account__status">Online</p>
                        </div>
                    </div>
                    <div className="account__upper--right" onKeyPress={(event) => event.key === 'Enter' && navigate(`/user`)}>
                        <h3 className="search__friends">Search User By Id:</h3>
                        <input type="text" className="input search__friends--input" onChange={(event) => localStorage.setItem('friendId', event.target.value)}/>
                        {
                            !loading &&
                            <span className="smaller your__id">Your Id: {user.uid}</span>
                        }
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

export default Account;

import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore'
import Nav from '../components/Nav';
import Copyright from '../components/Copyright';
import LikedMovie from '../components/ui/LikedMovie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Following from '../components/ui/Following';

const Account = ({ user }) => {

    let navigate = useNavigate()

    const [likedMovies, setLikedMovies] = useState()
    const [loading, setLoading] = useState(true)
    const [otherUsername, setOtherUsername] = useState()
    const [following, setFollowing] = useState([])
    const [userInfo, setUserInfo] = useState()

    async function getLikedMovies() {
        const likeCollectionRef = await query(
          collection(db, "likes"),
          where("uid", "==", user.uid)
        )
        const { docs } = await getDocs(likeCollectionRef)
        setLikedMovies(docs.map(doc => doc.data()))
        getFollowing()
    }

    async function getFollowing() {
        if (user) { 
            const friendsCollectionRef = await query(
              collection(db, "friends"),
              where("followerUid", "==", user.uid)
            )
            const { docs } = await getDocs(friendsCollectionRef)
            setFollowing(docs.map(doc => doc.data()))
            setLoading(false)
        }
    }

    async function getUserById() {
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)
        setUserInfo(userSnap.data())
      }

    useEffect(() => {
        getLikedMovies()
        getUserById()
    }, [user])

    return (
        <div id="account">
            <Nav />
            <div className="account__container">
                <div className="account__upper">
                    <div className="account__upper--left">
                        <div className="account__img--wrapper">
                            {
                            !loading && <img src={userInfo.image} alt="" className="account__img"/>
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
                    <div className="account__upper--right" onKeyPress={(event) => event.key === 'Enter' && navigate(`/user/${otherUsername}`)}>
                        <h3 className="search__friends">Search for users:</h3>
                        <input type="text" placeholder="Search by username..." className="input search__friends--input" onChange={(event) => setOtherUsername(event.target.value)}/>
                        <div className="account__following">
                            <span className="smaller account__following--title" onClick={() => following.length !== 0 && (document.querySelector(".account__following").classList += " following__open")}>Following: {following.length}</span>
                            <div className="following__users">
                                {
                                    !loading &&
                                    following.map(user => {
                                        return (
                                            <Following user={user} />
                                        )
                                    })
                                }
                                <FontAwesomeIcon icon="fa-solid fa-x" className="following__closer" onClick={() => document.querySelector(".account__following").classList.remove("following__open")}/>
                            </div>
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

export default Account;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { query, collection, getDocs, where, setDoc, doc, deleteDoc } from 'firebase/firestore';
import Copyright from '../components/Copyright';
import Nav from '../components/Nav';
import LikedMovie from '../components/ui/LikedMovie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Following from '../components/ui/Following';

const OtherAccount = ({ user, mainUserInfo }) => {

    const { username } = useParams()

    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(true)
    const [likedMovies, setLikedMovies] = useState()
    const [id, setId] = useState()
    const [following, setFollowing] = useState([])

    async function getUserByUsername() {
        setLoading(true)
        const userRef = await query(
            collection(db, "users"),
            where("username", "==", username)
        )
        const { docs } = await getDocs(userRef)
        setUserInfo(docs.map(doc => doc.data()))
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
        getFollowing()
    }

    let isFollowed = false
    function follow() {
        if (!isFollowed) {
            document.querySelector(".follow__button").classList += ' is__followed'
            document.querySelector(".follow__button").innerHTML = "Unfollow"
            setDoc(doc(db, 'friends', id + user.uid), {
                followerUid: user.uid,
                followerUsername: mainUserInfo.username,
                followerImage: mainUserInfo.image,
                followedUid: id,
                followedUsername: username,
                followedImage: userInfo[0].image
            })
            isFollowed = true
        } 
        else {
            document.querySelector(".follow__button").classList.remove('is__followed')
            document.querySelector(".follow__button").innerHTML = "Follow"
            const friendsRef = doc(db, "friends", id + user.uid)
            deleteDoc(friendsRef)
            isFollowed = false
        }
    }

    async function checkIfUserIsFollowed() {
        if (user) { 
        const friendsCollectionRef = await query(
          collection(db, "friends"),
          where("followerUid", "==", user.uid)
        )
        const { docs } = await getDocs(friendsCollectionRef)
        let followed = docs.map(doc => doc.data()).filter(e => e.followedUid == id)
        followed.length !== 0 && ( document.querySelector(".follow__button").classList += ' is__followed')
        followed.length !== 0 && ( document.querySelector(".follow__button").innerHTML = "Unfollow")
        followed.length !== 0 ? isFollowed = true : isFollowed = false
        }
    }

    async function getFollowing() {
        if (user) { 
            const friendsCollectionRef = await query(
              collection(db, "friends"),
              where("followerUid", "==", id)
            )
            const { docs } = await getDocs(friendsCollectionRef)
            setFollowing(docs.map(doc => doc.data()))
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserByUsername()
        checkIfUserIsFollowed()
    }, [id])

    useEffect(() => {
        getUserByUsername()
        checkIfUserIsFollowed()
    }, [username])

    return (
        <div id="account">
            <Nav />
            <div className="account__container">
                <div className="account__upper">
                    <div className="account__upper--left">
                        <div className="account__img--wrapper">
                            {
                            !loading && <img src={userInfo[0].image} alt="" className="account__img"/>
                            }
                        </div>
                        <div className="account__details">
                                <h1 className="account__name">{username}</h1>
                            {
                                !loading &&  
                                <p className="account__status">Last Online: {userInfo[0].lastOnline}</p>
                            }
                        </div>
                    </div>
                    <div className="account__upper--right">
                        {
                            <button className="follow__button" onClick={follow}>Follow</button>
                        }
                        <div className="account__following account__following--other">
                            <span className="smaller account__following--title" onClick={() => following.length !== 0 && (document.querySelector(".account__following").classList += " following__open")}>Following: {following.length}</span>
                            <div className="following__users following__users--other">
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

export default OtherAccount;

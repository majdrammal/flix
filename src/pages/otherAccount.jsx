import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { query, collection, getDocs, where, setDoc, doc, deleteDoc } from 'firebase/firestore';
import Copyright from '../components/Copyright';
import Nav from '../components/Nav';
import LikedMovie from '../components/ui/LikedMovie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Following from '../components/ui/Following';
import { checkIfFollowed, getFollows, getLikes } from '../Functions';

const OtherAccount = ({ user, mainUserInfo }) => {

    const { username } = useParams()
    const [mainUsernameImage, setMainUsernameImage] = useState()

    let navigate = useNavigate()

    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(true)
    const [likedMovies, setLikedMovies] = useState()
    const [id, setId] = useState()
    const [following, setFollowing] = useState([])
    const [followed, setFollowed]= useState(false)

    async function getUserByUsername() {
        setLoading(true)
        const userRef = await query(
            collection(db, "users"),
            where("username", "==", username.toLowerCase())
        )
        const { docs } = await getDocs(userRef)
        setUserInfo(docs.map(doc => doc.data()))
        setId(docs[0]._key.path.segments[6])
        getLikedMovies(docs[0]._key.path.segments[6])
    }

    async function getLikedMovies(id) {
        setLikedMovies(await getLikes(id))
        getFollowing()
    }

    function follow() {
        if (!followed) {
            setDoc(doc(db, 'friends', id + user.uid), {
                followerUid: user.uid,
                followerUsername: mainUsernameImage[0],
                followerImage: mainUsernameImage[1],
                followedUid: id,
                followedUsername: username.toLowerCase(),
                followedImage: userInfo[0].image
            })
            setFollowed(true)
        } 
        else {
            const friendsRef = doc(db, "friends", id + user.uid)
            deleteDoc(friendsRef)
            setFollowed(false)
        }
    }

    async function checkIfUserIsFollowed() {
        let followed = await checkIfFollowed(user, user.uid, id)
        followed.length !== 0 ? setFollowed(true) : setFollowed(false)
    }

    async function getFollowing() {
        setFollowing(await getFollows(user, id))
        setLoading(false)
        if (username === mainUserInfo.username) {
            navigate('/myaccount')
        }
    }

    useEffect(() => {
            getUserByUsername()
            checkIfUserIsFollowed()
            setMainUsernameImage(localStorage.getItem('mainUserInfo'))
    }, [id, username])

    useEffect(() => {
        document.querySelector("body").classList += " remove__bg"
    }, [])

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
                                <h1 className="account__name">{username.toLowerCase()}</h1>
                            {
                                !loading &&  
                                <p className="account__status">Last Online: {userInfo[0].lastOnline}</p>
                            }
                        </div>
                    </div>
                    <div className="account__upper--right">
                        {
                            !followed ? (
                                <button className="follow__button" onClick={follow}>Follow</button>
                            )
                            :
                            (
                                <button className="follow__button is__followed" onClick={follow}>Unfollow</button>
                            )
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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Copyright from '../components/Copyright';
import LikedMovie from '../components/ui/LikedMovie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Following from '../components/ui/Following';
import { getAllUsers, getFollows, getLikes, getUserById } from '../Functions';

const Account = ({ user }) => {

    let navigate = useNavigate()

    const [likedMovies, setLikedMovies] = useState()
    const [loading, setLoading] = useState(true)
    const [otherUsername, setOtherUsername] = useState('')
    const [following, setFollowing] = useState([])
    const [userInfo, setUserInfo] = useState()
    const [options, setOptions] = useState()

    async function getLikedMovies() {
        setOptions(await getAllUsers(user))
        setLikedMovies(await getLikes(user.uid))
        getFollowing()
    }

    async function getFollowing() {
        setFollowing(await getFollows(user, user.uid))
        setLoading(false)
    }

    async function getUserDetails() {
        setUserInfo(await getUserById(user.uid))
    }

    useEffect(() => {
        getLikedMovies()
        getUserDetails()
    }, [user])

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
                        <input type="text" placeholder="Search by username..." className="input search__friends--input" onChange={(event) => setOtherUsername(event.target.value)} />
                        {
                            otherUsername !== '' &&
                            <div className="search__options">
                                {
                                    options.filter(user => user.includes(`${otherUsername.toLowerCase()}`)).slice(0,6).map(user => {
                                        return (
                                            <p className="option" onClick={() => navigate(`/user/${user}`)}>{user}</p>
                                        )
                                    })
                                }
                            </div>
                        }
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

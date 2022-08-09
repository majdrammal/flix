import React, { useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Nav from '../components/Nav';
import Copyright from '../components/Copyright';
import test from '../assets/rotten tomatoes.png'

const Account = ({ userInfo }) => {

    const [user, setUser] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            // setLoading(false)
            if (user) {
            setUser(user)
            }
          })
    }, []) 

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
                            <h2 className="account__likes--title">Likes</h2>
                            <div className="account__likes--movies">
                                Here
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

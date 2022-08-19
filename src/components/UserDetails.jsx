import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, getDoc, doc, setDoc, query, where, updateDoc, deleteDoc } from 'firebase/firestore'

const UserDetails = () => {

    const [user, setUser] = useState()
    const [username, setUsername] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
            setUser(user)      
            }
          })
    }, [user]) 

    async function addUsername(e) {
        e.preventDefault()
        const currentState = await getUserById()
        setDoc(doc(db, 'users', user.uid), {
            ... currentState,
            username: username.toLowerCase(),
            image: "https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg"
          })
          document.querySelector(".App").classList.remove("username__overlay")
    }

    async function getUserById() {
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)
        return userSnap.data()
    }

    return (
        <div id="user__details">
            <div className="user__details--container">
                <h3 className="user__details--title">
                    What Should We Call You?
                </h3>
                <form className="user__details--form">
                    <div className="form__item">
                        <label className="form__item--label">Nickname</label>
                        <input type="name"  className="input lowercase" required onChange={(event) => setUsername(event.target.value)} onKeyPress={(event) => event.key === 'Enter' && addUsername(event)}/>
                    </div>
                    <button type='button' className="form__submit" onClick={(event) => addUsername(event)}>
                        Submit
                    </button>
                </form>
                <div className="dark__cover"></div>
            </div>
        </div>
    );
}

export default UserDetails;

import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, getDoc, doc, setDoc, query, where, updateDoc, deleteDoc } from 'firebase/firestore'

const UserDetails = () => {

    const [user, setUser] = useState()
    const [username, setUsername] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            // setLoading(false)
            if (user) {
            setUser(user)      
            }
          })
    }, []) 

    async function addUsername() {
        const currentState = await getUserById()
        setDoc(doc(db, 'users', user.uid), {
            ... currentState,
            username: username
          })
          document.querySelector(".App").classList.remove("username__overlay")
    }

    async function getUserById(id) {
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)
        return userSnap.data()
      }

    return (
        <div className="user__details">
            <div className="user__details--container">
            What should we call you?
            <input type="name" onChange={(event) => setUsername(event.target.value)}/>
            <button onClick={addUsername}>Submit</button>
            </div>
        </div>
    );
}

export default UserDetails;

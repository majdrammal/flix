import React, { useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const Account = () => {

    const [user, setUser] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            // setLoading(false)
            if (user) {
            setUser(user)
            setEmail(user.email)
            }
          })
    }, []) 

    return (
        <div>
            {email}
        </div>
    );
}

export default Account;

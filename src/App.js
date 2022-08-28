import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Browse from './pages/Browse';
import Details from './pages/Details';
import Register from './components/Register';
import Login from './components/Login';
import { useState, useEffect } from 'react'
import { auth, db } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore'
import Account from './pages/Account';
import UserDetails from './components/UserDetails';
import OtherAccount from './pages/otherAccount';
import Welcome from './components/Welcome';
import { getUserById } from './Functions';

function App() {

  const [user, setUser] = useState()
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
          // setLoading(false)
          if (user) {
          setUser(user) 
          let currentState = await getUserById(user.uid)
          setUserInfo(currentState)
          localStorage.setItem('mainUserInfo', [currentState.username, currentState.image])
          setDoc(doc(db, 'users', user.uid), {
              ... currentState,
              email: user.email,
              lastOnline: new Date().toLocaleString().split(',')[0]
            })
          }
        })
  }, [user]) 

  useEffect(() => {
    document.querySelector("#root").classList += " welcome__open"
    setTimeout(() => {
    document.querySelector("#root").classList.remove("welcome__open")
    }, 2000)
  }, [])

  return (
    <Router>
      <div className="App">
        <Welcome />
        <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path='/' element={<Home user={user} />} />
            <Route path=':title' element={<Browse />} />
            <Route path='/details' element={<Details user={user} />} />
            {!user && <Route element={<Account user={user} userInfo={userInfo} />} />}
            {!user && <Route element={<OtherAccount user={user} mainUserInfo={userInfo} />} />}
            {user && <Route path='/myaccount' element={<Account user={user} userInfo={userInfo} />} />}
            {user && <Route path='/user/:username' element={<OtherAccount user={user} mainUserInfo={userInfo} />} />}
        </Routes>
        <Register />
        <Login />
        <UserDetails/>
      </div>
    </Router>
  );
}

export default App;

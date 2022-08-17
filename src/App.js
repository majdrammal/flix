import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {

  const [user, setUser] = useState()
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
      document.querySelector(".App").classList += " welcome__open"
      setTimeout(() => {
      document.querySelector(".App").classList.remove("welcome__open")
      }, 2000)
      onAuthStateChanged(auth, async (user) => {
          // setLoading(false)
          if (user) {
          setUser(user) 
          const currentState = await getUserById(user.uid)
          setDoc(doc(db, 'users', user.uid), {
              ... currentState,
              email: user.email,
              lastOnline: new Date().toLocaleString().split(',')[0]
            })
          }
        })
  }, [user]) 

  async function getUserById(id) {
    const userRef = doc(db, "users", id)
    const userSnap = await getDoc(userRef)
    setUserInfo(userSnap.data())
    return userSnap.data()
  }

  return (
    <Router>
      <div className="App">
        <Welcome />
        <Routes>
            <Route path='/' element={<Home user={user} />} />
            <Route path=':title' element={<Browse />} />
            <Route path='/details' element={<Details user={user} />} />
            <Route path='/myaccount' element={<Account user={user} userInfo={userInfo} />} />
            <Route path='/user/:username' element={<OtherAccount user={user} mainUserInfo={userInfo} />} />
        </Routes>
        <Register />
        <Login />
        <UserDetails/>
      </div>
    </Router>
  );
}

export default App;

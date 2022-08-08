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
import { collection, addDoc, getDocs, getDoc, doc, setDoc, query, where, updateDoc, deleteDoc } from 'firebase/firestore'
import Account from './pages/Account';
import UserDetails from './components/UserDetails';

function App() {

  const [user, setUser] = useState()

  useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
          // setLoading(false)
          if (user) {
          setUser(user)      
          setDoc(doc(db, 'users', user.uid), {
              email: user.email,
            })
          }
        })
  }, []) 

  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path=':title' element={<Browse />} />
            <Route path='/details' element={<Details />} />
            <Route path='/account' element={<Account />} />
        </Routes>
        <Register />
        <Login />
        <UserDetails />
      </div>
    </Router>
  );
}

export default App;

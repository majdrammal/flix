import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAqptUoRbHD9fYVprQo_9pJh-_fjfrr7yc",
    authDomain: "flix-database-8ae0b.firebaseapp.com",
    projectId: "flix-database-8ae0b",
    storageBucket: "flix-database-8ae0b.appspot.com",
    messagingSenderId: "1065532088889",
    appId: "1:1065532088889:web:10677cd0db1c49798fe3e8",
    measurementId: "G-CMH9HYQLCV"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

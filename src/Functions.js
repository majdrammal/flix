import { auth, db } from './firebase-config';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'

export function logout() {
    signOut(auth)
    document.querySelector(".App").classList = ("App")
}

export async function getLikes(id) {
    const likeCollectionRef = await query(
        collection(db, "likes"),
        where("uid", "==", id)
      )
      const { docs } = await getDocs(likeCollectionRef)
      return docs.map(doc => doc.data())
}

export async function getFollows(user, id) {
    if (user) {
        const friendsCollectionRef = await query(
            collection(db, "friends"),
            where("followerUid", "==", id)
          )
          const { docs } = await getDocs(friendsCollectionRef)
          return docs.map(doc => doc.data())
    }
}

export async function checkIfFollowed(user, id, otherId) {
    if (user) { 
        const friendsCollectionRef = await query(
          collection(db, "friends"),
          where("followerUid", "==", id)
        )
        const { docs } = await getDocs(friendsCollectionRef)
        return docs.map(doc => doc.data()).filter(e => e.followedUid == otherId)
    }
}

export async function getUserById(id) {
    const picRef = doc(db, "users", id)
    const picSnap = await getDoc(picRef)
    return picSnap.data()
}

// all users

export async function getAllUsers(user) {
    if (user) { 
        const allRef = await query(
          collection(db, "users")
        )
        const { docs } = await getDocs(allRef)
        return docs.map(doc => doc.data()).map(user => user.username)
    }
} 

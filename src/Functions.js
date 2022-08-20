import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';

export function logout() {
    signOut(auth)
    document.querySelector(".App").classList = ("App")
}
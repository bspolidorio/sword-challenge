// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGFqqTGd14m_nKKANhoG4gEZOZGBYK-uQ",
  authDomain: "sword-challenge-97e53.firebaseapp.com",
  projectId: "sword-challenge-97e53",
  storageBucket: "sword-challenge-97e53.appspot.com",
  messagingSenderId: "1007249153999",
  appId: "1:1007249153999:web:9d5d6f8ac0cb4157af7cba",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };

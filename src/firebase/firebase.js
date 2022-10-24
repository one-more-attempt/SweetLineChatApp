import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9DjusWlg_ysqcYBvFg4t2SxckjMIcej4",
  authDomain: "one-more-attempt.firebaseapp.com",
  databaseURL:
    "https://one-more-attempt-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "one-more-attempt",
  storageBucket: "one-more-attempt.appspot.com",
  messagingSenderId: "697975863744",
  appId: "1:697975863744:web:e83c993f8ad9e8d6da7025",
  measurementId: "G-MYRY1FLD8Q",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();

export const goToLogout = () => {
  signOut(auth);
};

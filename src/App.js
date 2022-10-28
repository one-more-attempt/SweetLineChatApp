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
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  setDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Chat from "./pages/chat/Chat";
import { PageNotFound } from "./pages/404/404";
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { auth } from "./firebase/firebase";
import { AuthContext } from "./context/AuthContext";
import { Loading } from "./components/Loading/Loading";

function App() {
  const { currentUser, loading, error } = useContext(AuthContext);

  const EntryRoute = () => {
    if (loading) return <p>loading...</p>;
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else return <Navigate to="/chat" />;
  };

  const ChatRoute = ({ children }) => {
    if (loading) return <Loading />;
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const IncorrectRoute = () => {
    if (loading) return <p>loading...</p>;
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else return <Navigate to="/chat" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<EntryRoute />} />

        <Route
          path="/chat"
          element={
            <ChatRoute>
              <Chat />
            </ChatRoute>
          }
        />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<IncorrectRoute />} />
      </Routes>
    </Router>
  );
}

export default App;

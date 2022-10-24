import { createContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, loading, error] = useAuthState(auth);
  console.log(currentUser, loading, error);
  return (
    <AuthContext.Provider value={{ currentUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

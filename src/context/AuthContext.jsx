import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate("");

  const signInAnonymous = async () => {
    try {
      const user = await signInAnonymously(auth);
      console.log(user.user);
      alert("signed in as anonymous");
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/feeds");
      alert("User created");
    } catch (error) {
      alert(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      alert("signed out");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unSubscribe();
    };
  });

  return (
    <AuthContext.Provider
      value={{ signInAnonymous, signInWithGoogle, logOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

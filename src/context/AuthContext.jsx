import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, getDoc, doc } from "firebase/firestore";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // current user is populated by the data gotten from authStateChanged...
  const [userAccountData, setUserAccountData] = useState(null); // userAccountData is generated from specific user gotten from firebase collection(Users)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const createUserDocument = async (currentUser) => {
    const docRef = doc(db, "Users", currentUser?.uid);

    const userObj = {
      uid: currentUser.uid,
      userName: currentUser.displayName,
      userEmail: currentUser.email,
      imgURL: currentUser.photoURL,
    };
    try {
      await setDoc(docRef, userObj);
      await getUserDoc(currentUser);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserDoc = async (currentUser) => {
    const docRef = doc(db, "Users", currentUser?.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserAccountData(userData);
        return;
      } else {
        createUserDocument(currentUser); //create userAccountData based of currentUser
        console.log("you should create user");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
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
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoggedIn(!!currentUser);
      setCurrentUser(currentUser);
      console.log(isLoggedIn, currentUser);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDoc(currentUser);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        logOut,
        userAccountData,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

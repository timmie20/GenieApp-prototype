import { auth, db } from "@/config/firebase";
import { signInAnonymously } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { createContext } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const signIn = async () => {
    try {
      const user = await signInAnonymously(auth);
      console.log(user.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createWishPost = (name, wishDesc) => {
    const postFormValues = {
      name: name,
      wishDesc: wishDesc,
    };

    return addDoc(collection(db, "Posts"), {
      postFormValues,
    });
  };

  return (
    <AppContext.Provider value={{ createWishPost, signIn }}>
      {children}
    </AppContext.Provider>
  );
};

import { db } from "@/config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const { userAccountData } = useContext(AuthContext);

  const createWishPost = async (wishDesc) => {
    const postContent = {
      creatorId: userAccountData?.uid,
      name: userAccountData?.userName,
      imgURL: userAccountData?.imgURL,
      wishDesc: wishDesc,
    };
    try {
      await addDoc(collection(db, "posts"), {
        ...postContent,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchPostsData = () => {
    return getDocs(collection(db, "posts"));
  };

  return (
    <AppContext.Provider value={{ createWishPost, fetchPostsData }}>
      {children}
    </AppContext.Provider>
  );
};

import { db } from "@/config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { createContext } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const createWishPost = (name, wishDesc) => {
    const postValues = {
      name: name,
      wishDesc: wishDesc,
    };

    return addDoc(collection(db, "Posts"), {
      postValues,
    });
  };

  const fetchPostsData = () => {
    return getDocs(collection(db, "Posts"));
  };

  return (
    <AppContext.Provider value={{ createWishPost, fetchPostsData }}>
      {children}
    </AppContext.Provider>
  );
};

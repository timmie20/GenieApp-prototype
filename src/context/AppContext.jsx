import { db } from "@/config/firebase";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  runTransaction,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
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
      likes: 0,
      likedBy: [],
      postTimeStamp: serverTimestamp(),
    };

    try {
      const postRef = await addDoc(collection(db, "posts"), {
        ...postContent,
      });
      await addDoc(collection(postRef, "comments"));
      console.log(postRef.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchPostsData = () => {
    return getDocs(collection(db, "posts"));
  };

  const addUserToLikedByArray = async (postRef) => {
    try {
      await updateDoc(postRef, {
        likedBy: arrayUnion({
          userId: userAccountData?.uid,
          name: userAccountData?.userName,
        }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeUserFromLikedByArray = async (postRef) => {
    try {
      await updateDoc(postRef, {
        likedBy: arrayRemove({
          userId: userAccountData?.uid,
          name: userAccountData?.userName,
        }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateLikeCount = async (isLiked, id) => {
    const postRef = doc(db, "posts", id);
    try {
      const transactionResult = await runTransaction(
        db,
        async (transaction) => {
          const postDoc = await transaction.get(postRef);
          let likesCount = postDoc.data().likes;
          if (!isLiked) {
            if (likesCount > 0) {
              likesCount -= 1;
              removeUserFromLikedByArray(postRef);
            }
          } else {
            likesCount += 1;
            addUserToLikedByArray(postRef);
          }
          transaction.update(postRef, { likes: likesCount });
          return likesCount;
        },
      );
      return transactionResult;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  return (
    <AppContext.Provider
      value={{ createWishPost, fetchPostsData, updateLikeCount }}
    >
      {children}
    </AppContext.Provider>
  );
};

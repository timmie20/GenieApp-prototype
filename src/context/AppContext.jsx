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

  const updateLikeCount = async (isLiked, postId) => {
    const postRef = doc(db, "posts", postId);
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

  const addAComment = (comment, postId) => {
    const postCollectionRef = doc(db, "posts", postId);
    const commentsCollectionRef = collection(postCollectionRef, "comments");

    const commentObj = {
      writersId: userAccountData?.uid,
      writersName: userAccountData?.userName,
      content: comment,
      imgURL: userAccountData?.imgURL,
      commentTimeStamp: serverTimestamp(),
    };
    return addDoc(commentsCollectionRef, commentObj);
  };

  return (
    <AppContext.Provider
      value={{ createWishPost, fetchPostsData, updateLikeCount, addAComment }}
    >
      {children}
    </AppContext.Provider>
  );
};

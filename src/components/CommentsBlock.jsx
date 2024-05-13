import React, { useContext, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { AppContext } from "@/context/AppContext";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import Comment from "./Comment";
import { db } from "@/config/firebase";

const CommentsBlock = ({ post, allComments, setAllComments }) => {
  const [comment, setComment] = useState("");
  const { addAComment } = useContext(AppContext);
  const [commentsUpdated, setCommentsUpdated] = useState(false);

  const writeNewComment = async (event) => {
    event.preventDefault();
    try {
      await addAComment(comment, post?.postId);
      setCommentsUpdated(true); // Set to true only once after successful addition
    } catch (error) {
      console.log(error.message);
    } finally {
      setComment("");
    }
  };

  useEffect(() => {
    if (commentsUpdated) {
      const commentsRef = collection(
        doc(db, "posts", post?.postId),
        "comments",
      );
      const unsubscribe = onSnapshot(query(commentsRef), (querySnapshot) => {
        const newComments = querySnapshot.docs.map((doc) => ({
          commentId: doc.id,
          ...doc.data(),
        }));
        console.log(newComments);
        set;
        setAllComments(newComments);
        setCommentsUpdated(false);
      });

      return () => unsubscribe();
    }
  }, [commentsUpdated]);

  return (
    <>
      <form onSubmit={writeNewComment} autoComplete="off">
        <ScrollArea className="mb-2 h-[170px] p-0">
          {allComments?.map((comment) => (
            <Comment comment={comment} key={comment?.commentId} />
          ))}
        </ScrollArea>
        <div className="flex flex-col items-end">
          <Input
            id="comments"
            placeholder="write a comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="h-7 rounded-sm"
          />
          <Button className="mt-2 py-1" variant="outline" type="submit">
            send
          </Button>
        </div>
      </form>
    </>
  );
};

export default CommentsBlock;

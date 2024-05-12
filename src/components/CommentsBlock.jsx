import React, { useContext, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { AppContext } from "@/context/AppContext";
import Comment from "./Comment";

const CommentsBlock = ({ post, allComments }) => {
  const [comment, setComment] = useState("");
  const { addAComment } = useContext(AppContext);

  const uploadComment = async (event) => {
    event.preventDefault();
    try {
      await addAComment(comment, post?.postId);
    } catch (error) {
      console.log(error.message);
    } finally {
      setComment("");
    }
  };

  return (
    <>
      <form onSubmit={uploadComment} autoComplete="off">
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

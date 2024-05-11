import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import CommentsBlock from "./CommentsBlock";

const PostWish = ({ post }) => {
  const { updateLikeCount } = useContext(AppContext);
  const { userAccountData } = useContext(AuthContext);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const isUserInList = () => {
    //checks if user is present in array and returns a booleen
    return post.likedBy.some(
      (userObject) => userObject.userId === userAccountData?.uid,
    );
  };
  console.log(isLiked);

  const handleLikeToggle = async () => {
    const newIsLiked = !isLiked;
    const newLikesCount = await updateLikeCount(newIsLiked, post?.postId);
    if (newLikesCount !== null) {
      if (newLikesCount <= 0) {
        setIsLiked(false);
      } else {
        setIsLiked(true);
      }
      setLikesCount(newLikesCount);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    const present = isUserInList();
    setIsLiked(present);
  }, []);

  return (
    <div className="flex h-fit w-full rounded-md bg-slate-200 p-4">
      <div className="w-[50px]">
        <Avatar>
          <AvatarImage
            src={!post?.imgURL ? "https://github.com/shadcn.png" : post?.imgURL}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="content flex flex-1 flex-col">
        <div className="content-head flex items-center gap-3">
          <p>{post.name}</p>
          <small>time-stamp</small>
        </div>
        <div>
          <p>{post.wishDesc}</p>
        </div>

        <div className="cta mt-4 flex gap-2">
          <Badge>Grant wish</Badge>

          <Badge onClick={handleLikeToggle}>
            {!isLiked ? "Like" : "Liked"} {likesCount > 0 && likesCount}
          </Badge>

          <Popover>
            <PopoverTrigger asChild>
              <Badge>Comment</Badge>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <CommentsBlock post={post} />
            </PopoverContent>
          </Popover>

          <Badge>Repost</Badge>
        </div>
      </div>
    </div>
  );
};

export default PostWish;

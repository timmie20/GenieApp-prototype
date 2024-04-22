import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const PostWish = ({ post }) => {
  const { postValues } = post;
  return (
    <div className="flex h-fit w-full rounded-md bg-slate-200 p-4">
      <div className="w-[50px]">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="content flex flex-1 flex-col">
        <div className="content-head flex items-center gap-3">
          <p>{postValues.name}</p>
          <small>time-stamp</small>
        </div>
        <div>
          <p>{postValues.wishDesc}</p>
        </div>

        <div className="cta mt-4 flex gap-2">
          <Badge>Grant wish</Badge>
          <Badge>Like (0)</Badge>
          <Badge>Comment</Badge>
          <Badge>Repost</Badge>
        </div>
      </div>
    </div>
  );
};

export default PostWish;

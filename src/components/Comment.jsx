import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Comment = ({ comment }) => {
  return (
    <>
      <div className="mt-2 flex items-center gap-2 p-1">
        <Avatar className="size-7">
          <AvatarImage src={comment?.imgURL} className="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-[2px]">
          <p className="text-[12px] text-gray-500">{comment?.writersName}</p>
          <small className="leading-tight">{comment?.content}</small>
        </div>
      </div>
    </>
  );
};

export default Comment;

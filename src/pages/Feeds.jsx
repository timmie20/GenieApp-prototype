import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import React from "react";

const Feeds = () => {
  return (
    <>
      <div className="w-full py-3">
        <div className="mx-auto flex h-fit w-[70%]">
          <div className="w-[50px]">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="content flex flex-1 flex-col">
            <div className="content-head flex items-center gap-3">
              <p>name</p>
              <small>time-stamp</small>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                libero veniam aliquam vel molestiae
              </p>
            </div>

            <div className="cta mt-4 flex gap-2">
              <Badge>Grant wish</Badge>
              <Badge>Like (0)</Badge>
              <Badge>Comment</Badge>
              <Badge>Repost</Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feeds;

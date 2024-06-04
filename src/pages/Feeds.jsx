import PostWish from "@/components/PostWish";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";

const Feeds = () => {
  const { fetchPostsData } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState();

  console.log("hello");

  const displayPosts = async () => {
    if (!currentUser) {
      return;
    } else {
      try {
        const querySnapShot = await fetchPostsData();
        const posts = querySnapShot.docs.map((doc) => ({
          postId: doc.id,
          ...doc.data(),
        }));
        setPosts(posts);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    displayPosts();
  }, []);

  return (
    <>
      <div className="py-3">
        {!currentUser ? (
          <h1 className="text-center text-2xl">
            Sign in above to view feed content
          </h1>
        ) : (
          <div className="mx-auto flex w-[70%] flex-col gap-4">
            {posts?.map((post) => (
              <PostWish post={post} key={post.postId} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Feeds;

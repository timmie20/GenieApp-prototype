import PostWish from "@/components/PostWish";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";

const Feeds = () => {
  const { fetchPostsData } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState();

  const displayPosts = async () => {
    if (!user) {
      return;
    } else {
      try {
        const querySnapShot = await fetchPostsData();
        const posts = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(posts);
        console.log("ran");
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
        {!user ? (
          <h1 className="text-center text-2xl">
            Sign in above to view feed content
          </h1>
        ) : (
          <div className="mx-auto flex w-[70%] flex-col gap-4">
            {posts?.map((post) => (
              <PostWish post={post} key={post.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Feeds;

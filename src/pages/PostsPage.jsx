import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreatePostForm } from "../components/ToPostForm";
import { usePosts } from "../contexts/PostsContext";
import { Post } from "../components/Post";

export const PostsPage = () => {
  const { getPosts, posts, setPosts } = usePosts();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <CreatePostForm />
      {posts.length === 0 && (
        <h2 className="text-center text-3xl font-bold dark:text-white">
          There are no available posts
        </h2>
      )}
      {posts.length > 0 &&
        posts.map((post) => (
          <Post
            data={post}
            key={post._id}
            closePost={() => setPosts(posts.filter((p) => p._id !== post._id))}
          />
        ))}
    </>
  );
};

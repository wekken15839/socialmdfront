import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreatePostForm } from "../components/ToPostForm";
import { usePosts } from "../contexts/PostsContext";
import { Post } from "../components/Post";

export const PostsPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { getPosts, posts } = usePosts();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    getPosts();
  }, [isAuthenticated]);

  isLoading && <h2>Loading...</h2>;

  return (
    <>
      <CreatePostForm />
      {posts.length === 0 && (
        <h2 className="text-center text-3xl font-bold">
          There are no available posts
        </h2>
      )}
      {posts.length > 0 &&
        posts.map((post) => <Post data={post} key={post._id} />)}
    </>
  );
};

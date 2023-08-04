import { createContext, useContext, useState } from "react";
import {
  commentPostRequest,
  createPostRequest,
  getPostsRequest,
  likePostRequest,
} from "../services/posts.service";

const postsContext = createContext();

export const usePosts = () => {
  const context = useContext(postsContext);

  if (!context) {
    return console.error("usePost must be within a PostsProvider");
  }

  return context;
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getPosts = async () => {
    try {
      const result = await getPostsRequest();
      if (result.data) return setPosts(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async (postId) => {
    try {
      const post = await likePostRequest(postId);
      const newPosts = posts.map((p) => {
        if (p._id !== postId) {
          return p;
        } else {
          return post.data;
        }
      });
      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async (data) => {
    try {
      const post = await createPostRequest(data);
      if (posts.length == 0) return setPosts(post.data);

      setPosts([post.data, ...posts.filter((p) => p._id !== post.data._id)]);
      setError();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const commentPost = async (postId, data) => {
    try {
      const result = await commentPostRequest(postId, data);
      const newPosts = posts.map((p) => {
        if (p._id !== postId) {
          return p;
        } else {
          return result.data;
        }
      });
      console.log(result.data);
      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <postsContext.Provider
      value={{
        createPost,
        getPosts,
        posts,
        setPosts,
        error,
        setError,
        likePost,
        commentPost,
      }}
    >
      {children}
    </postsContext.Provider>
  );
};

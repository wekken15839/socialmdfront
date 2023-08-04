import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreatePostForm } from "../components/CreatePostForm";
import { usePosts } from "../contexts/PostsContext";
import moment from "moment/moment";
import { IoMdClose } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { IMAGES_BASE_URL } from "../config";

import { CommentForm } from "../components/CommentForm";

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

  isLoading && <h1>Loading...</h1>;

  return (
    <>
      <CreatePostForm />
      {posts.length === 0 && (
        <h2 className="text-center text-3xl font-bold">
          There are no available posts
        </h2>
      )}
      {posts.length > 0 &&
        posts.map((post) => (
          <div
            key={post._id}
            className="max-w-2xl p-3 bg-white shadow-xl mx-auto text-base my-8 rounded-md "
          >
            <div className="flex gap-2">
              <img
                src={`${IMAGES_BASE_URL}/${post.user.photo}`}
                alt=""
                className="h-12 w-12  sm:h-14 sm:w-14 rounded-full shadow shadow-slate-600"
              />
              <div className="flex flex-col flex-1 justify-center">
                <span>{post.user.username}</span>
                <span className="text-sm">
                  {moment(post.createdAt).calendar()}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <SlOptions className="cursor-pointer" />
                <IoMdClose className="text-3xl cursor-pointer" />
              </div>
            </div>
            {post.description && <div className="my-4">{post.description}</div>}
            {post.image && (
              <div className="mt-3">
                <img
                  src={`${IMAGES_BASE_URL}/${post.image}`}
                  alt=""
                  className="w-full h-full rounded-md"
                />
              </div>
            )}
            <hr className="mt-3 " />
            <div className="flex justify-between gap-1 my-1">
              <span className="flex items-center gap-1 ml-1  sm:text-lg cursor-pointer">
                {post.likes.length} likes
              </span>
              <span className="ml-1  sm:text-lg cursor-pointer">
                {post.comments.length} comments
              </span>
            </div>
            <hr className="mt-3 " />
            <CommentForm postId={post._id} comments={post.comments} />
          </div>
        ))}
    </>
  );
};

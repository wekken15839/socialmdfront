import { useForm } from "react-hook-form";
import { usePosts } from "../contexts/PostsContext";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES_BASE_URL } from "../config";
import { createPostRequest } from "../services/posts.service";

export const CreatePostForm = () => {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { posts, error, setError, createPost } = usePosts();

  const { user, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  const normalizeString = (string) => {
    return (
      string.toString().charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    );
  };

  const onSubmit = handleSubmit(async (data) => {
    await createPost(data);
    reset();
  });

  return (
    <div className="max-w-2xl p-3 bg-white shadow-xl mx-auto text-base my-16 rounded-md">
      <div className="flex items-center gap-3">
        <img
          src={`${IMAGES_BASE_URL}/${user.photo}`}
          alt=""
          className="w-14 h-14 rounded-full shadow shadow-slate-600"
        />
      </div>
      <hr className="mt-3" />
      {error && (
        <span className="text-red-400 font-bold text-center w-full">
          {error}
        </span>
      )}
      <form action="" className="" onSubmit={onSubmit}>
        <textarea
          {...register("description", {
            maxLength: {
              value: 1000,
              message: "description max length is 1000",
            },
          })}
          className="flex-1 border border-black rounded-md mt-4 w-full h-28 pl-2 resize-none"
          placeholder={`What's on your mind, ${normalizeString(
            user.username
          )}?`}
        />
        {errors.description?.type === "maxLength" && (
          <span className="text-red-400 font-bold text-center w-full">
            {errors.description.message}
          </span>
        )}
        <div className="flex items-center">
          <input
            type="file"
            className="flex-1"
            onChange={(e) => {
              setValue("image", e.target.files[0]);
            }}
          />
        </div>
        <button className="block w-full my-3 rounded-md py-1 bg-blue-600 text-white font-bold text-2xl">
          Post
        </button>
      </form>
    </div>
  );
};

import { useForm } from "react-hook-form";
import { usePosts } from "../contexts/PostsContext";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES_BASE_URL } from "../config";
import { toCapitalizeString } from "../helpers/toCapitalizeString.helper";

export const CreatePostForm = () => {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    unregister,
    watch,
    formState: { errors },
  } = useForm();

  const { posts, error, setError, createPost } = usePosts();
  const [imagePrev, setImagePrev] = useState();
  const [imageError, setImageError] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.split("/")[0] === "image") {
      setImagePrev(URL.createObjectURL(file));
      setValue("image", e.target.files[0]);
    } else {
      unregister("image");
      setImageError("file must be an image");
    }
  };

  const { user } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    await createPost(data);
    setImagePrev();
    reset();
  });

  return (
    <div className="max-w-2xl p-3 bg-white shadow-xl mx-auto text-base my-16 rounded-md dark:bg-neutral-900">
      <div className="flex items-center gap-3">
        <img
          src={`${IMAGES_BASE_URL}/${user.photo}`}
          alt=""
          className="w-14 h-14 rounded-full shadow shadow-slate-600 object-cover"
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
            maxLength: { value: 1000, message: "comment max length is 1000" },
          })}
          className="flex-1 border border-black rounded-md mt-4 w-full h-28 pl-2 resize-none dark:bg-neutral-800 dark:text-white"
          placeholder={`What's on your mind, ${toCapitalizeString(
            user.username
          )}?`}
        />
        {errors.description?.type === "maxLength" && (
          <span className="text-red-400 font-bold text-center w-full">
            {errors.description.message}
          </span>
        )}
        <div className="flex flex-col transition-all">
          <label
            htmlFor="toPostImage"
            className="w-fit pl-2 cursor-pointer border px-2 py-1 rounded-md bg-blue-600 text-white font-bold dark:bg-blue-900 dark:border-none"
          >
            Select an image
          </label>
          {imagePrev && (
            <img
              src={imagePrev}
              className="w-40 h-40 shadow-lg block pl-2 mt-3 rounded-md"
            />
          )}
          {imagePrev && (
            <span
              className="pl-2 underline underline-offset-2 font-bold cursor-pointer"
              onClick={() => {
                unregister("image");
                setImagePrev();
              }}
            >
              Delete
            </span>
          )}
          {imageError && (
            <span className="text-red-500 font-bold">{imageError}</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="flex-1"
            id="toPostImage"
            hidden
            onChange={handleImageChange}
          />
        </div>
        <button className="block w-full my-3 rounded-md py-1 bg-blue-600 text-white font-bold text-2xl dark:bg-blue-900">
          Post
        </button>
      </form>
    </div>
  );
};

// SHIFT + CONTROL + A

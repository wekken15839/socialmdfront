import React, { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { usePosts } from "../contexts/PostsContext";
import { useForm } from "react-hook-form";
import { IMAGES_BASE_URL } from "../config";
import moment from "moment/moment";

export const ToCommentForm = ({ postId, comments }) => {
  const [isHidden, setIsHidden] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { likePost, commentPost } = usePosts();

  const onSubmit = handleSubmit(async (data) => {
    await commentPost(postId, data);
    reset();
  });

  return (
    <>
      <div className="flex my-3 justify-around text-base sm:text-lg font-semibold ">
        <div
          className={
            "flex items-center gap-3 cursor-pointer hover:font-bold select-none"
          }
          onClick={async () => {
            await likePost(postId);
          }}
        >
          <AiOutlineLike className="text-xl" />
          <span>Like</span>
        </div>
        <div
          className="flex items-center gap-3 cursor-pointer hover:font-bold select-none"
          onClick={() => setIsHidden((value) => !value)}
        >
          <FaRegCommentAlt />
          <span>Comment</span>
        </div>
      </div>
      <div className={isHidden ? "hidden" : ""}>
        {comments.length > 0 && (
          <div className="text-base sm:text-lg overflow-auto max-h-40">
            {comments.map((com) => (
              <div key={com._id} className="flex w-full gap-2 mb-3">
                <img
                  src={`${IMAGES_BASE_URL}/${com.user.photo}`}
                  alt=""
                  className="h-12 w-12 rounded-full border shadow shadow-gray-400"
                />
                <div className="flex flex-col bg-blue-50 rounded-md w-10/12 py-1 pl-2">
                  <span className="text-base font-semibold">
                    {com.user.username}
                  </span>
                  <span className="block first-letter:capitalize break-words">
                    {com.comment}
                  </span>
                  <small className="text-gray-400">
                    {moment(com.date).calendar()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
        <form
          className="flex flex-col items-end text-lg sm:text-xl"
          onSubmit={onSubmit}
        >
          <textarea
            {...register("comment", {
              required: { value: true, message: "comment is required" },
              maxLength: { value: 1000, message: "comment max length is 1000" },
            })}
            className="h-20 border border-black w-full rounded-md resize-none p-2 mt-5"
            placeholder="Write a comment"
          ></textarea>
          {errors.comment?.type === "maxLength" && (
            <span className="block text-center text-red-600 font-semibold">
              {errors.comment.message}
            </span>
          )}
          <button className="bg-blue-600 font-bold text-white w-fit px-2 py-1 mt-3 rounded-md ">
            Comment
          </button>
        </form>
      </div>
    </>
  );
};

import moment from "moment/moment";
import { IoMdClose } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { IMAGES_BASE_URL } from "../config";
import { ToCommentForm } from "./toCommentForm";
import { useState } from "react";
import { LikesPopup } from "./LikesPopup";

export const Post = ({ data, closePost }) => {
  const [isLikesPopupVisible, setIsLikesPopupVisible] = useState(false);

  return (
    <div className="max-w-2xl p-3 bg-white shadow-xl mx-auto text-base my-8 rounded-md dark:bg-neutral-900 dark:text-white post">
      <div className="flex gap-2">
        <img
          src={`${IMAGES_BASE_URL}/${data.user.photo}`}
          alt=""
          className="h-12 w-12  sm:h-14 sm:w-14 rounded-full shadow shadow-slate-600 object-cover"
        />
        <div className="flex flex-col flex-1 justify-center">
          <span className="capitalize">{data.user.username}</span>
          <span className="text-sm">{moment(data.createdAt).calendar()}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <SlOptions className="cursor-pointer" />
          <IoMdClose className="text-3xl cursor-pointer" onClick={closePost} />
        </div>
      </div>
      {data.description && (
        <div className="my-4 sm:text-lg">{data.description}</div>
      )}
      {data.image && (
        <div className="mt-3">
          <img
            src={`${IMAGES_BASE_URL}/${data.image}`}
            alt=""
            className="w-full h-full rounded-md object-cover"
          />
        </div>
      )}
      <hr className="mt-3 " />
      <div className="flex justify-between gap-1 my-1">
        <span
          className="flex items-center gap-1 ml-1  sm:text-base cursor-pointer"
          onClick={() => setIsLikesPopupVisible(true)}
        >
          {data.likes.length} likes
        </span>
        <span className="ml-1  sm:text-base cursor-pointer">
          {data.comments.length} comments
        </span>
      </div>
      <hr className="mt-3 " />
      <ToCommentForm postId={data._id} comments={data.comments} />
      {isLikesPopupVisible && (
        <LikesPopup
          isOpen={isLikesPopupVisible}
          onClose={() => setIsLikesPopupVisible(false)}
          postId={data._id}
        />
      )}
    </div>
  );
};

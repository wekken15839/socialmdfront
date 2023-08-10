import moment from "moment/moment";
import { IoMdClose } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { IMAGES_BASE_URL } from "../config";
import { ToCommentForm } from "./toCommentForm";

export const Post = ({ data }) => {
  return (
    <div className="max-w-2xl p-3 bg-white shadow-xl mx-auto text-base my-8 rounded-md ">
      <div className="flex gap-2">
        <img
          src={`${IMAGES_BASE_URL}/${data.user.photo}`}
          alt=""
          className="h-12 w-12  sm:h-14 sm:w-14 rounded-full shadow shadow-slate-600"
        />
        <div className="flex flex-col flex-1 justify-center">
          <span>{data.user.username}</span>
          <span className="text-sm">{moment(data.createdAt).calendar()}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <SlOptions className="cursor-pointer" />
          <IoMdClose className="text-3xl cursor-pointer" />
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
            className="w-full h-full rounded-md"
          />
        </div>
      )}
      <hr className="mt-3 " />
      <div className="flex justify-between gap-1 my-1">
        <span className="flex items-center gap-1 ml-1  sm:text-base cursor-pointer">
          {data.likes.length} likes
        </span>
        <span className="ml-1  sm:text-base cursor-pointer">
          {data.comments.length} comments
        </span>
      </div>
      <hr className="mt-3 " />
      <ToCommentForm postId={data._id} comments={data.comments} />
    </div>
  );
};

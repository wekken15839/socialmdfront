import React, { useEffect, useState } from "react";
import { IMAGES_BASE_URL } from "../config";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { getLikesRequest } from "../services/posts.service.js";

export const LikesPopup = ({ isOpen, onClose, postId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getLikesRequest(postId);
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setData([]);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <dialog
      open={isOpen}
      className={
        isOpen
          ? "bg-black bg-opacity-80 h-screen w-screen fixed top-0 left-0 flex flex-col justify-center items-center"
          : "hidden"
      }
    >
      <div className="h-96 w-72 bg-white rounded-md pb-2 overflow-auto">
        <button
          className="bg-blue-600  text-white font-semibold rounded-full block cursor-pointer ml-auto mr-2 my-2 w-6 sm:w-7 "
          onClick={onClose}
        >
          X
        </button>
        {loading ? (
          <h2 className="text-center font-bold text-2xl">Loading...</h2>
        ) : (
          (data.length > 0 &&
            data.map((like) => (
              <div key={like._id} className="flex flex-col px-2 gap-2">
                <div className="flex gap-2">
                  <div className="relative">
                    <img
                      src={`${IMAGES_BASE_URL}/${like.user.photo}`}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <AiFillLike className="absolute bottom-0 right-0 text-blue-600 text-md" />
                  </div>
                  <span className="self-center">{like.user.username}</span>
                  <a
                    href=""
                    className="bg-gray-200 px-1 self-center rounded-md font-bold flex items-center gap ml-auto"
                  >
                    <BiSolidUser />
                    Profile
                  </a>
                </div>
              </div>
            ))) || (
            <span className="text-center block text-xl font-bold">
              This post has no likes
            </span>
          )
        )}
      </div>
    </dialog>
  );
};

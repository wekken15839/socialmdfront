import React, { useEffect, useRef, useState } from "react";
import { Suspense } from "react";
import { MdSave, MdOutlineFreeCancellation } from "react-icons/md";
import UpdateProfilePopup from "../components/UpdateProfilePopup";
import { BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { IMAGES_BASE_URL } from "../config";
import { AiFillCamera } from "react-icons/ai";
import { toCapitalizeString } from "../helpers/toCapitalizeString.helper";
import { Post } from "../components/Post";
import { useForm } from "react-hook-form";
import { getMyPostsRequest } from "../services/posts.service";

export const ProfilePage = () => {
  // [x] implementar la funcionalidad del update
  // [] implementar el front-end del popup para editar el perfil
  // [] imlementar la funcionalidad del update del popup

  const navigate = useNavigate();
  const { isAuthenticated, user, update, error } = useAuth();
  const [image, setImage] = useState();
  const { reset, handleSubmit, setValue, watch } = useForm();
  const [hasChanged, setHasChanged] = useState(false);
  const [isOpenEditProfilePopup, setIsOpenEditProfilePopup] = useState(false);
  const fileInputRef = useRef(null);
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    (async () => {
      try {
        const result = await getMyPostsRequest();
        setMyPosts(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isAuthenticated]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("photo", e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setHasChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (image) {
      await update(data);
      reset();
    }
    setHasChanged(false);
  });

  const handleCancel = (e) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setImage(null);
      reset();
      setHasChanged(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl p-3 bg-white shadow-xl mx-auto text-base my-8 rounded-md relative">
        <div className="flex flex-col justify-center items-center relative">
          <div className="relative">
            <img
              src={image || `${IMAGES_BASE_URL}/${user.photo}`}
              alt=""
              className="rounded-full h-20 w-20 object-cover"
            />
            <div className="absolute -bottom-2 right-0 text-2xl">
              <label htmlFor="photo">
                <span className="bg-gray-400 p-1 inline-block rounded-full">
                  <AiFillCamera className="cursor-pointer" />
                </span>
                <input
                  id="photo"
                  hidden
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>
        {error && (
          <span className="text-red-500 font-semibold block text-center">
            {error}
          </span>
        )}
        <div className="flex w-full justify-center items-center font-bold text-xl gap-2">
          <span>
            {`${toCapitalizeString(user.firstname)} ${toCapitalizeString(
              user.lastname
            )}`}
          </span>
          <span className="text-sm cursor-pointer">
            <BsPencilFill onClick={() => setIsOpenEditProfilePopup(true)} />
          </span>
        </div>
        {hasChanged && (
          <>
            <span
              className="absolute top-2 right-16 text-2xl cursor-pointer text-blue-700 flex flex-col items-center"
              onClick={onSubmit}
            >
              <MdSave />
              <small className="text-sm">Save</small>
            </span>
            <span
              className="absolute top-2 right-3 text-2xl cursor-pointer text-gray-700 flex flex-col items-center"
              onClick={handleCancel}
            >
              <MdOutlineFreeCancellation />
              <small className="text-sm">Cancel</small>
            </span>
          </>
        )}
      </div>
      {isLoading && (
        <h1 className="text-center font-bold text-lg ">Loading Posts...</h1>
      )}
      {myPosts.map((post) => (
        <Post
          data={post}
          key={post._id}
          closePost={() =>
            setMyPosts(myPosts.filter((p) => p._id !== post._id))
          }
        />
      ))}

      <UpdateProfilePopup
        isOpen={isOpenEditProfilePopup}
        onClose={() => setIsOpenEditProfilePopup(false)}
      />
    </>
  );
};

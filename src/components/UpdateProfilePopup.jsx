import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";

const UpdateProfilePopup = ({ isOpen, onClose }) => {
  const { user, update } = useAuth();
  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch,
    register,
  } = useForm({
    defaultValues: {
      gender: null,
      firstname: null,
      lastname: null,
      username: null,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await update(data);
    reset();
  });

  return (
    <dialog
      open={isOpen}
      className={
        isOpen
          ? "bg-black bg-opacity-80 h-screen w-screen fixed top-0 left-0 flex flex-col justify-center items-center"
          : "hidden"
      }
    >
      <div className=" w-72 bg-white rounded-md pb-2 overflow-auto">
        <button
          className="bg-blue-600  text-white font-semibold rounded-full block cursor-pointer ml-auto mr-2 my-2 w-6 sm:w-7 "
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-center text-xl my-3 shadow-lg pb-3">
          Update Profile
        </h2>
        <div className="flex flex-col px-3">
          <div className="grid grid-cols-2 gap-7">
            <div>
              <label htmlFor="">firstname</label>
              <input
                {...register("firstname", {
                  maxLength: { value: 50, message: "max length is 50" },
                })}
                type="text"
                placeholder={user.firstname}
                className="border w-full pl-1 placeholder:capitalize"
              />
              {errors.firstname?.type === "maxLength" && (
                <small className="text-red-600 font-semibold ">
                  {errors.firstname.message}
                </small>
              )}
            </div>
            <div>
              <label htmlFor="">lastname</label>
              <input
                {...register("lastname", {
                  maxLength: { value: 50, message: "max length is 50" },
                })}
                type="text"
                placeholder={user.lastname}
                className="border w-full pl-1 placeholder:capitalize"
              />
              {errors.lastname && (
                <small className="text-red-500 font-semibold">
                  {errors.lastname.message}
                </small>
              )}
            </div>
            <div>
              <label htmlFor="">username</label>
              <input
                {...register("username", {
                  maxLength: { value: 12, message: `max length is 12` },
                  minLength: {
                    value: 6,
                    message: "username must have at least 6 characters",
                  },
                })}
                type="text"
                placeholder={user.username}
                className="border w-full pl-1 placeholder:capitalize"
              />
              {errors.username && (
                <span className="text-red-500 font-semibold">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="">
              <label htmlFor="" className="block">
                birthdate
              </label>
              <input
                type="date"
                {...register("birthdate", {
                  validate: (value) => {
                    if (value) {
                      const birthDate = new Date(value);
                      const actualDate = new Date();
                      const age =
                        actualDate.getFullYear() - birthDate.getFullYear();
                      return age >= 18 || "you must be of legal age";
                    }
                    return true;
                  },
                  required: false,
                })}
                className="border w-full text-center"
              />
              {errors.birthdate && (
                <span className="text-red-500">{errors.birthdate.message}</span>
              )}
            </div>
          </div>
          <div className="mt-2.5 flex flex-col justify-center items-center">
            <label htmlFor="" className="text-center block">
              gender
            </label>
            <div className="flex border py-1.5">
              <div className="cursor-pointer">
                <input
                  {...register("gender")}
                  type="radio"
                  id="maleInput"
                  value="male"
                  className="border w-full pl-1 placeholder:capitalize cursor-pointer"
                />
                <label htmlFor="maleInput" className="cursor-pointer">
                  male
                </label>
              </div>
              <div>
                <input
                  {...register("gender")}
                  type="radio"
                  id="femaleInput"
                  value="female"
                  className="border w-full pl-1 placeholder:capitalize cursor-pointer"
                />
                <label htmlFor="femaleInput" className="cursor-pointer">
                  female
                </label>
              </div>
            </div>
          </div>
        </div>
        {isDirty && (
          <div className="flex justify-center mt-3 gap-4">
            <button
              className="text-center bg-blue-600 text-white font-bold rounded-md px-2 py-0.5 text-lg"
              onClick={onSubmit}
            >
              Save changes
            </button>
            <button
              className="text-center bg-blue-600 text-white font-bold rounded-md px-2 py-0.5 text-lg"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </button>
          </div>
        )}
        {/* <h1 className="text-center animate-pulse font-bold">
          This option not implemented yet
        </h1> */}
      </div>
      {/* <span className="mt-5">{JSON.stringify(watch())}</span> */}
    </dialog>
  );
};

export default UpdateProfilePopup;

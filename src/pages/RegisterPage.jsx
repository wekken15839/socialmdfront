import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const RegisterPage = () => {
  const {
    error,
    isAuthenticated,
    register: registerAuth,
    setError,
  } = useAuth();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/posts");
    }
    setError();
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    await registerAuth(data);
  });

  return (
    <>
      <div className="form_container bg-white rounded-md max-w-xl sm:mx-auto py-5">
        <div className="w-full">
          <h2 className="text-center font-bold text-3xl">Sign up</h2>
          <span className="block text-center">it's quick and easy</span>
        </div>
        <div className="h-32">
          {error && (
            <span className="inline-block text-center w-fulll text-red-400 font-bold">
              {error}
            </span>
          )}
        </div>
        <form
          className="flex flex-col flex-wrap text-lg py-1 px-2 sm:px-8 gap-2"
          onSubmit={onSubmit}
        >
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <input
                placeholder="First name"
                type="text"
                {...register("firstname", {
                  required: { value: true, message: "required" },
                  maxLength: { value: 50, message: "max length is 50" },
                })}
                className="border bg-gray-200 pl-1 rounded-md border-black"
              />
              {errors.firstname?.type === "required" && (
                <small className="text-red-600 font-bold ">
                  {errors.firstname.message}
                </small>
              )}
              {errors.firstname?.type === "maxLength" && (
                <small className="text-red-600 font-bold ">
                  {errors.firstname.message}
                </small>
              )}
            </div>
            <div className="flex flex-col">
              <input
                placeholder="Last name"
                type="text"
                {...register("lastname", {
                  required: { value: true, message: "required" },
                  maxLength: { value: 50, message: "max length is 50" },
                })}
                className="border bg-gray-200 pl-1 rounded-md border-black"
              />
              {errors.lastname?.type === "required" && (
                <small className="text-red-600 font-bold ">
                  {errors.lastname.message}
                </small>
              )}
            </div>
            <div className="flex flex-col">
              <input
                placeholder="Username"
                type="text"
                {...register("username", {
                  required: { value: true, message: "required" },
                  maxLength: { value: 12, message: `max length is 12` },
                  minLength: {
                    value: 6,
                    message: "username must have at least 6 characters",
                  },
                })}
                className="border bg-gray-200 pl-1 rounded-md border-black"
              />
              {errors.username?.type === "required" && (
                <small className="text-red-600 font-bold ">
                  {errors.username.message}
                </small>
              )}
              {errors.username?.type === "minLength" && (
                <small className="text-red-600 font-bold ">
                  {errors.username.message}
                </small>
              )}
            </div>
            <div className="flex flex-col">
              <input
                placeholder="Email address"
                type="email"
                {...register("email", {
                  required: { value: true, message: "required" },
                  maxLength: { value: 50, message: "max length is 50" },
                })}
                className="border bg-gray-200 pl-1 rounded-md border-black"
              />
              {errors.email?.type === "required" && (
                <small className="text-red-600 font-bold ">
                  {errors.email.message}
                </small>
              )}
            </div>
            <div className="flex flex-col">
              <input
                placeholder="New password"
                type="text"
                {...register("password", {
                  required: { value: true, message: "required" },
                  maxLength: { value: 50, message: "max length is 50" },
                  minLength: { value: 6, message: "password too short" },
                })}
                className="border bg-gray-200 pl-1 rounded-md border-black"
              />
              {errors.password?.type === "required" && (
                <small className="text-red-600 font-bold ">
                  {errors.password.message}
                </small>
              )}
              {errors.password?.type === "minLength" && (
                <small className="text-red-600 font-bold ">
                  {errors.password.message}
                </small>
              )}
              {errors.password?.type === "maxLength" && (
                <small className="text-red-600 font-bold ">
                  {errors.password.message}
                </small>
              )}
            </div>
            <div className="flex flex-col ">
              <input
                placeholder="Confirm password"
                type="password"
                {...register("confirmPassword", {
                  required: { value: true, message: "required" },
                  validate: (value) =>
                    value === watch().password || "passwords doesn't match",
                })}
                className="border bg-gray-200 pl-1 rounded-md border-black"
              />
              {errors.confirmPassword?.type === "required" && (
                <span className="text-red-600 font-bold">
                  {errors.confirmPassword.message}
                </span>
              )}
              {errors.confirmPassword && (
                <small className="text-red-600 font-bold ">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>
            <div className="flex flex-col pl-1 border h-fit rounded-md border-black ">
              <select
                {...register("gender", {
                  required: { value: true, message: "required" },
                })}
                className="border-none outline-none"
              >
                <option value={""}>Select an option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <span className="text-red-600 font-bold">
                  {errors.gender.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="date"
                {...register("birthdate", {
                  required: { value: true, message: "required" },
                  validate: (value) => {
                    const birthDate = new Date(value);
                    const actualDate = new Date();
                    const age =
                      actualDate.getFullYear() - birthDate.getFullYear();
                    return age >= 18 || "you must be of legal age";
                  },
                })}
                className="border border-black bg-gray-200 pl-1 rounded-md w-full"
              />
              {errors.birthdate && (
                <small className="text-red-600 font-bold ">
                  {errors.birthdate.message}
                </small>
              )}
            </div>
          </div>

          <button className="block text-center mx-auto bg-green-500 text-white font-bold rounded-md mt-5 px-2 py-1 text-2xl">
            Sign up
          </button>
          <div>
            <small className="text-end w-full block text-blue-500">
              <Link to={"/login"} className="underline underline-offset-4">
                have an account? Login
              </Link>
            </small>
          </div>
        </form>
      </div>
      <div>{JSON.stringify(watch())}</div>
    </>
  );
};

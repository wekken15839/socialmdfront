import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export const LoginPage = () => {
  const { isAuthenticated, setError, error, login } = useAuth();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/posts");
    }
    setError();
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    await login(data);
  });

  return (
    <>
      <div className="form_container bg-white rounded-md max-w-2xl mx-2  sm:mx-auto py-5">
        <h1 className="text-center font-bold text-3xl mb-5">Login</h1>
        {error && (
          <span className="inline-block text-red-400 font-bold text-center w-full">
            {error}
          </span>
        )}
        <form
          className="flex flex-col p-3 items-center gap-3 text-xl"
          onSubmit={onSubmit}
        >
          <div>
            <div className="text-xl">
              <label htmlFor="email" className="pl-9 cursor-pointer">
                Email
              </label>
              <div className="flex gap-3">
                <div className="flex justify-center items-center">
                  <FaUserAlt className="" />
                </div>
                <input
                  className="rounded-md h-10 border pl-3 bg-blue-100"
                  placeholder="example@gmail.com"
                  type="text"
                  id="email"
                  {...register("email", {
                    required: { value: true, message: "email is required" },
                    maxLength: {
                      value: 100,
                      message: "email cannot have more than 100 characters",
                    },
                  })}
                />
              </div>
              {errors.email?.type == "required" && (
                <span className="text-red-400 pl-9 font-bold">
                  {errors.email.message}
                </span>
              )}
              {errors.email?.type == "maxLength" && (
                <span className="text-red-400 pl-9 font-bold">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="text-xl">
              <label htmlFor="password" className="pl-9 cursor-pointer">
                Password
              </label>
              <div className="flex gap-3">
                <div className="flex justify-center items-center">
                  <RiLockPasswordFill />
                </div>
                <input
                  className="rounded-md h-10 border pl-3 bg-blue-100"
                  placeholder="******"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: { value: true, message: "password is required" },
                  })}
                />
              </div>
              {errors.password?.type == "required" && (
                <span className="text-red-400 pl-9 font-bold">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <button className="bg-blue-600 text-white font-bold px-3 rounded-lg py-2">
            Login
          </button>
          <span>or</span>
          <Link
            to="/register"
            className="bg-green-600 px-3 py-2 rounded-md text-white font-bold"
          >
            Create an account
          </Link>
        </form>
      </div>
    </>
  );
};

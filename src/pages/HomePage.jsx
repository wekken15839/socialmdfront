import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";

export const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/posts");
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className="flex flex-col items-center justify-center my-20 max-w-xl mx-auto  font-mono bg-gray-900 p-10 rounded-xl">
      <div>
        <img
          src="https://scontent.fctg2-1.fna.fbcdn.net/v/t39.30808-6/318176441_196350669582972_7665777775971574118_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG1cJ0Xj4xlDZC30ix2Gr8J4KwYV6N1pangrBhXo3WlqRNU8EHCy1sQWC0aSS02QE98ior5wT7nJ3BWVkWRQ_4j&_nc_ohc=_VYVPjfJ6XYAX-EHw8k&_nc_ht=scontent.fctg2-1.fna&oh=00_AfCiUTqxs9Klgs5mJJqJtbH6GcjOaaqRPrk2qKzs0GnLnA&oe=64D16A58"
          alt=""
          className="h-44 w-44 rounded-full shadow shadow-blue-500"
        />
      </div>
      <h2 className="my-3 text-xl text-white  font-bold">
        Welcome to my Full-Stack App
      </h2>

      <div className="my-4">
        <img
          src="https://www.bigscal.com/wp-content/uploads/2022/09/Features-of-Mern-stack-development-services-You-Should-Know.png"
          alt=""
          className="w-full rounded-xl"
        />
      </div>

      <div className="flex gap-5">
        <Link
          to={"/login"}
          className="px-2 py-1 bg-blue-600 rounded-md text-white font-bold text-lg"
        >
          Log In
        </Link>
        <Link
          to={"/register"}
          className="px-2 py-1 bg-blue-600 rounded-md text-white font-bold text-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

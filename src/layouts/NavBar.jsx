import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { IMAGES_BASE_URL } from "../config";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) return <></>;

  return (
    <>
      <nav className="fixed z-10 w-full top-0 flex flex-wrap items-center justify-between px-2 py-1 bg-white dark:bg-neutral-800 dark:text-white dark:shadow-xl">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="flex font-semibold gap-2 items-center mr-4 py-2 whitespace-nowrap  "
              to="/profile"
            >
              <img
                className="w-10 h-10 rounded-full shadow shadow-slate-600 object-cover"
                alt="profilePhoto"
                src={`${IMAGES_BASE_URL}/${user.photo}`}
              />
              <span>{user.username}</span>
            </Link>
            <button
              className=" cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaBars />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex justify-end w-full flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item"></li>
              <li className="nav-item">
                <Link
                  className="py-2 flex items-center   font-bold leading-snug  opacity-80 hover:opacity-100 "
                  to="/posts"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg  opacity-75"></i>
                  <span className="ml-2">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="py-2 flex items-center   font-bold leading-snug  opacity-80 hover:opacity-100 "
                  to="/profile"
                >
                  <i className="fab fa-twitter text-lg leading-lg  opacity-75"></i>
                  <span className="ml-2">Profile</span>
                </Link>
              </li>
              <li className="nav-item" onClick={logout}>
                <Link
                  className="py-2 flex items-center   font-bold leading-snug  opacity-80 hover:opacity-100"
                  to=""
                >
                  <span className="ml-2">Log Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

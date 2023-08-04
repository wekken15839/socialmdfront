import React from "react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { IMAGES_BASE_URL } from "../config";

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) return <></>;

  return (
    <>
      <nav className="fixed w-full top-0 flex flex-wrap items-center justify-between px-2 py-1 bg-white">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="flex font-semibold gap-2 items-center mr-4 py-2 whitespace-nowrap  "
              href="/profile"
            >
              <img
                className="w-10 h-10 rounded-full shadow shadow-slate-600"
                alt="profilePhoto"
                src={`${IMAGES_BASE_URL}/${user.photo}`}
              />
              <span>{user.username}</span>
            </a>
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
              <li className="nav-item">
                <a
                  className="py-2 flex items-center   font-bold leading-snug  opacity-80 hover:opacity-100 "
                  href="#"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg  opacity-75"></i>
                  <span className="ml-2">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="py-2 flex items-center   font-bold leading-snug  opacity-80 hover:opacity-100 "
                  href="#"
                >
                  <i className="fab fa-twitter text-lg leading-lg  opacity-75"></i>
                  <span className="ml-2">Profile</span>
                </a>
              </li>
              <li className="nav-item" onClick={logout}>
                <a
                  className="py-2 flex items-center   font-bold leading-snug  opacity-80 hover:opacity-100"
                  href=""
                >
                  <span className="ml-2">Log Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

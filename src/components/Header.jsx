import React, { useContext } from "react";
import userContext from "../context/userContext";
import { Link } from "react-router-dom";
import { auth } from "../lib/firebaseConfig";
import useUser from "../hooks/user-info";
import { signOut } from "firebase/auth";
import Skeleton from "react-loading-skeleton";

const Header = () => {
  const { user } = useContext(userContext);
  const userInfo = useUser();

  return (
    <header className="w-full shadow-md bg-white">
      <nav className="md:w-3/4 w-full mx-auto p-3 flex justify-between">
        <div className="w-[7rem]">
          <Link to={`/`}>
            <img
              className="w-full"
              src="/images/users/logo.png"
              alt="instagram logo"
            />
          </Link>
        </div>
        {user ? (
          <div className="flex space-x-4">
            <Link to={"/"}>
              <svg
                className="w-8  text-black-light cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
            <button type="button" onClick={() => signOut(auth)}>
              <svg
                className="w-8  text-black-light cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
            {userInfo.user.username ? (
              <Link to={`/p/${userInfo.user.username}`}>
                <img
                  className="rounded-2xl object-cover w-8 text-black-light cursor-pointer"
                  src={`/images/avatars/${userInfo.user.username}.jpg`}
                  alt="profile"
                />
              </Link>
            ) : (
              <Skeleton circle count={1} height={30} width={30}></Skeleton>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to={`/login`}>
              <button className="bg-light-blue rounded p-1 text-white">
                log-In
              </button>
            </Link>
            <Link to={`/signup`} className="p-1">
              <button>sign-Up</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

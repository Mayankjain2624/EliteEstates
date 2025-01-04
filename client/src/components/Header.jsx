import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  console.log("CurrentUser in Header:", currentUser);

  return (
    <header className="bg-white shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo */}
        <h1 className="font-bold text-lg sm:text-2xl">
          <Link to="/" className="flex items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">
              mayank
            </span>
            <span className="text-slate-700">estate</span>
          </Link>
        </h1>

        {/* Search Bar */}
        <form
          action=""
          className="flex items-center bg-gray-100 rounded-full shadow-sm px-4 py-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-32 sm:w-64 text-sm text-gray-700"
          />
          <FaSearch className="text-gray-500 ml-2" />
        </form>

        {/* Navigation */}
        <ul className="flex items-center gap-6">
          <Link to="/">
            <li className="hidden sm:block text-gray-700 font-medium hover:text-blue-500 transition duration-200">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:block text-gray-700 font-medium hover:text-blue-500 transition duration-200">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-gray-300 hover:border-blue-500 transition duration-200"
                src={currentUser.avatar}
                alt="Profile"
              />
            ) : (
              <li className="text-gray-700 font-medium hover:text-blue-500 transition duration-200">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;

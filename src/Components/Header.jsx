import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <div>
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-600">Estate</span>
            </h1>
          </Link>
        </div>
        <div>
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search by name ..."
              className="bg-transparent outline-none w-24 sm:w-64"
            />
            <FaSearch />
          </form>
        </div>
        <div>
          <ul className="flex gap-4">
            <Link to="/">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                About
              </li>
            </Link>
            <Link to="/sign-in">
              <li className="text-slate-700 hover:underline">
                Sign In
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

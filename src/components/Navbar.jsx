import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../auth/services/authServices";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogOut = () => {
    dispatch(logoutUser())
      .then(() => navigate("/"))
      .catch((err) => console.error(err.message));
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="mx-auto lg:px-8">
        <div className="flex justify-between items-center h-16 p-4">
          {/* Logo */}
          <Link to="/home" className="text-4xl font-extrabold">
            BookVerse
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/bookmarks"
              className="hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold"
            >
              Bookmarks
            </Link>
            <Link
              to="/findbooks"
              className="hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold"
            >
              Search
            </Link>
            <Link
              to="/discussions"
              className="hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold"
            >
              Discussions
            </Link>
            <button
              className="hover:bg-red-500 transition px-4 py-2 rounded-md font-semibold"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>

          {/* Custom Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              className="flex flex-col space-y-1.5 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span className="w-6 h-0.5 bg-white rounded"></span>
              <span className="w-6 h-0.5 bg-white rounded"></span>
              <span className="w-6 h-0.5 bg-white rounded"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link
              to="/bookmarks"
              onClick={closeMenu}
              className="block text-white hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold"
            >
              Bookmarks
            </Link>
            <Link
              to="/findbooks"
              onClick={closeMenu}
              className="block text-white hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold"
            >
              Search
            </Link>
            <Link
              to="/discussions"
              onClick={closeMenu}
              className="block text-white hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold"
            >
              Discussions
            </Link>
            <button
              onClick={() => {
                closeMenu();
                handleLogOut();
              }}
              className="block text-white hover:bg-red-500 transition px-4 py-2 rounded-md font-semibold w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

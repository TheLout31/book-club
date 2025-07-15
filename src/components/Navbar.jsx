import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className=" mx-auto lg:px-8">
        <div className="flex justify-between items-center h-16 ">
          {/* Logo */}
          <div className="flex-shrink-0 text-4xl font-extrabold ">
            BookVerse
          </div>

          {/* Right Menu */}
          <div className="hidden md:flex space-x-6">
            <button className="hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold">
              Bookmarks
            </button>
            <button className="hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold">
              Suggestions
            </button>
            <button className="hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold">
              Discussions
            </button>
          </div>

          
          {/* <div className="sd:hidden">
           
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

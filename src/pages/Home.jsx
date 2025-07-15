import React, { useState } from "react";
import BooksList from "./BooksList";

const Home = () => {
  const [category, setCategory] = useState("mystery"); 

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 text-center mb-8 tracking-wide">
        Explore Books by Category
      </h1>

      {/* Category Select */}
      <div className="max-w-sm mx-auto mb-10">
        <label htmlFor="category" className="block text-indigo-500 font-semibold mb-2 text-lg">
          Choose a Category
        </label>
        <select
          id="category"
          value={category}
          onChange={handleChange}
          className="block w-full p-3 rounded-md border border-indigo-300 bg-white text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
        >
          <option value="mystery">Mystery</option>
          <option value="romance">Romance</option>
          <option value="love">Love</option>
          <option value="fantasy">Fantasy</option>
          <option value="science_fiction">Science Fiction</option>
          <option value="history">History</option>
          <option value="travel">Travel</option>
          <option value="science">Science</option>
          <option value="horror">Horror</option>
        </select>
      </div>

      {/* Book List */}
      <BooksList category={category} />
    </div>
  );
};

export default Home;

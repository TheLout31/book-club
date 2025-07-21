import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setBooks(data.docs.slice(0, 10));
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-sm mx-auto mb-10">
        <h1
          htmlFor="search"
          className=" text-indigo-500 font-semibold mb-2 text-lg"
        >
          Search Books
        </h1>
        <div className="flex gap-2">
          <input
            id="search"
            className="border p-2 flex-1 rounded-4xl border-indigo-300 focus:ring-2 focus:outline-none focus:ring-indigo-500 shadow-sm transition"
            placeholder="Search for books or authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            onClick={handleSearch}
            disabled={!query.trim()}
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="">
          <LinearProgress />
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.key}
              className="bg-white shadow-md rounded-md overflow-hidden transition hover:shadow-lg"
            >
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="w-full h-56 object-contain"
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                  No Cover
                </div>
              )}
              <div className="p-3">
                <h2 className="text-lg font-bold text-black">{book.title}</h2>
                <p className="text-sm text-gray-600">
                  {book.author_name?.[0] || "Unknown Author"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        query && <p className="text-center text-gray-500">No books found.</p>
      )}
    </div>
  );
};

export default SearchBooks;

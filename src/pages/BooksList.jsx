import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const BooksList = ({ category = "mystery" }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from OpenLibrary subject API
  useEffect(() => {
    const fetchBooks = async () => {
      if (!category) return;
      setLoading(true);
      try {
        const res = await fetch(
          `https://openlibrary.org/subjects/${category}.json?limit=10`
        );
        const data = await res.json();
        setBooks(data.works); // List of books
      } catch (error) {
        console.error("Failed to fetch mystery books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-10">
      {loading ? (
        <div className="flex align-middle justify-center h-7">
          <CircularProgress size="3rem" style={{ color: "#432DD7" }} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => {
            const coverUrl = book.cover_id
              ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
              : "https://via.placeholder.com/150x220?text=No+Cover";

            return (
              <div
                key={book.key}
                className="bg-white shadow-md rounded-md overflow-hidden transition hover:shadow-lg"
              >
                <img
                  src={coverUrl}
                  alt={book.title}
                  className="w-full h-56 object-contain"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-black-700">
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {book.authors?.[0]?.name || "Unknown Author"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BooksList;

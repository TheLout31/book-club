import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookMark } from "../redux/slice/bookMarkThunks";
import { addBookmarkToState } from "../redux/slice/bookmarkSlice";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(12); // ✅ make limit a state
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const bookMarked = useSelector((state) => state.bookmarks);
  const UID = useSelector((state) => state.auth.user);
  const [category, setCategory] = useState("mystery");
  const [page, setPage] = useState(0); // ✅ current page

  const handleChange = (event) => {
    setCategory(event.target.value);
    setPage(0); // ✅ reset to first page
  };

  const isBookMarked = (id) => {
    return (
      Array.isArray(bookMarked) &&
      bookMarked.some((item) => item && item.key === id)
    );
  };

  const handleBookMark = (data) => {
    dispatch(toggleBookMark(data));
  };

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (!category) return;
      setLoading(true);
      try {
        const offset = page * limit;
        const res = await fetch(
          `https://openlibrary.org/subjects/${category}.json?limit=${limit}&offset=${offset}`
        );
        const data = await res.json();
        setBooks(data.works);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [category, page]); // ✅ triggered by category or page

  // Fetch user's bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const colRef = collection(db, "bookmarks", UID, "items");
        const snapshot = await getDocs(colRef);
        const bookmarkList = snapshot.docs
          .map((doc) => doc.data())
          .filter((item) => item && item.key);
        dispatch(addBookmarkToState(...bookmarkList));
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div>
      <div className="max-w-sm mx-auto mb-10">
        <label
          htmlFor="category"
          className="block text-indigo-500 font-semibold mb-2 text-lg"
        >
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
                  <div className="flex p-4 flex-row justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-black-700">
                        {book.title}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {book.authors?.[0]?.name || "Unknown Author"}
                      </p>
                    </div>
                    <IconButton onClick={() => handleBookMark(book)}>
                      {isBookMarked(book.key) ? (
                        <BookmarkOutlinedIcon style={{ color: "black" }} />
                      ) : (
                        <BookmarkBorderOutlinedIcon
                          style={{ color: "black" }}
                        />
                      )}
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center gap-4 mt-5">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksList;

import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  setDoc,
  deleteDoc,
  doc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import Toast from "../components/Toast";
import { auth,db } from "../firebase/config";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { colors, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookMark } from "../redux/slice/bookMarkThunks";
import { addBookmarkToState } from "../redux/slice/bookmarkSlice";

const BooksList = ({ category = "mystery" }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const bookMarked = useSelector((state) => state.bookmarks);
  const isBookMarked = (id) => {
    const found =
      Array.isArray(bookMarked) && bookMarked.some((item) => item.key === id);
    return found;
  };
  console.log("bookmarked data =-===>",bookMarked)
  const handleBookMark = (data) => {
    
    console.log("Single Book Data =====>", data);
    dispatch(toggleBookMark(data));
  };

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

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const colRef = collection(db, "bookmarks", uid, "items");
        const snapshot = await getDocs(colRef);

        const bookmarkList = snapshot.docs.map((doc) => doc.data());
        console.log("bookmarkList",bookmarkList)
        dispatch(addBookmarkToState(bookmarkList));
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarks();
  }, [dispatch]);

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
                <div className=" flex p-4 flex-row justify-between">
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
                      <BookmarkOutlinedIcon
                        style={{
                          color: "black",
                          transition: "color ease-in-out",
                        }}
                      />
                    ) : (
                      <BookmarkBorderOutlinedIcon style={{ color: "black" }} />
                    )}
                  </IconButton>
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

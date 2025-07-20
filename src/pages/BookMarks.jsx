import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  setDoc,
  deleteDoc,
  doc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toggleBookMark } from "../redux/slice/bookMarkThunks";

const BookMarks = () => {
  const UID = useSelector((state) => state.auth.user);
  console.log(UID);
  const [bookMarks, setBookMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleBookMark = (data) => {
    console.log("Single Book Data =====>", data);
    dispatch(toggleBookMark(data));
    fetchBookmarks()
  };

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const colRef = collection(db, "bookmarks", UID.uid, "items");
      const snapshot = await getDocs(colRef);
      const bookmarkList = snapshot.docs
        .map((doc) => doc.data())
        .filter((item) => item && item.key);
      setBookMarks(bookmarkList);
      setLoading(false);
      console.log(bookMarks);
    } catch (err) {
      console.log("Error fetching bookmarks:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);
  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-10">
      {loading ? (
        <div className="flex align-middle justify-center h-7">
          <CircularProgress size="3rem" style={{ color: "#432DD7" }} />
        </div>
      ) : bookMarks.length === 0 ? (
        <div className="text-center text-gray-600 font-medium text-xl ">
          No Bookmarks yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookMarks.map((book) => {
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
                      {book.author || "Unknown Author"}
                    </p>
                  </div>
                  <IconButton onClick={() => handleBookMark(book)}>
                    <DeleteIcon style={{ color: "black" }} />
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

export default BookMarks;

// src/redux/slice/bookmarkThunks.js
import { setDoc, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { addBookmarkToState, removeBookmarkFromState } from "./bookmarkSlice";

// Toggle bookmark for logged-in user
export const toggleBookMark = (book) => async (dispatch, getState) => {
  const uid = auth.currentUser?.uid;
  const safeBookKey = book.key.replace(/\//g, ""); // "works/OL76487W" → "works_OL76487W"
  console.log(safeBookKey);
  if (!book?.key) return;
  if (!uid) {
    console.warn("User not logged in");
    return;
  }

  const bookmarks = getState().bookmarks;
  const exists = bookmarks?.find((item) => item && item.key === book.key);

  const userBookmarkRef = doc(db, "bookmarks", uid, "items", safeBookKey);

  if (exists) {
    // Remove bookmark
    try {
      await deleteDoc(userBookmarkRef);
      dispatch(removeBookmarkFromState(book.key));
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
    }
  } else {
    // Add bookmark
    try {
      await setDoc(userBookmarkRef, {
        title: book.title,
        author: book.authors?.[0]?.name || "Unknown",
        cover_id: book.cover_id,
        key: book.key,
      });

      dispatch(addBookmarkToState(book));
    } catch (err) {
      console.error("Failed to add bookmark:", err);
    }
  }
};

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { db } from "../../firebase/config";
// import {
//   setDoc,
//   deleteDoc,
//   doc,
//   collection,
//   getDocs,
//   serverTimestamp,
// } from "firebase/firestore";
// import { useSelector } from "react-redux";

// const UID = useSelector((state) => state.auth);

// export const fetchBookMarks = createAsyncThunk(
//   "slice/fetchBookMarks",
//   async () => {
//     try {
//       const colRef = collection(db, "bookmarks", UID.user.uid, "items");
//       const snapshot = await getDocs(colRef);
//       const bookmarkList = snapshot.docs
//         .map((doc) => doc.data())
//         .filter((item) => item && item.key);
//       return bookmarkList;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

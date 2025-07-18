// src/redux/slice/bookmarkSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmarkToState: (state, action) => {
       state.push(action.payload)
    },
    removeBookmarkFromState: (state, action) => {
      return state.filter((item) => item.key !== action.payload);
    },
  },
});

export const { addBookmarkToState, removeBookmarkFromState } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;

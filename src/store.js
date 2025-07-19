// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./redux/slice/bookmarkSlice";
import authReducer from "./auth/services/authSlice";
import discussionReducer from "./redux/slice/discussionSlice";

const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
    auth: authReducer,
    discussions: discussionReducer,
  },
});

export default store;

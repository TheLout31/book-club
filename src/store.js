// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./redux/slice/bookmarkSlice";
import authReducer from "./auth/services/authSlice";

const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
    auth: authReducer,
  },
});

export default store;

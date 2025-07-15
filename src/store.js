// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/services/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    
  },
});

export default store;

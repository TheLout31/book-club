import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title:null,
    author:null,
    cover:null,
    
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    
  },
});

export const { } =
  bookmarkSlice.actions;
export default bookmarkSlice.reducer;

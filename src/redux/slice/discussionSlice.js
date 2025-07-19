import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const fetchDiscussions = createAsyncThunk(
  "slice/fetchDiscussions",
  async () => {
    const discussionsRef = collection(db, "discussions");
    const q = query(discussionsRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const parsed = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate().toISOString() || null,
      };
    });
    return parsed;
  }
);

const discussionsSlice = createSlice({
  name: "discussions",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDiscussions: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscussions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiscussions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDiscussions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDiscussions } = discussionsSlice.actions;
export default discussionsSlice.reducer;

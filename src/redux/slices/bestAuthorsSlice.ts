import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the types for the state
interface Author {
  id: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  _count: {
    blogs: number;
  };
}

interface BestAuthorsState {
  authors: Author[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BestAuthorsState = {
  authors: [],
  status: "idle",
  error: null,
};

export const fetchBestAuthors = createAsyncThunk(
  "authors/fetchBest",
  async () => {
    const response = await fetch("/api/best-authors");
    const data = await response.json();
    return data.authors as Author[];
  }
);

const bestAuthorsSlice = createSlice({
  name: "bestAuthors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestAuthors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBestAuthors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authors = action.payload;
      })
      .addCase(fetchBestAuthors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load authors";
      });
  },
});

export default bestAuthorsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Blog {
  id: number;
  title: string;
  content: string;
  coverImage?: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  category: {
    name: string;
  };
}

interface CommunityBlogsState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

const initialState: CommunityBlogsState = {
  blogs: [],
  loading: false,
  error: null,
};

export const fetchCommunityBlogs = createAsyncThunk(
  "community/fetchBlogs",
  async (
    {
      categoryID,
      page = 1,
      limit = 10,
    }: { categoryID: number; page?: number; limit?: number },
    thunkAPI
  ) => {
    try {
      const res = await fetch(
        `/api/blogs?categoryID=${categoryID}&page=${page}&limit=${limit}`
      );
      if (!res.ok) throw new Error("Failed to fetch community blogs");
      return await res.json();
    } catch {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

const communityBlogsSlice = createSlice({
  name: "communityBlogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunityBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchCommunityBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default communityBlogsSlice.reducer;

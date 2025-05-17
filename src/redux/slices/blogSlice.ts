import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Blog {
  id: number;
  title: string;
  content: string;
  coverImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
  };
}

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
};

export const fetchMyBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (userId: number, thunkAPI) => {
    try {
      const res = await fetch(`/api/users/blogs/?userId=${userId}`);

      if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(
          errorData.error || "Failed to fetch blogs"
        );
      }

      const data = await res.json();
      return data.blogs;
    } catch {
      return thunkAPI.rejectWithValue("Network error");
    }
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchMyBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogsSlice.reducer;

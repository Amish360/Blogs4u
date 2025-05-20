import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Blog {
  id: number;
  title: string;
  content: string;
  coverImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    avatarUrl?: string;
  };
  category: {
    id: number;
    name: string;
  };
}

interface BlogDetailState {
  blog: Blog | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogDetailState = {
  blog: null,
  loading: false,
  error: null,
};

export const fetchBlogDetail = createAsyncThunk<
  Blog,
  number,
  { rejectValue: string }
>("blogDetail/fetch", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/blogDetails/${id}`);
    const data = await res.json();

    if (!res.ok)
      return rejectWithValue(data.error || "Failed to fetch blog detail");
    return data as Blog;
  } catch {
    return rejectWithValue("Network error");
  }
});

const blogDetailSlice = createSlice({
  name: "blogDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBlogDetail.fulfilled,
        (state, action: PayloadAction<Blog>) => {
          state.loading = false;
          state.blog = action.payload;
        }
      )
      .addCase(fetchBlogDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default blogDetailSlice.reducer;

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

export const updatedBlog = createAsyncThunk<
  Blog,
  { id: number; data: Partial<Blog>; token: string },
  { rejectValue: string }
>("blogDetail/update", async ({ id, data, token }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return rejectWithValue(result.error || "Failed to update blog");
    }

    return result as Blog;
  } catch {
    return rejectWithValue("Network error");
  }
});

export const deleteBlog = createAsyncThunk<
  { message: string },
  { id: number; token: string },
  { rejectValue: string }
>("blogDetail/delete", async ({ id, token }, { rejectWithValue }) => {
  try {
    const res = await fetch(`fetch/api/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (!result) {
      return rejectWithValue(result.error || "Failed to delete blog");
    }

    return result;
  } catch {
    return rejectWithValue("Network Error");
  }
});

const blogDetailSlice = createSlice({
  name: "blogDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //blog details
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
      })
      //blog update
      .addCase(updatedBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatedBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(updatedBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Update failed";
      })
      //Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state) => {
        state.loading = false;
        state.blog = null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Delete Failed.";
      });
  },
});

export default blogDetailSlice.reducer;

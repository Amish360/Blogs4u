import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Blog {
  id: number;
  title: string;
  content: string;
  coverImage?: string;
  createdAt: string;
  category: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
    avatarUrl?: string;
  };
}

export interface Author {
  id: number;
  name: string;
  bio?: string | null;
  avatarUrl?: string | null;
  _count: {
    blogs: number;
  };
}

interface AuthorState {
  author: Author | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface AuthorBlogsState {
  blogs: Blog[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialAuthorState: AuthorState = {
  author: null,
  status: "idle",
  error: null,
};

const initialBlogsState: AuthorBlogsState = {
  blogs: [],
  status: "idle",
  error: null,
};

export const fetchAuthorById = createAsyncThunk<
  Author,
  number,
  { rejectValue: string }
>("author/fetchById", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/authorDetails/${id}`);

    if (!res.ok) {
      const errorData = await res.json();
      return rejectWithValue(errorData.message || "Failed to fetch author");
    }

    const data = await res.json();
    return data as Author;
  } catch {
    return rejectWithValue("Network error while fetching author");
  }
});

export const fetchBlogsByAuthorId = createAsyncThunk<
  Blog[],
  number,
  { rejectValue: string }
>("author/fetchBlogsByAuthorId", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/authorDetails/${id}/blogs`);

    if (!res.ok) {
      const errorData = await res.json();
      return rejectWithValue(errorData.message || "Failed to fetch blogs");
    }

    const data = await res.json();
    return data.blogs as Blog[];
  } catch {
    return rejectWithValue("Network error while fetching blogs");
  }
});

const authorSlice = createSlice({
  name: "author",
  initialState: {
    ...initialAuthorState,
    blogsState: initialBlogsState,
  },
  reducers: {
    clearAuthor(state) {
      state.author = null;
      state.status = "idle";
      state.error = null;
      state.blogsState = initialBlogsState;
    },
  },
  extraReducers: (builder) => {
    // 👉 Author Info
    builder
      .addCase(fetchAuthorById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchAuthorById.fulfilled,
        (state, action: PayloadAction<Author>) => {
          state.status = "succeeded";
          state.author = action.payload;
        }
      )
      .addCase(fetchAuthorById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch author";
      })
      .addCase(fetchBlogsByAuthorId.pending, (state) => {
        state.blogsState.status = "loading";
        state.blogsState.error = null;
      })
      .addCase(
        fetchBlogsByAuthorId.fulfilled,
        (state, action: PayloadAction<Blog[]>) => {
          state.blogsState.status = "succeeded";
          state.blogsState.blogs = action.payload;
        }
      )
      .addCase(fetchBlogsByAuthorId.rejected, (state, action) => {
        state.blogsState.status = "failed";
        state.blogsState.error = action.payload || "Failed to fetch blogs";
      });
  },
});

export const { clearAuthor } = authorSlice.actions;

export default authorSlice.reducer;

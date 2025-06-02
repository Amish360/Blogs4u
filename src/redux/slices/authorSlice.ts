import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: AuthorState = {
  author: null,
  status: "idle",
  error: null,
};

// ✅ Async thunk to fetch author by id using fetch
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

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    clearAuthor(state) {
      state.author = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
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
      });
  },
});

export const { clearAuthor } = authorSlice.actions;

export default authorSlice.reducer;

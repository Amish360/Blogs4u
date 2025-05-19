import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Category {
  id: number;
  name: string;
}

interface CategoryState {
  list: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("api/categories");

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.error || "Failed to fetch profile");
      }
      return data;
    } catch {
      return rejectWithValue("Network error or server is unavailable.");
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;

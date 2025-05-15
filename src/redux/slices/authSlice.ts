import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const signupUser = createAsyncThunk<
  { token: string },
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/signupUser", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const res = await fetch("api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.error || "Invalid Credentials");
    }

    return { token: data.token };
  } catch {
    return rejectWithValue("Network error or server is unavailable");
  }
});

export const loginUser = createAsyncThunk<
  { token: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.error || "Invalid Credentials");
    }

    return { token: data.token };
  } catch {
    return rejectWithValue("Network error or server is unavailable");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Login add cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.token = action.payload.token;
          state.loading = false;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login Failed";
      })
      // Signup add cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.token = action.payload.token;
          state.loading = false;
          state.isAuthenticated = true;
        }
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload || "Login Failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

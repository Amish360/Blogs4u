import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
    bio?: string;
  } | null;
  editSuccess: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  bio?: string;
  blogCount?: number;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  user: null,
  editSuccess: false,
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

export const editProfile = createAsyncThunk<
  { message: string; user: User },
  { name: string; avatarUrl: string; bio: string },
  { state: { auth: AuthState }; rejectValue: string }
>(
  "auth/editProfile",
  async ({ name, avatarUrl, bio }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue("Unauthorized: No token found.");
    }

    try {
      const res = await fetch("/api/edit-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, avatarUrl, bio }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.error || "Failed to update profile.");
      }

      return { message: data.message, user: data.user as User };
    } catch {
      return rejectWithValue("Network error or server is unavailable.");
    }
  }
);

export const getProfile = createAsyncThunk<
  User, // ✅ Replace `any` with `User`
  number,
  { rejectValue: string }
>("auth/getProfile", async (userId, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/profile?userId=${userId}`);
    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.error || "Failed to fetch profile");
    }

    return data.user as User;
  } catch {
    return rejectWithValue("Network error or server is unavailable.");
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
    clearEditSuccess: (state) => {
      state.editSuccess = false;
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
      })
      //Edit Profile add cases
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.editSuccess = true;
      })
      .addCase(
        editProfile.fulfilled,
        (state, action: PayloadAction<{ message: string; user: User }>) => {
          state.loading = false;
          if (state.user) {
            state.user.name = action.payload.user.name;
            state.user.avatarUrl = action.payload.user.avatarUrl;
            state.user.bio = action.payload.user.bio;
          } else {
            state.user = action.payload.user;
          }
        }
      )
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.editSuccess = false;
        state.error = action.payload || "Failed to update user profile";
      })
      // Get User addCases
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load user profile";
      });
  },
});

export const { logout, clearEditSuccess } = authSlice.actions;
export default authSlice.reducer;

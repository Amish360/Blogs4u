import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import blogsReducer from "./slices/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

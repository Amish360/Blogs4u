import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import blogsReducer from "./slices/blogSlice";
import communityBlogsReducer from "./slices/communityBlogsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogsReducer,
    communityBlogs: communityBlogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

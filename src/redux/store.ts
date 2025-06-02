import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import blogsReducer from "./slices/blogSlice";
import communityBlogsReducer from "./slices/communityBlogsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import blogDetailReducer from "./slices/blogDetailSlice";
import bestAuthorReducer from "./slices/bestAuthorsSlice";
import authorDetailReducer from "./slices/authorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogsReducer,
    communityBlogs: communityBlogsReducer,
    categories: categoriesReducer,
    blogDetail: blogDetailReducer,
    bestAuthors: bestAuthorReducer,
    authorDetail: authorDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

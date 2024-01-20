import { configureStore } from "@reduxjs/toolkit";
import photosSlice from "./features/photos/photosSlice";
import { apiSlice } from "./api/apiSlice";
import videosSlice from "./features/videos/videosSlice";
import collectionsSlice from "./features/collections/collectionsSlice";
import favoritesSlice from "./features/favorites/favoritesSlice";
import singleItemSlice from "./features/single_item/singleItemSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    curated: photosSlice,
    videos: videosSlice,
    collection: collectionsSlice,
    favorites: favoritesSlice,
    singleItem: singleItemSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

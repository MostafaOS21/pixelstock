import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICollectionInterface {
  id: string;
  title: string;
  description: string;
  private: boolean;
  media_count: number;
  photos_count: number;
  videos_count: number;
}

export interface ICollectionResponseInterface {
  page: number;
  per_page: number;
  collections: ICollectionInterface[];
}

const initialState: ICollectionResponseInterface = {
  page: 1,
  per_page: 10,
  collections: [],
};

export const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    appendCollections: (
      state,
      action: PayloadAction<ICollectionResponseInterface>
    ) => {
      state.page = action.payload.page;
      state.per_page = action.payload.per_page;
      state.collections.push(...action.payload.collections);
    },
  },
});

export const { appendCollections } = collectionsSlice.actions;
export default collectionsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IImageInterface {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
  type?: string;
}

export interface ICuratedInterface {
  page: number;
  per_page: number;
  photos: IImageInterface[];
}

const initialState: ICuratedInterface = {
  page: 1,
  per_page: 10,
  photos: [],
};

export const photosSlice = createSlice({
  name: "curated",
  initialState,
  reducers: {
    appendCuratedPhotos: (state, action: PayloadAction<ICuratedInterface>) => {
      state.page = action.payload.page;
      state.per_page = action.payload.per_page;
      state.photos.push(...action.payload.photos);
    },
  },
});

export const { appendCuratedPhotos } = photosSlice.actions;
export default photosSlice.reducer;

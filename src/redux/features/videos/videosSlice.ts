import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IVideoInterface {
  id: number;
  width: number;
  height: number;
  duration: number;
  full_res: string | null;
  tags: string[];
  url: string;
  image: string;
  avg_color: string | null;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: {
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    fps: number;
    link: string;
  }[];
  video_pictures: {
    id: number;
    nr: number;
    picture: string;
  }[];
  type?: string;
}

export interface IVideoResponseInterface {
  page: number;
  per_page: number;
  videos: IVideoInterface[];
}

const initialState: IVideoResponseInterface = {
  page: 1,
  per_page: 10,
  videos: [],
};

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    appendVideos: (state, action: PayloadAction<IVideoResponseInterface>) => {
      state.page = action.payload.page;
      state.per_page = action.payload.per_page;
      state.videos.push(...action.payload.videos);
    },
  },
});

export const { appendVideos } = videosSlice.actions;
export default videosSlice.reducer;

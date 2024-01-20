import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IVideoInterface } from "../videos/videosSlice";
import { IImageInterface } from "../photos/photosSlice";

const initialState: {
  item: IVideoInterface | IImageInterface | null;
  mediaType: "photo" | "video" | null;
} = {
  item: null,
  mediaType: null,
};

const singleItemSlice = createSlice({
  name: "singleElement",
  initialState,
  reducers: {
    setSingleItem: (
      state,
      action: PayloadAction<IVideoInterface | IImageInterface>
    ) => {
      state.item = action.payload;
    },
    setMediaType: (state, action: PayloadAction<"photo" | "video">) => {
      state.mediaType = action.payload;
    },
  },
});

export const { setSingleItem, setMediaType } = singleItemSlice.actions;
export const selectSingleItem = (state: any) => state?.singleItem?.item;
export const selectMediaType = (state: any) => state?.singleItem?.mediaType;
export default singleItemSlice.reducer;

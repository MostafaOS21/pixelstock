import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IVideoInterface } from "../videos/videosSlice";
import { IImageInterface } from "../photos/photosSlice";
import { FAVORITES_KEY } from "@/constants";

export interface ISingleFavorite {
  item: IVideoInterface | IImageInterface;
  type: "video" | "photo";
}

interface IFavorite {
  items: ISingleFavorite[];
}

const initialState: IFavorite = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    loadFavorites: (state, action: PayloadAction<ISingleFavorite[]>) => {
      state.items = action.payload;
    },
    addFavorite: (state, action: PayloadAction<ISingleFavorite>) => {
      state.items.push(action.payload);
      let allFavorites = window.localStorage.getItem(FAVORITES_KEY);

      if (allFavorites) {
        let parsedFavorites = JSON.parse(allFavorites);
        parsedFavorites[action.payload.item.id] = {
          ...action.payload.item,
          type: action.payload.type,
        };
        window.localStorage.setItem(
          FAVORITES_KEY,
          JSON.stringify(parsedFavorites)
        );
      } else {
        window.localStorage.setItem(
          FAVORITES_KEY,
          JSON.stringify({
            [action.payload.item.id]: {
              ...action.payload.item,
              type: action.payload.type,
            },
          })
        );
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      //@ts-ignore
      state.items = state.items.filter((item) => item.id !== action.payload);

      let allFavorites = window.localStorage.getItem(FAVORITES_KEY);

      if (allFavorites) {
        let parsedFavorites = JSON.parse(allFavorites);
        delete parsedFavorites[action.payload];
        window.localStorage.setItem(
          FAVORITES_KEY,
          JSON.stringify(parsedFavorites)
        );
      }
    },
  },
});

export const { loadFavorites, addFavorite, removeFavorite } =
  favoritesSlice.actions;
export const selectFavorites = (state: any) => state?.favorites?.items;
export default favoritesSlice.reducer;

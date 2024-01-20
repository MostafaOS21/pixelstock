import React from "react";
import {
  IoHomeOutline,
  IoHomeSharp,
  IoImageOutline,
  IoImageSharp,
  IoVideocamOutline,
  IoVideocamSharp,
  IoHeartOutline,
  IoHeartSharp,
} from "react-icons/io5";

import { BsCollection, BsCollectionFill } from "react-icons/bs";

export const sideMenuLinks = [
  {
    route: "/",
    name: "Home",
    NotActiveIcon: React.createElement(IoHomeOutline),
    ActiveIcon: React.createElement(IoHomeSharp),
  },
  {
    route: "/curated-photos",
    name: "Photos",
    NotActiveIcon: React.createElement(IoImageOutline),
    ActiveIcon: React.createElement(IoImageSharp),
  },
  {
    route: "/popular-videos",
    name: "Videos",
    NotActiveIcon: React.createElement(IoVideocamOutline),
    ActiveIcon: React.createElement(IoVideocamSharp),
  },
  {
    route: "/collections",
    name: "Collections",
    NotActiveIcon: React.createElement(BsCollection),
    ActiveIcon: React.createElement(BsCollectionFill),
  },
  {
    route: "/favorites",
    name: "Favorites",
    NotActiveIcon: React.createElement(IoHeartOutline),
    ActiveIcon: React.createElement(IoHeartSharp),
  },
];

export const orientationsList = ["default", "landscape", "portrait", "square"];
export const sizesList = ["default", "small", "medium", "large"];

export const API_BASE_URL = "https://api.pexels.com/v1";
export const FAVORITES_KEY = "pixelstock_favorites";
export const THEME_KEY = "pixelstock_theme";
export const HISTORY_KEY = "pixelstock_history";

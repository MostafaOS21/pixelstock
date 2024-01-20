import { Routes, Route } from "react-router";
import Header from "./components/shared/Header";
import Home from "./pages/Home";
import SideMenu from "./components/shared/SideMenu";
import SingleItemPage from "./pages/SingleItemPage";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FAVORITES_KEY, THEME_KEY } from "./constants";
import { useDispatch } from "react-redux";
import {
  ISingleFavorite,
  loadFavorites,
} from "./redux/features/favorites/favoritesSlice";
import FavoritesPage from "./pages/FavoritesPage";
import PhotosResultsPage from "./pages/PhotosResultsPage";
import VideosResultsPage from "./pages/VideosResultsPage";
import CuratedPhotosPage from "./pages/CuratedPhotosPage";
import PopularVideosPage from "./pages/PopularVideosPage";
import FeaturedCollectionsPage from "./pages/FeaturedCollectionsPage";
import SingleCollectionPage from "./pages/SingleCollectionPage";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pattern = /^(\/photo|\/video)\/(\d+)$/;
  const match = !pattern.test(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const favorites = window.localStorage.getItem(FAVORITES_KEY);

    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      const values: ISingleFavorite[] = Object.values(parsedFavorites);
      dispatch(loadFavorites(values));
    }

    // Dark Mode
    const theme = window.localStorage.getItem(THEME_KEY);
    if (theme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <Header isIsolated={!match} />
      <div
        className={`${match && "grid lg:grid-cols-[300px_1fr]"} ${
          match ? "pt-20" : "pt-8"
        }`}
      >
        {match && <SideMenu />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path={"photo/:id"}
              element={<SingleItemPage type="photo" />}
            />
            <Route
              path={"video/:id"}
              element={<SingleItemPage type="video" />}
            />
            <Route path={"favorites"} element={<FavoritesPage />} />
            <Route
              path="/search/photos/:query"
              element={<PhotosResultsPage />}
            />
            <Route
              path="/search/videos/:query"
              element={<VideosResultsPage />}
            />
            <Route path="/curated-photos" element={<CuratedPhotosPage />} />
            <Route path="/popular-videos" element={<PopularVideosPage />} />
            <Route path="/collections" element={<FeaturedCollectionsPage />} />
            <Route path="/collection/:id" element={<SingleCollectionPage />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;

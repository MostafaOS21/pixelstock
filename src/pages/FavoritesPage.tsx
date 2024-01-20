import Card from "@/components/shared/Card";
import { selectFavorites } from "@/redux/features/favorites/favoritesSlice";
import { IImageInterface } from "@/redux/features/photos/photosSlice";
import { IVideoInterface } from "@/redux/features/videos/videosSlice";
import { useSelector } from "react-redux";

export default function FavoritesPage() {
  const favorites: (IVideoInterface | IImageInterface)[] =
    useSelector(selectFavorites);

  return (
    <section>
      <h1 className="h1-normal text-center mb-10">Favorites</h1>

      <div className="masonry !mb-10">
        {favorites.map((item, index) => {
          if (item.type === "video") {
            return (
              <Card
                key={item.id + index}
                cardData={item}
                type="video"
                index={index}
              />
            );
          } else if (item.type === "photo") {
            return (
              <Card key={item.id} cardData={item} type="photo" index={index} />
            );
          }
        })}
      </div>
    </section>
  );
}

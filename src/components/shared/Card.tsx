import { IImageInterface } from "@/redux/features/photos/photosSlice";
import { IVideoInterface } from "@/redux/features/videos/videosSlice";
import { IoPlayOutline } from "react-icons/io5";
import { useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "@/redux/features/favorites/favoritesSlice";

interface Props {
  cardData: IImageInterface | IVideoInterface;
  type: "video" | "photo";
  index: number;
}

export default function Card({ cardData, type, index }: Props) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const isInFavorites = useSelector(selectFavorites).some(
    (item: any) => item.id === cardData?.id
  );

  // Handle is loaded
  const handleIsLoaded = () => {
    setIsLoaded(true);
  };

  // Handle adding to favorites
  const handleAddingToFavorites = (
    e: React.MouseEvent<SVGAElement>,
    item: IVideoInterface | IImageInterface,
    type: "video" | "photo"
  ) => {
    e.preventDefault();
    const element = document.querySelector(`#id-${item.id} svg`);
    if (element) {
      dispatch(addFavorite({ item, type }));
      setIsFavorite(true);
    }
  };

  const handleRemovingFromFavorites = (
    e: React.MouseEvent<SVGAElement>,
    id: string
  ) => {
    e.preventDefault();
    dispatch(removeFavorite(+id));
    setIsFavorite(false);
  };

  // Tailwind classes
  const parentClasses = `
  relative rounded-md !overflow-hidden block mb-5 !mx-auto overflow-hidden`;
  const mediaClasses = `w-full h-full object-cover transition-opacity opacity-0 ${
    isLoaded && "opacity-100"
  }`;
  const favoritesClasses = `opacity-0 transition-opacity hover:opacity-100 z-[98] w-full h-full left-1/2 -translate-x-1/2 absolute text-2xl text-white-PURE p-2 before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-full before:h-12 before:z-10 before:bg-gradient-to-b before:from-transparent before:to-zinc-900 before:opacity-50`;
  const favoriteIconClasses = `heart dark:text-primary-50 absolute right-4 bottom-6 cursor-pointer z-[100]`;

  // Render if type is photo
  if (type === "photo") {
    let photo: IImageInterface = cardData as IImageInterface;

    return (
      <Link
        to={`/photo/${photo.id}`}
        id={`id-${photo.id}`}
        className={`${parentClasses} bg-[${photo.avg_color}]`}
        style={{
          backgroundColor: `${photo.avg_color}`,
          height: `${(photo.height / photo.width) * 300}px`,
        }}
      >
        <img
          src={photo.src?.large}
          alt={photo.photographer}
          onLoad={handleIsLoaded}
          className={mediaClasses}
          style={{
            transitionDelay: `${index * 0.1}s`,
          }}
        />
        <div className={favoritesClasses}>
          {isFavorite || isInFavorites ? (
            <IoHeartSharp
              className={favoriteIconClasses + " text-primary"}
              onClick={(e: React.MouseEvent<SVGAElement>) =>
                handleRemovingFromFavorites(e, `${photo.id}`)
              }
            />
          ) : (
            <IoHeartOutline
              className={favoriteIconClasses}
              onClick={(e: React.MouseEvent<SVGAElement>) =>
                handleAddingToFavorites(e, photo, "photo")
              }
            />
          )}
        </div>
      </Link>
    );
  }

  // Render if type is video
  if (type === "video") {
    let video: IVideoInterface = cardData as IVideoInterface;
    let timeout: NodeJS.Timeout;
    const avgColor = `bg-white-100 dark:bg-dark-50`;

    return (
      <Link
        to={`/video/${video.id}`}
        id={`id-${video.id}`}
        className={`${parentClasses} ${avgColor}`}
        style={{
          height: `${(video.height / video.width) * 300}px`,
        }}
        onMouseEnter={(e) => {
          const video = e.currentTarget.querySelector("video");

          if (video) {
            timeout = setTimeout(() => {
              video.play();
            }, 500);
          }
        }}
        onMouseLeave={(e) => {
          const video = e.currentTarget.querySelector("video");

          if (video) {
            if (timeout) clearTimeout(timeout);
            video.pause();
          }
        }}
      >
        <div className="absolute  bg-yellow text-black rounded-sm p-2 top-3 left-3">
          <IoPlayOutline />
        </div>
        <video
          src={
            video.video_files?.filter((item) => item.quality === "sd")[0].link
          }
          typeof="video/mp4"
          onLoadedData={handleIsLoaded}
          className={mediaClasses}
          muted
        ></video>
        <div className={favoritesClasses}>
          {isFavorite || isInFavorites ? (
            <IoHeartSharp
              className={favoriteIconClasses + " text-primary"}
              onClick={(e: React.MouseEvent<SVGAElement>) =>
                handleRemovingFromFavorites(e, `${video.id}`)
              }
            />
          ) : (
            <IoHeartOutline
              className={favoriteIconClasses}
              onClick={(e: React.MouseEvent<SVGAElement>) =>
                handleAddingToFavorites(e, video, "video")
              }
            />
          )}
        </div>
      </Link>
    );
  }
}

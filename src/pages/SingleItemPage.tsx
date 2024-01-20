import Spinner from "@/components/ui/Spinner";
import {
  useGetSimilarPhotosQuery,
  useGetSinglePhotoQuery,
  useGetSingleVideoQuery,
} from "@/redux/api/apiSlice";

import { IImageInterface } from "@/redux/features/photos/photosSlice";
import { IVideoInterface } from "@/redux/features/videos/videosSlice";
import {
  setMediaType,
  setSingleItem,
} from "@/redux/features/single_item/singleItemSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { signal } from "@preact/signals-react";
import PhotosContainer from "@/components/shared/PhotosContainer";
import ErrorPage from "./ErrorPage";

const isLoaded = signal(false);
export default function SingleItemPage({ type }: { type: "video" | "photo" }) {
  const { id } = useParams();
  const { data, isLoading, isError, error } =
    type === "photo"
      ? useGetSinglePhotoQuery({ id })
      : useGetSingleVideoQuery({ id });
  let similarData, similarDataLoading, similarDataError;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isError) {
      if (type === "photo") {
        let item = data as IImageInterface;
        dispatch(setSingleItem(item));
        dispatch(setMediaType("photo"));
      } else {
        let item = data as IVideoInterface;
        dispatch(setSingleItem(item));
        dispatch(setMediaType("video"));
      }
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      isLoaded.value = false;
    }
  }, [isLoading]);

  // Get Similar Photos
  if (type === "photo") {
    const {
      data: similarPhotos,
      isLoading,
      isError,
    } = useGetSimilarPhotosQuery({
      query: (data as IImageInterface)?.alt,
      color: (data as IImageInterface)?.avg_color,
    });

    similarData = similarPhotos;
    similarDataLoading = isLoading;
    similarDataError = isError;
  }

  if (isError || similarDataError) {
    //@ts-ignore
    if (error?.status === 404) {
      return (
        <section className="h-screen">
          {<ErrorPage message={"Not found"} />}
        </section>
      );
    }

    return (
      <section className="h-screen">
        {<ErrorPage message={"Something wrong"} />}
      </section>
    );
  }

  const handleIsLoaded = () => {
    isLoaded.value = true;
  };

  if (isLoading) {
    return (
      <section className="min-h-screen">
        <div className="flex justify-center items-center h-[98vh]">
          <Spinner />
        </div>
      </section>
    );
  }

  if (type === "photo") {
    let item = data as IImageInterface;
    let similar;

    if (similarData?.photos?.length > 0) {
      similar = (
        <div className="min-h-[98vh]">
          <h2 className="h1-normal">More like this:</h2>
          <div className={"py-10 "}>
            <PhotosContainer photosData={similarData?.photos} />
          </div>
        </div>
      );
    } else if (similarDataLoading) {
      similar = (
        <div className="flex justify-center items-center h-[98vh]">
          <Spinner />
        </div>
      );
    }

    return (
      <section className="min-h-screen">
        <div>
          <div
            className="mx-auto rounded-md overflow-hidden !h-fit"
            style={{
              width: `${(item.width / item.height) * 600}px`,
              maxWidth: "100%",
              backgroundColor: `${item.avg_color}`,
            }}
          >
            <img
              src={item.src.large}
              className={`transition-opacity w-full h-full ${
                isLoaded.value ? "opacity-1" : "opacity-0"
              }`}
              onLoad={handleIsLoaded}
              style={{
                transitionDelay: "1s",
              }}
            />
          </div>
          <p className="text-center py-1">
            photograph by{" "}
            <a
              href={item.photographer_url}
              target="_blank"
              className="text-primary dark:text-primary-100 underline"
            >
              {item.photographer}
            </a>
          </p>
        </div>
        {similar}
      </section>
    );
  }

  if (type === "video") {
    let item = data as IVideoInterface;

    return (
      <section className="min-h-screen">
        <div>
          <div
            className="mx-auto rounded-md overflow-hidden !h-fit"
            style={{
              width: `${(item.width / item.height) * 600}px`,
              maxWidth: "100%",
              backgroundColor: `${item?.avg_color}`,
            }}
          >
            <video
              src={
                item.video_files.filter((file) => file.quality === "hd")[0].link
              }
              className={`transition-opacity w-full h-full`}
              controls
            ></video>
          </div>
          <p className="text-center py-1">
            photograph by{" "}
            <a
              href={item.user.url}
              target="_blank"
              className="text-primary dark:text-primary-100 underline"
            >
              {item.user.name}
            </a>
          </p>
        </div>
      </section>
    );
  }
}

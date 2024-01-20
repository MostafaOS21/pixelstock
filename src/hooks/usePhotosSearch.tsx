import api from "@/lib/api";
import { IImageInterface } from "@/redux/features/photos/photosSlice";
import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";
import IMediaProps from ".";

export default function usePhotosSearch({
  query,
  page = 1,
  orientation,
  color,
  size,
  setPage,
}: IMediaProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState<IImageInterface[]>([]);
  const [hasMore, setHasMore] = useState(true); // next_page can't be found if the last page is reached
  const [currentOrientation, setCurrentOrientation] = useState<string | null>(
    orientation
  );
  const [currentSize, setCurrentSize] = useState<string | null>(size);
  const [currentColor, setCurrentColor] = useState<string | null>(color);
  let cancel: Canceler | undefined;

  useEffect(() => {
    setPhotos([]);
    setPage(1);
  }, [query, currentOrientation, currentColor, currentSize]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/search", {
        params: { query, page, orientation: currentOrientation, color, size },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        // set photos
        setPhotos((prevPhotos) => [...prevPhotos, ...res.data?.photos]);
        // check if there are more photos to load
        setHasMore(res.data?.next_page ? true : false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
      })
      .finally(() => {
        // Stop loading
        setIsLoading(false);
      });

    return () => {
      if (cancel) cancel();
    };
  }, [page, query, currentOrientation, currentColor, currentSize]);

  return {
    isLoading,
    error,
    photos,
    hasMore,
    setCurrentOrientation,
    setCurrentSize,
    setCurrentColor,
  };
}

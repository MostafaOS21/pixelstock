import { IVideoInterface } from "@/redux/features/videos/videosSlice";
import IMediaProps from ".";
import { useState, useEffect } from "react";
import axios, { Canceler } from "axios";
import api from "@/lib/api";

export default function useVideosSearch({
  orientation,
  query,
  setPage,
  size,
  page,
}: Omit<IMediaProps, "color">) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [videos, setVideos] = useState<IVideoInterface[]>([]);
  const [hasMore, setHasMore] = useState(true); // next_page can't be found if the last page is reached
  const [currentOrientation, setCurrentOrientation] = useState<string | null>(
    orientation
  );
  const [currentSize, setCurrentSize] = useState<string | null>(size);
  let cancel: Canceler | undefined;

  useEffect(() => {
    setVideos([]);
    setPage(1);
  }, [query, currentOrientation, currentSize]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/videos/search", {
        params: { query, page, orientation: currentOrientation, size },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        // set videos
        setVideos((prevVideos) => [...prevVideos, ...res.data?.videos]);
        // check if there are more videos to load
        setHasMore(res.data?.next_page ? true : false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setIsError(true);
      })
      .finally(() => {
        // Stop loading
        setIsLoading(false);
      });

    return () => {
      if (cancel) cancel();
    };
  }, [page, query, currentOrientation, currentSize]);

  return {
    isLoading,
    isError,
    videos,
    hasMore,
    setCurrentOrientation,
    setCurrentSize,
  };
}

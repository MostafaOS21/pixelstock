import api from "@/lib/api";
import { IVideoInterface } from "@/redux/features/videos/videosSlice";
import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";

export default function usePopularVideos() {
  const [videos, setVideos] = useState<IVideoInterface[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  let cancel: Canceler;

  useEffect(() => {
    api
      .get("/videos/popular", {
        params: { page, per_page: 10 },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setVideos((prevVideos) => [...prevVideos, ...res.data?.videos]);
        setHasMore(res.data?.next_page ? true : false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
      });

    return () => {
      if (cancel) cancel();
    };
  }, [page]);

  return { error, videos, setPage, hasMore };
}

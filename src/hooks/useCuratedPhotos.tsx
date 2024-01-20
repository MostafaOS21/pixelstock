import api from "@/lib/api";
import { IImageInterface } from "@/redux/features/photos/photosSlice";
import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";

export default function useCuratedPhotos() {
  const [photos, setPhotos] = useState<IImageInterface[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  let cancel: Canceler;

  useEffect(() => {
    api
      .get("/curated", {
        params: { page, per_page: 30 },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPhotos((prevPhotos) => [...prevPhotos, ...res.data?.photos]);
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

  return { photos, setPage, hasMore, error };
}

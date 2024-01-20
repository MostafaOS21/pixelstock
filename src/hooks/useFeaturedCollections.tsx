import api from "@/lib/api";
import { ICollectionInterface } from "@/redux/features/collections/collectionsSlice";
import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";

export default function useFeaturedCollections() {
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [collections, setCollections] = useState<ICollectionInterface[]>([]);
  let cancel: Canceler;

  useEffect(() => {
    api
      .get("/collections/featured", {
        params: { page, per_page: 50 },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setCollections((prevCollections) => [
          ...prevCollections,
          ...res.data?.collections,
        ]);
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

  return { collections, setPage, hasMore, error };
}

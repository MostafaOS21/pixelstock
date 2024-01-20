import api from "@/lib/api";
import { IImageInterface } from "@/redux/features/photos/photosSlice";
import { IVideoInterface } from "@/redux/features/videos/videosSlice";
import axios, { Canceler } from "axios";
import React, { useEffect } from "react";

export default function useCollection({ id }: { id: string }) {
  const [collection, setCollection] = React.useState<
    (IImageInterface | IVideoInterface)[]
  >([]);
  const [page, setPage] = React.useState<number>(1);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  let cancel: Canceler;

  useEffect(() => {
    api
      .get(`/collections/${id}`, {
        params: { page: page, per_page: 10 },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        if (res.data?.media) {
          setCollection((prevCollection) => {
            return [...prevCollection, ...res.data.media];
          });
        }
        setHasMore(res.data?.next_page ? true : false);
      });
  }, [page]);

  return { setPage, collection, hasMore };
}

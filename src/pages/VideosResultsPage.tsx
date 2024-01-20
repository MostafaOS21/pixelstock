import FilterResults from "@/components/shared/FilterResults";
import InfiniteScrolling from "@/components/shared/InfiniteScrolling";
import VideosContainer from "@/components/shared/VideosContainer";
import useVideosSearch from "@/hooks/useVideosSearch";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function VideosResultsPage() {
  const location = useLocation();
  const { query = "" } = useParams();
  // Params
  const searchParams = new URLSearchParams(location.search);
  const orientation = searchParams.get("orientation") as string | null;
  const size = searchParams.get("size") as string | null;
  const [page, setPage] = useState(1);

  // Videos Search Hook
  const { setCurrentOrientation, setCurrentSize, videos, hasMore } =
    useVideosSearch({ orientation, size, query, setPage, page });

  useEffect(() => {
    const searchInput = document.querySelector(
      ".search-form input"
    ) as HTMLInputElement;

    if (searchInput) {
      searchInput.value = query;
    }
  }, []);

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  return (
    <section>
      <h1 className="h1-normal">
        Results of: {query?.length > 20 ? query?.slice(0, 20) + "..." : query}
      </h1>

      <FilterResults
        setCurrentOrientation={setCurrentOrientation}
        setCurrentSize={setCurrentSize}
        orientation={orientation}
        size={size}
        type="video"
      />

      <VideosContainer videosData={videos} />

      <InfiniteScrolling hasMore={hasMore} loadMoreCallback={loadMore} />
    </section>
  );
}

import { useLocation, useParams } from "react-router-dom";
import InfiniteScrolling from "@/components/shared/InfiniteScrolling";
import { useEffect, useState } from "react";
import FilterResults from "@/components/shared/FilterResults";
import usePhotosSearch from "@/hooks/usePhotosSearch";
import PhotosContainer from "@/components/shared/PhotosContainer";
import ErrorPage from "./ErrorPage";

export default function PhotosResultsPage() {
  const location = useLocation();
  const { query = "" } = useParams();
  // Params
  const searchParams = new URLSearchParams(location.search);
  const orientation = searchParams.get("orientation") as string | null;
  const size = searchParams.get("size") as string | null;
  const color = searchParams.get("color") as string | null;
  const [page, setPage] = useState(1);
  // Photos Search Hook
  const {
    hasMore,
    photos,
    setCurrentOrientation,
    setCurrentSize,
    setCurrentColor,
    error,
  } = usePhotosSearch({
    query,
    page,
    orientation,
    setPage,
    size,
    color,
  });

  useEffect(() => {
    const searchInput = document.querySelector(
      ".search-form input"
    ) as HTMLInputElement;

    if (searchInput) {
      searchInput.value = query;
    }
  }, []);

  async function loadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  if (error) {
    return <ErrorPage message="Can't get photos" />;
  }

  return (
    <section>
      <h1 className="h1-normal">
        Results of: {query?.length > 20 ? query?.slice(0, 20) + "..." : query}
      </h1>

      <FilterResults
        setCurrentOrientation={setCurrentOrientation}
        setCurrentSize={setCurrentSize}
        setCurrentColor={setCurrentColor}
        orientation={orientation}
        color={color}
        size={size}
        type="photo"
      />

      <PhotosContainer photosData={photos} />
      <InfiniteScrolling loadMoreCallback={loadMore} hasMore={hasMore} />
    </section>
  );
}

import InfiniteScrolling from "@/components/shared/InfiniteScrolling";
import PhotosContainer from "@/components/shared/PhotosContainer";
import useCuratedPhotos from "@/hooks/useCuratedPhotos";

export default function CuratedPhotosPage() {
  const { photos, setPage, hasMore } = useCuratedPhotos();

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section>
      <h1 className="h1-normal mb-10">Curated Photos</h1>

      <PhotosContainer photosData={photos} />

      <InfiniteScrolling hasMore={hasMore} loadMoreCallback={loadMoreData} />
    </section>
  );
}

import CollectionsContainer from "@/components/shared/CollectionsContainer";
import InfiniteScrolling from "@/components/shared/InfiniteScrolling";
import useFeaturedCollections from "@/hooks/useFeaturedCollections";
import ErrorPage from "./ErrorPage";

export default function FeaturedCollectionsPage() {
  const { collections, setPage, hasMore, error } = useFeaturedCollections();

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (error) {
    return <ErrorPage message="Can't getting collections" />;
  }

  return (
    <section>
      <h1 className="h1-normal">Featured Collections</h1>

      <CollectionsContainer collectionsData={collections} />

      <InfiniteScrolling hasMore={hasMore} loadMoreCallback={loadMore} />
    </section>
  );
}

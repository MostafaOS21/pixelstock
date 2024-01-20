import InfiniteScrolling from "@/components/shared/InfiniteScrolling";
import VideosContainer from "@/components/shared/VideosContainer";
import usePopularVideos from "@/hooks/usePopularVideos";
import ErrorPage from "./ErrorPage";

export default function PopularVideosPage() {
  const { error, hasMore, videos, setPage } = usePopularVideos();

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (error) {
    return <ErrorPage message="Can't get videos" />;
  }

  return (
    <section>
      <h1 className="h1-normal">Popular Videos</h1>

      <VideosContainer videosData={videos} />

      <InfiniteScrolling hasMore={hasMore} loadMoreCallback={loadMore} />
    </section>
  );
}

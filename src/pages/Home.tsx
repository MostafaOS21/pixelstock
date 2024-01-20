import CollectionsContainer from "@/components/shared/CollectionsContainer";
import PhotosContainer from "@/components/shared/PhotosContainer";
import VideosContainer from "@/components/shared/VideosContainer";
import { Button } from "@/components/ui/button";
import {
  useGetCuratedPhotosQuery,
  useGetFeaturedCollectionsQuery,
  useGetPopularVideosQuery,
} from "@/redux/api/apiSlice";
import { Link } from "react-router-dom";
import Spinner from "@/components/ui/Spinner";
import OverviewCarousel from "@/components/shared/OverviewCarousel";

export default function Home() {
  const { data: photosData, isLoading: isLoadingPhotos } =
    useGetCuratedPhotosQuery({
      page: 1,
      per_page: 15,
    });
  const { data: popularVideos, isLoading: isLoadingVideos } =
    useGetPopularVideosQuery({
      page: 1,
      per_page: 15,
    });
  const { data: curatedCollections, isLoading: isLoadingCollections } =
    useGetFeaturedCollectionsQuery({
      page: 1,
      per_page: 15,
    });

  if (isLoadingPhotos || isLoadingVideos || isLoadingCollections) {
    return (
      <section className="flex justify-center items-center">
        <Spinner />
      </section>
    );
  }

  const exploreClasses = "max-h-[140vh] overflow-hidden p-2 relative mb-14";
  const exploreParentClasses = `absolute w-full bottom-0 left-0 z-[101] flex justify-center py-5 bg-gradient-to-b from-transparent to-white-PURE
  dark:to-dark-100`;
  const headerAlignClasses = "text-center lg:text-left";
  const buttonsClasses = "!px-7 py-3";

  return (
    <>
      <OverviewCarousel />
      <br />
      <br />
      <section>
        <div>
          {/* Photos */}
          <h1 className={"h1-normal " + headerAlignClasses}>Featured photos</h1>
          <div className={exploreClasses}>
            <PhotosContainer photosData={photosData?.photos} />
            <div className={exploreParentClasses}>
              <Button className={"btn " + buttonsClasses}>
                <Link to={"/curated-photos"}>Explore</Link>
              </Button>
            </div>
          </div>

          {/* Videos */}
          <h1 className={"h1-normal " + headerAlignClasses}>Popular videos</h1>
          <div className={exploreClasses}>
            <VideosContainer videosData={popularVideos?.videos} />

            <div className={exploreParentClasses}>
              <Button className={"btn " + buttonsClasses}>
                <Link to={"/popular-videos"}>Explore</Link>
              </Button>
            </div>
          </div>

          {/* Collections */}
          <h1 className={"h1-normal " + headerAlignClasses}>
            Featured collections
          </h1>
          <div className={exploreClasses}>
            <CollectionsContainer
              collectionsData={curatedCollections?.collections}
            />
            <div className={exploreParentClasses}>
              <Button className={"btn " + buttonsClasses}>
                <Link to={"/collections"}>Explore</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { IVideoInterface } from "@/redux/features/videos/videosSlice";
import Card from "./Card";

export default function VideosContainer({
  videosData,
}: {
  videosData: IVideoInterface[];
}) {
  return (
    <div className="masonry">
      {videosData?.map((video, index) => (
        <Card
          cardData={video}
          type="video"
          key={video.id}
          index={index / videosData?.length}
        />
      ))}
    </div>
  );
}

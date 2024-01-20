import { IImageInterface } from "@/redux/features/photos/photosSlice";
import Card from "./Card";

export default function PhotosContainer({
  photosData,
}: {
  photosData: IImageInterface[];
}) {
  return (
    <div className="masonry">
      {photosData?.map((photo, index) => (
        <Card
          cardData={photo}
          type="photo"
          key={photo.id}
          index={index / photosData?.length}
        />
      ))}
    </div>
  );
}

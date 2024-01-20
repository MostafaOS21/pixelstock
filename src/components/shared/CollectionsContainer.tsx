import { ICollectionInterface } from "@/redux/features/collections/collectionsSlice";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function CollectionsContainer({
  collectionsData,
}: {
  collectionsData: ICollectionInterface[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 lg:gap-3">
      {collectionsData?.map((collection, index, self) => (
        <Link
          key={collection.id}
          className={`transition-colors hover:bg-white-50 dark:hover:bg-dark-50 fadeIn`}
          style={{
            animationDelay: `${index / self.length}s`,
          }}
          to={`/collection/${collection.id}?n=${collection.title}`}
        >
          <div className="p-3">
            <h3 className="text-xl mb-1 overflow-hidden whitespace-nowrap text-ellipsis">
              {collection.title}
            </h3>
            <p>
              {collection.media_count +
                collection.photos_count +
                collection.videos_count}{" "}
              media
            </p>
          </div>
          <Separator />
        </Link>
      ))}
    </div>
  );
}

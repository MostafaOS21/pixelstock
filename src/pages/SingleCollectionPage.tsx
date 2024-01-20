import Card from "@/components/shared/Card";
import InfiniteScrolling from "@/components/shared/InfiniteScrolling";
import useCollection from "@/hooks/useCollection";
import { ReactNode } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function SingleCollectionPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("n");
  const { hasMore, collection, setPage } = useCollection({ id: id || "" });

  let content: ReactNode[] = [];
  if (collection.length > 0) {
    content = collection.map((item, index) => {
      if (item.type === "Video") {
        return (
          <Card cardData={item} index={index} type="video" key={item.id} />
        );
      } else if (item.type === "Photo") {
        return (
          <Card cardData={item} index={index} type="photo" key={item.id} />
        );
      }
    });
  }

  return (
    <section>
      <h1 className="h1-normal">{title ? `Collection: ${title}` : ""}</h1>

      <div className="masonry">{content}</div>

      <InfiniteScrolling
        hasMore={hasMore}
        loadMoreCallback={() => setPage((prev) => prev + 1)}
      />
    </section>
  );
}

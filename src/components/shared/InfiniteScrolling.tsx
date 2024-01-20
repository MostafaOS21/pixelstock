import { useEffect, useRef } from "react";
import Spinner from "../ui/Spinner";

export default function InfiniteScrolling({
  loadMoreCallback,
  hasMore,
}: {
  loadMoreCallback: () => void;
  hasMore: boolean;
}) {
  const ref = useRef(null);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const currentHeight =
      window.innerHeight + document.documentElement.scrollTop;

    if (currentHeight + 1 >= scrollHeight) {
      loadMoreCallback();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return (
    <div
      className={`pt-12 pb-20 mx-auto w-fit ${!hasMore && "hidden"}`}
      ref={hasMore ? ref : null}
    >
      <Spinner />
    </div>
  );
}

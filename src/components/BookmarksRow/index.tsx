import { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Thumbnail from "../Thumbnail";
import useAuth from "@/hooks/useAuth";
import { Repo } from "../../../@types/types";
import useBookmarks from "@/hooks/useBookmarks";

const BookmarksRow = () => {
  const { bookmarks, deleteBookmark, setBookmark } = useBookmarks();
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleBookmarks = async (repo: Repo) => {
    if (
      bookmarks &&
      bookmarks.findIndex((result) => result.id === repo?.id) !== -1
    ) {
      deleteBookmark(repo);
      return;
    }

    setBookmark(repo);
  };

  if (!bookmarks) return null;

  return (
    <div className="relative">
      <div className="flex items-center px-6 md:px-12">
        <h2 className="inline cursor-pointer text-sm font-semibold transition duration-200 hover:text-white md:text-2xl">
          My Bookmarks
        </h2>
      </div>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleClick("left")}
          className={`text-black absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
        />
        <div
          ref={rowRef}
          className="flex py-8 px-6 scrollbar-hide items-center gap-4 overflow-x-scroll md:px-12"
        >
          {bookmarks.map((repo) => (
            <Thumbnail
              key={repo.id}
              repo={repo as Repo}
              starred={
                bookmarks.findIndex((result) => result.id === repo.id) !== -1
              }
              onClickStar={() => handleBookmarks(repo as Repo)}
            />
          ))}
        </div>
      </div>
      <ChevronRightIcon
        onClick={() => handleClick("right")}
        className="text-black absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
      />
    </div>
  );
};

export default BookmarksRow;

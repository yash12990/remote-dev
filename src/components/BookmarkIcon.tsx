import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkContext } from "../lib/hooks";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarkContext();

  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(id);
        e.stopPropagation(); // TO STOP BUBBLING SO THAT ON CLICKING BOOKMARK, CONTENT DOESNOT OPEN
        e.preventDefault(); // TO PREVENT DEFAULT BEHAVIOUR OF <a></a> SO CONTENT DOESNOT OPEN
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}

import { forwardRef } from "react";
import { useBookmarkContext } from "../lib/hooks";
import JobList from "./JobList";
import { createPortal } from "react-dom";

type BookmarksPopoverProps = {
  isOpen: boolean;
};
const BookmarksPopover = forwardRef<HTMLDivElement, BookmarksPopoverProps>(
  function ({ isOpen }, ref) {
    const { bookmarkedJobItems, isLoading } = useBookmarkContext();

    return createPortal(
      <div className="bookmarks-popover">
        <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
      </div>,
      document.body
    );
  }
);

export default BookmarksPopover;

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";
import { useJobItemsContext } from "../lib/hooks";

export default function PaginationControls() {
  const { currentPage, handlePageChange, numberOfPages } = useJobItemsContext();
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButtons
          currentPage={currentPage}
          direction={"prev"}
          onClick={() => handlePageChange("prev")}
        />
      )}
      {currentPage < numberOfPages && (
        <PaginationButtons
          currentPage={currentPage}
          direction={"next"}
          onClick={() => handlePageChange("next")}
        />
      )}
    </section>
  );
}

type PaginationButtonsProps = {
  currentPage: number;
  direction: PageDirection;
  onClick: () => void;
};
function PaginationButtons({
  currentPage,
  direction,
  onClick,
}: PaginationButtonsProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget .blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "prev" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}

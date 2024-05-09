import { useJobItemsContext } from "../lib/hooks";

export default function   SortingControls() {
  const { handleSortByChange, sortBy } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingControlButtons
        onClick={() => handleSortByChange("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingControlButtons>

      <SortingControlButtons
        onClick={() => handleSortByChange("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingControlButtons>
    </section>
  );
}

type SortingControlButtonsProps = {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
};

function SortingControlButtons({
  children,
  onClick,
  isActive,
}: SortingControlButtonsProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {children}
    </button>
  );
}

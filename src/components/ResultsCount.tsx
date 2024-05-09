import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const { numberOfJobItems } = useJobItemsContext();
  return (
    <p className="count">
      <span className="u-bold">{numberOfJobItems}</span> results
    </p>
  );
}

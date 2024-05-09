import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { JobItem } from "../lib/types";
import { useActiveId } from "../lib/hooks";

export type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
  // isActive: number;
  // setIsActive: (value: number) => void;
};
export function JobList({ jobItems, isLoading }: JobListProps) {
  const isActive = useActiveId();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => {
          return (
            <JobListItem
              key={jobItem.id}
              jobItem={jobItem}
              isActive={jobItem.id === isActive}
            />
          );
        })}
    </ul>
  );
}

export default JobList;

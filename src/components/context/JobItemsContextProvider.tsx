import { createContext, useState } from "react";
import { useSearchQuery, useSearchTextContext,  } from "../../lib/hooks";
import { RESULT_PER_PAGE } from "../../lib/constants/constants";
import { JobItem, PageDirection, SortBy } from "../../lib/types";

type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  currentPage: number;
  numberOfPages: number;
  numberOfJobItems: number;
  sortBy: SortBy
  handlePageChange: (direction: PageDirection) => void;
  handleSortByChange: (newSortBy: SortBy) => void; 
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const { debouncedSearchText } = useSearchTextContext()

    const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortBy>("relevant");
  
  
    // DERIVED VALUES
    const numberOfJobItems = jobItems?.length || 0;
    const numberOfPages = numberOfJobItems / RESULT_PER_PAGE;
  
  // This line will update the jobItems array. To avoid this:
    // const jobItemsSorted = jobItems?.sort((a, b) => {
  // ** This line will create a new array from jobItems and spread it. If it is empty so an empty array will be passed **
    const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {   
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    }) || [];
  
    // const jobItemsSliced = jobItems?.slice(0, 7) || [];
    const jobItemsSortedAndSliced =
      jobItemsSorted.slice(
        currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
        currentPage * RESULT_PER_PAGE
      );
  
  
  // EVENT HANDLERS
    const handlePageChange = (direction: PageDirection ) => {
      if (direction === "next") {
        setCurrentPage(currentPage + 1);
      } else if (direction === "prev") {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleSortByChange = (newSortBy: SortBy) => {
      setCurrentPage(1);
      setSortBy(newSortBy);
    };
    
  return (
    <JobItemsContext.Provider
      value={{
        jobItems,
        jobItemsSortedAndSliced,
        isLoading, 
        currentPage,
        numberOfPages,
        numberOfJobItems,
        sortBy,
        handlePageChange,
        handleSortByChange,
        
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}

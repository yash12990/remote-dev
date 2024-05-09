import { useContext, useEffect, useState } from "react";
import { BASE_API_URL } from "./constants/constants";
import { JobItem, JobItemExpanded } from "./types";
import { handleError } from "./utils";
import { useQueries, useQuery } from "@tanstack/react-query";
import { BookmarksContext } from "../components/context/BookmarksContextProvider";
import { ActiveIdContext } from "../components/context/ActiveIdContextProvider";
import { SearchTextContext } from "../components/context/SearchTextContextProvider";
import { JobItemsContext } from "../components/context/JobItemsContextProvider";
// import toast from "react-hot-toast";

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
      // onError: (error) => {
      //   toast.error(error.description);
      // }
    }
  );

  return {
    jobItem: data?.jobItem,
    isLoading: isInitialLoading,
  } as const;
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    // .filter((jobItem) => jobItem !== undefined);
    .filter((jobItem) => Boolean(jobItem)) as JobItemExpanded[];
  const isLoading = results.some((result) => result.isLoading);

  return {
    jobItems,
    isLoading,
  } as const;
}

// -------------------------------------------------------------//

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

// FETCHING JOBITEMS WITHOUT useQuery()
// export function useSearchQuery(searchText: string) {
//   const [jobItems, setJobItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // const jobItemsSliced = jobItems.slice(0, 7);
//   // const numberOfJobItems = jobItems.length;

//   useEffect(() => {
//     if (searchText === "") return;

//     const fetchData = async () => {
//       setIsLoading(true);
//       // const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`);
//       const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
//       const data = await response.json();
//       // console.log(data);
//       setIsLoading(false);
//       setJobItems(data.jobItems);
//     };
//     fetchData();
//   }, [searchText]);

//   return { jobItems, isLoading } as const;
// }
export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      // onError: (error) => {
      //   toast.error(error.message)
      // }
      onError: handleError,
    }
  );

  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading,
  } as const;
}

// -------------------------------------------------------------//

export function useActiveId() {
  const [isActive, setIsActive] = useState<number | null>(null);
  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1); // + symbol is used to convert string to number to assign to isActive
      setIsActive(id);
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return isActive;
}

// export function useJobItem(activeId: number | null) {
//   const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!activeId) return;

//     const fetchData = async () => {
//       setIsLoading(true);
//       const response = await fetch(`${BASE_API_URL}/${activeId}`);
//       const data = await response.json();
//       setIsLoading(false);
//       setJobItem(data.jobItem);
//       // console.log(data.jobItem);
//     };
//     fetchData();
//   }, [activeId]);

//   return { jobItem, isLoading };
// }

export function useDebounce<T>(value: T, delay = 500): T {
  // Here "T" is used to indicate that same data type is returned as input. And the delay is coded with '=500', this sets default value of delay to be 500  ---GENERIC---
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // It clears the timeout when the component unmounts or when value changes before the delay has elapsed.
    };
  }, [value, delay]);

  return debouncedValue;
}

// ----------------------------------------------------------------

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

// ----------------------------------------------------------------

export const useOnClickOutside = (refs: React.RefObject<HTMLElement>[], handler: () => void) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        // !e.target.closest(".bookmarks-btn") &&
        // !e.target.closest(".bookmarks-popover")
      //  !buttonRef.current?.contains(e.target) &&
      //  !popoverRef.current?.contains(e.target)
       refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        handler();
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
}

// ----------------------------------------------------------------

export function useBookmarkContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksContextProvider"
    );
  }
  return context;
}

// ----------------------------------------------------------------

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useActiveIdContext must be used within a ActiveIdContextProvider"
    );
  }
  return context;
}

// ----------------------------------------------------------------

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext must be used within a SearchTextContextProvider"
    );
  }
  return context;
}

// ----------------------------------------------------------------

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "useJobItemsContext must be used within a JobItemsContextProvider"
    );
  }
  return context;
} 
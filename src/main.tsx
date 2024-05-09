import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarkContextProvider from "./components/context/BookmarksContextProvider.tsx";
import ActiveIdContextProvider from "./components/context/ActiveIdContextProvider.tsx";
import SearchTextContextProvider from "./components/context/SearchTextContextProvider.tsx";
import JobItemsContextProvider from "./components/context/JobItemsContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BookmarkContextProvider>
      <ActiveIdContextProvider>
        <SearchTextContextProvider>
          <JobItemsContextProvider>
            <App />
          </JobItemsContextProvider>
        </SearchTextContextProvider>
      </ActiveIdContextProvider>
    </BookmarkContextProvider>
  </QueryClientProvider>
  /* </React.StrictMode> */
);

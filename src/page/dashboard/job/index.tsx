import { useJobs } from "@/api/api-hooks/useJobs";
import { GetJobsParams, JobStatus } from "@/api/api-types/job.types";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import SearchAndFilterBar from "../user/search-filter-bar";
import JobManagementTable from "./job-management-table";

export const Job = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [currentFilter, setCurrentFilter] = useState<JobStatus | "all">("all");
  const [page] = useState(1);

  const handleSearchSubmit = (query: string, filter: string) => {
    setSearchQuery(query);
    setCurrentFilter(filter as JobStatus | "all");
  };

  const handleFilterSelection = (filter: string, query: string) => {
    setCurrentFilter(filter as JobStatus | "all");
    setSearchQuery(query);
  };

  const statusOptions = ["all", "open", "in-progress", "completed", "cancelled"];

  const params: GetJobsParams = {
    search: debouncedSearchQuery || undefined,
    status: currentFilter !== "all" ? (currentFilter as JobStatus) : undefined,
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  const { data, isLoading, error } = useJobs(params);

  return (
    <div>
      <SearchAndFilterBar
        onSearch={handleSearchSubmit}
        onFilterChange={handleFilterSelection}
        filterOptions={statusOptions}
      />
      <div>
        <JobManagementTable jobs={data?.data.jobs} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

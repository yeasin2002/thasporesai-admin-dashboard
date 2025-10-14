import SearchAndFilterBar from "../user/search-filter-bar";
import JobManagementTable from "./job-management-table";

export const Job = () => {
  const handleSearchSubmit = (query: string, filter: string) => {
    console.log(`Searching for: "${query}" in the "${filter}" category.`);
  };

  const handleFilterSelection = (filter: string, query: string) => {
    console.log(`Filter changed to: "${filter}". Current search is: "${query}".`);
  };

  const myFilterOptions = ["All Status", "Pending", "Active", "Cancel"];
  return (
    <div>
      <SearchAndFilterBar
        onSearch={handleSearchSubmit}
        onFilterChange={handleFilterSelection}
        filterOptions={myFilterOptions}
      />
      <div>
        <JobManagementTable />
      </div>
    </div>
  );
};

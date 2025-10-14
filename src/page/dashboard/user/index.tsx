import SearchAndFilterBar from "./search-filter-bar";
import UserTable from "./user-table";

export const User = () => {
  const handleSearchSubmit = (query: string, filter: string) => {
    console.log(`Searching for: "${query}" in the "${filter}" category.`);
  };

  const handleFilterSelection = (filter: string, query: string) => {
    console.log(`Filter changed to: "${filter}". Current search is: "${query}".`);
  };

  const myFilterOptions = ["Users", "Teams", "Documents", "Archived"];
  return (
    <div>
      <SearchAndFilterBar
        onSearch={handleSearchSubmit}
        onFilterChange={handleFilterSelection}
        filterOptions={myFilterOptions}
      />
      <div>
        <UserTable />
      </div>
    </div>
  );
};

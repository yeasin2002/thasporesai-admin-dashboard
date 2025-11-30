import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import SearchAndFilterBar from "./search-filter-bar";

import { useUsers } from "@/api/api-hooks/useUsers";
import { GetUsersParams, UserRole } from "@/api/api-types/user.types";
import { useDebounce } from "@uidotdev/usehooks";
import { UserTable } from "./user-table";



export const User = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [currentFilter, setCurrentFilter] = useState("asc");
  const [page, setPage] = useState(1);
  const [activeTabName, setActiveTabName] = useState<UserRole | null>(null);

  const handleSearchSubmit = (query: string, filter: string) => {
    console.log(`Searching for: "${query}" in the "${filter}" category.`);
    setSearchQuery(query);
    setCurrentFilter(filter);
    setPage(1);
  };

  const handleFilterSelection = (filter: string, query: string) => {
    console.log(`Filter changed to: "${filter}". Current search is: "${query}".`);
    setCurrentFilter(filter);
    setSearchQuery(query);
    setPage(1);
  };

  const sortOrder = ["asc", "desc"];
  const params: GetUsersParams = {
    search: debouncedSearchQuery || undefined,
    role: activeTabName || undefined,
    sortBy: "createdAt",
    sortOrder: currentFilter as "asc" | "desc",
    page,
    limit: 10,
  };

  const { data } = useUsers(params);
  console.log("🚀 ~ User ~ data:", data);

  return (
    <div>
      <SearchAndFilterBar
        onSearch={handleSearchSubmit}
        onFilterChange={handleFilterSelection}
        filterOptions={sortOrder}
      />
      <div>
        <Tabs>
          <TabList className="my-6 flex gap-4">
            <Tab
              className="react-tabs__tab--selected:font-bold text-[18px] text-[#13527F]"
              onClick={() => setActiveTabName("customer")}
            >
              Customers
            </Tab>

            <Tab
              className="react-tabs__tab--selected:font-bold text-[18px] text-[#13527F]"
              onClick={() => setActiveTabName("contractor")}
            >
              Contractors
            </Tab>
          </TabList>

          <TabPanel>
            <UserTable users={data?.data.users} />
          </TabPanel>
          <TabPanel>
            <UserTable users={data?.data.users} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

import ContractorTable from "./constructor-table";
import SearchAndFilterBar from "./search-filter-bar";
import UserTable from "./user-table";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export const User = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchSubmit = (query: string, filter: string) => {
    console.log(`Searching for: "${query}" in the "${filter}" category.`);
    setSearchQuery(query);
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
        <Tabs>
          <TabList className="my-6 flex gap-4">
            <Tab className="react-tabs__tab--selected:font-bold text-[18px] text-[#13527F]">
              Customers
            </Tab>

            <Tab className="react-tabs__tab--selected:font-bold text-[18px] text-[#13527F]">
              Contructors
            </Tab>
          </TabList>

          <TabPanel>
            <UserTable searchTerm={searchQuery} />
          </TabPanel>
          <TabPanel>
            <ContractorTable searchTerm={searchQuery} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

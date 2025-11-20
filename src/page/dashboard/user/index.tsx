import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { ContractorTable } from "./constructor-table";
import SearchAndFilterBar from "./search-filter-bar";
import { CustomerTable } from "./user-table-container";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const User = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState("asc");
  const [page, setPage] = useState(1);

  const handleSearchSubmit = (query: string, filter: string) => {
    console.log(`Searching for: "${query}" in the "${filter}" category.`);
    setSearchQuery(query);
    setCurrentFilter(filter);
    setPage(1); // Reset to first page on new search
  };

  const handleFilterSelection = (filter: string, query: string) => {
    console.log(`Filter changed to: "${filter}". Current search is: "${query}".`);
    setCurrentFilter(filter);
    setSearchQuery(query);
    setPage(1); // Reset to first page on filter change
  };

  const sortOrder = ["asc", "desc"];

  const searchParams = {
    search: searchQuery || undefined,
    sortOrder: currentFilter as "asc" | "desc",
    page,
    limit: 10,
  };

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
            <Tab className="react-tabs__tab--selected:font-bold text-[18px] text-[#13527F]">
              Customers
            </Tab>

            <Tab className="react-tabs__tab--selected:font-bold text-[18px] text-[#13527F]">
              Contractors
            </Tab>
          </TabList>

          <TabPanel>
            <CustomerTable searchParams={searchParams} />
          </TabPanel>
          <TabPanel>
            <ContractorTable searchParams={searchParams} />
          </TabPanel>
        </Tabs>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" size={undefined} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size={undefined}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" size={undefined} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

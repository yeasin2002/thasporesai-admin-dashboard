import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { ContractorTable } from "./constructor-table";
import { PaginationControls } from "./pagination-controls";
import SearchAndFilterBar from "./search-filter-bar";
import { CustomerTable } from "./user-table-container";

import type { Pagination } from "@/api/api-types/user.types";
import { useDebounce } from "@uidotdev/usehooks";

export const User = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [currentFilter, setCurrentFilter] = useState("asc");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0); // Track which tab is active

  // Separate pagination states for customers and contractors
  const [customerPagination, setCustomerPagination] = useState<Pagination | null>(null);
  const [contractorPagination, setContractorPagination] = useState<Pagination | null>(null);

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
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setPage(1); // Reset page when switching tabs
  };

  const sortOrder = ["asc", "desc"];

  const searchParams = {
    search: debouncedSearchQuery || undefined,
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
        <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
          <TabList className="my-6 flex gap-4">
            <Tab className="react-tabs__tab--selected:font-bold text-[18px] text-[#13527F]">
              Customers
            </Tab>

            <Tab className="react-tabs__tab--selected:font-bold text-[18px] text-[#13527F]">
              Contractors
            </Tab>
          </TabList>

          <TabPanel>
            <CustomerTable searchParams={searchParams} onPaginationChange={setCustomerPagination} />
          </TabPanel>
          <TabPanel>
            <ContractorTable
              searchParams={searchParams}
              onPaginationChange={setContractorPagination}
            />
          </TabPanel>
        </Tabs>
      </div>

      {/* Dynamic pagination controls - show based on active tab */}
      {activeTab === 0 && customerPagination && (
        <PaginationControls
          currentPage={customerPagination.currentPage}
          totalPages={customerPagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={customerPagination.hasNextPage}
          hasPrevPage={customerPagination.hasPrevPage}
        />
      )}
      {activeTab === 1 && contractorPagination && (
        <PaginationControls
          currentPage={contractorPagination.currentPage}
          totalPages={contractorPagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={contractorPagination.hasNextPage}
          hasPrevPage={contractorPagination.hasPrevPage}
        />
      )}
    </div>
  );
};

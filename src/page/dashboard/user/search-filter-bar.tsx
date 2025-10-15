import React, { useState } from "react";

interface SearchAndFilterBarProps {
  onSearch?: (query: string, filter: string) => void;
  onFilterChange?: (filter: string, query: string) => void;
  filterOptions?: string[];
}

const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  onSearch,
  onFilterChange,
  filterOptions = ["Customers", "Employees", "Projects"],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState(filterOptions[0]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (onSearch) {
      onSearch(query, filterValue);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFilterValue(value);
    if (onFilterChange) {
      onFilterChange(value, searchQuery);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-[#F8F8F8] p-5 shadow-sm mb-4">
      {/* Search Input Field */}
      <div className="relative mr-4 flex-grow">
        <input
          type="text"
          placeholder="Search by Name or Skills"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-1/2 rounded-md border bg-white py-3 pr-4 pl-10 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Filter Dropdown Menu */}
      <div className="relative">
        <select
          value={filterValue}
          onChange={handleFilterChange}
          className="block w-full cursor-pointer appearance-none rounded-md border border-gray-200 bg-white py-2 pr-8 pl-4 leading-tight text-gray-700 shadow-sm transition-colors focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;

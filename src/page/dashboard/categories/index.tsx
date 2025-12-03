import { useCategories } from "@/api/api-hooks/useCategories";
import { GetCategoriesParams } from "@/api/api-types/category.types";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import SearchAndFilterBar from "../user/search-filter-bar";
import AddCategoryDialog from "./add-category-dialog";
import CategoryTable from "./category-table";

export const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [currentFilter, setCurrentFilter] = useState("desc");
  const [page] = useState(1);

  const handleSearchSubmit = (query: string, filter: string) => {
    setSearchQuery(query);
    setCurrentFilter(filter);
  };

  const handleFilterSelection = (filter: string, query: string) => {
    setCurrentFilter(filter);
    setSearchQuery(query);
  };

  const sortOrder = ["asc", "desc"];

  const params: GetCategoriesParams = {
    search: debouncedSearchQuery || undefined,
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: currentFilter as "asc" | "desc",
  };

  const { data, isLoading, error } = useCategories(params);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <SearchAndFilterBar
          onSearch={handleSearchSubmit}
          onFilterChange={handleFilterSelection}
          filterOptions={sortOrder}
        />
        <AddCategoryDialog />
      </div>
      <div>
        <CategoryTable categories={data?.data.categories} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

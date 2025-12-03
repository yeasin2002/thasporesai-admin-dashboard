import { useInfiniteLocations } from "@/api/api-hooks/useLocations";
import { GetLocationsParams } from "@/api/api-types/location.types";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import SearchAndFilterBar from "../user/search-filter-bar";
import AddLocationDialog from "./add-location-dialog";
import LocationTable from "./location-table";

export const Locations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterSelection = (_filter: string, query: string) => {
    setSearchQuery(query);
  };

  const params: Omit<GetLocationsParams, "page"> = {
    search: debouncedSearchQuery || undefined,
    limit: 10,
  };

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteLocations(params);

  const allLocations = data?.pages.flatMap((page) => page.data.locations) ?? [];
  const totalCount = data?.pages[0]?.data.total ?? 0;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <SearchAndFilterBar
          onSearch={handleSearchSubmit}
          onFilterChange={handleFilterSelection}
          filterOptions={[]}
          className="w-full"
          inputPlaceholder="Search by location name"
        >
          <AddLocationDialog />
        </SearchAndFilterBar>
      </div>
      <div>
        <LocationTable
          locations={allLocations}
          isLoading={isLoading}
          error={error}
          onLoadMore={fetchNextPage}
          hasMore={hasNextPage}
          isLoadingMore={isFetchingNextPage}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

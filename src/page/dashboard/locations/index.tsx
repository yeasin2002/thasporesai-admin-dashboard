import { useLocations } from "@/api/api-hooks/useLocations";
import AddLocationDialog from "./add-location-dialog";
import LocationTable from "./location-table";

export const Locations = () => {
  const { data, isLoading, error } = useLocations();

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <AddLocationDialog />
      </div>
      <div>
        <LocationTable locations={data?.data} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

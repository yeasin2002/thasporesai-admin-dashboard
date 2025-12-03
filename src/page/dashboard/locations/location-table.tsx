import { useDeleteLocation } from "@/api/api-hooks/useLocations";
import { Location } from "@/api/api-types/location.types";
import { TableSkeletonLoader } from "@/components/shared/table-skeleton-loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  locations: Location[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
}

const LocationTable = ({ locations, isLoading, error }: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const deleteMutation = useDeleteLocation();

  const handleDeleteClick = (id: string) => {
    setSelectedLocationId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedLocationId) return;

    try {
      await deleteMutation.mutateAsync(selectedLocationId);
      toast.success("Location deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedLocationId(null);
    } catch (error) {
      console.log("🚀 ~ handleDeleteConfirm ~ error:", error);
      toast.error("Failed to delete location");
    }
  };

  if (isLoading) {
    return <TableSkeletonLoader rows={5} columns={5} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!locations || locations.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-gray-500">No locations found</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl bg-[#F8F8F8] p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold text-[#000000]">Location Management</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location._id} className="*:py-3">
                  <TableCell className="font-medium">{location.name}</TableCell>
                  <TableCell>{location.state}</TableCell>
                  <TableCell>{location.coordinates.lat.toFixed(4)}</TableCell>
                  <TableCell>{location.coordinates.lng.toFixed(4)}</TableCell>
                  <TableCell>{new Date(location.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(location._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the location.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LocationTable;

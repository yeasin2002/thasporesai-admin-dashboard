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
import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  locations: Location[];
  isLoading?: boolean;
  error?: Error | null;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  totalCount?: number;
}

const LocationTable = ({
  locations,
  isLoading,
  error,
  onLoadMore,
  hasMore,
  isLoadingMore,
  totalCount,
}: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const deleteMutation = useDeleteLocation();
  const observerTarget = useRef<HTMLDivElement>(null);

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

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && onLoadMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, onLoadMore]);

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
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#000000]">Location Management</h2>
          {totalCount !== undefined && (
            <p className="text-sm text-gray-500">
              Showing {locations.length} of {totalCount} locations
            </p>
          )}
        </div>
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

        {/* Infinite scroll trigger */}
        <div ref={observerTarget} className="py-4 text-center">
          {isLoadingMore && (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-[#13527F]" />
              <span className="text-sm text-gray-500">Loading more locations...</span>
            </div>
          )}
          {!hasMore && locations.length > 0 && (
            <p className="text-sm text-gray-500">No more locations to load</p>
          )}
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

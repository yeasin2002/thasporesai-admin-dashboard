import { useDeleteCategory } from "@/api/api-hooks/useCategories";
import { Category } from "@/api/api-types/category.types";
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
import { getImageUrl } from "@/utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  categories: Category[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
}

const CategoryTable = ({ categories, isLoading, error }: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const deleteMutation = useDeleteCategory();

  const handleDeleteClick = (id: string) => {
    setSelectedCategoryId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategoryId) return;

    try {
      await deleteMutation.mutateAsync(selectedCategoryId);
      toast.success("Category deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedCategoryId(null);
    } catch (error) {
      console.log("🚀 ~ handleDeleteConfirm ~ error:", error);
      toast.error("Failed to delete category");
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

  if (!categories || categories.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-gray-500">No categories found</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl bg-[#F8F8F8] p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold text-[#000000]">Category Management</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id} className="*:py-3">
                  <TableCell>
                    {category.icon ? (
                      <img
                        src={getImageUrl(category.icon)}
                        alt={category.name}
                        className="size-6 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-gray-500">
                        N/A
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium capitalize">{category.name}</TableCell>
                  <TableCell>{category.description || "N/A"}</TableCell>
                  <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(category._id)}
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
              This action cannot be undone. This will permanently delete the category.
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

export default CategoryTable;

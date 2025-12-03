import { useCreateCategory } from "@/api/api-hooks/useCategories";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props extends React.ComponentProps<"button"> {}

const AddCategoryDialog = ({ className, ...props }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const createMutation = useCreateCategory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!icon) {
      toast.error("Category icon is required");
      return;
    }

    try {
      await createMutation.mutateAsync({
        name: name.trim(),
        description: description.trim(),
        icon,
      });
      toast.success("Category created successfully");
      setOpen(false);
      setName("");
      setDescription("");
      setIcon(null);
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      toast.error("Failed to create category");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIcon(file);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className={cn("bg-[#13527F] hover:bg-[#0f3f63]", className)} {...props}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Category</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new category for jobs. Fill in the details below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Plumber"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the category"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon Image *</Label>
              <Input id="icon" type="file" accept="image/*" onChange={handleFileChange} required />
              {icon && <p className="text-sm text-gray-500">Selected: {icon.name}</p>}
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-[#13527F] hover:bg-[#0f3f63]"
            >
              {createMutation.isPending ? "Creating..." : "Create Category"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddCategoryDialog;

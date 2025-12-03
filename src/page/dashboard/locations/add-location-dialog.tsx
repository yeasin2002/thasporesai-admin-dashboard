import { useCreateLocation } from "@/api/api-hooks/useLocations";
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
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddLocationDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const createMutation = useCreateLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Location name is required");
      return;
    }

    if (!state.trim()) {
      toast.error("State code is required");
      return;
    }

    if (!lat || !lng) {
      toast.error("Coordinates are required");
      return;
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      toast.error("Invalid coordinates");
      return;
    }

    try {
      await createMutation.mutateAsync({
        name: name.trim(),
        state: state.trim().toUpperCase(),
        coordinates: {
          lat: latitude,
          lng: longitude,
        },
      });
      toast.success("Location created successfully");
      setOpen(false);
      setName("");
      setState("");
      setLat("");
      setLng("");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      toast.error("Failed to create location");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-[#13527F] hover:bg-[#0f3f63]">
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Location</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new location. Fill in the details below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Location Name *</Label>
              <Input
                id="name"
                placeholder="e.g., New York"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State Code *</Label>
              <Input
                id="state"
                placeholder="e.g., NY"
                value={state}
                onChange={(e) => setState(e.target.value)}
                maxLength={2}
                required
              />
              <p className="text-xs text-gray-500">2-letter state code (e.g., NY, CA)</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lat">Latitude *</Label>
                <Input
                  id="lat"
                  type="number"
                  step="any"
                  placeholder="e.g., 40.7128"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lng">Longitude *</Label>
                <Input
                  id="lng"
                  type="number"
                  step="any"
                  placeholder="e.g., -74.0060"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-[#13527F] hover:bg-[#0f3f63]"
            >
              {createMutation.isPending ? "Creating..." : "Create Location"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddLocationDialog;

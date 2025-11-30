import { useJob } from "@/api/api-hooks/useJobs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Eye } from "lucide-react";

interface JobProfileViewProps {
  id: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function JobProfileView({ id, isOpen, onOpenChange }: JobProfileViewProps) {
  const { data, isLoading } = useJob(id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{data?.data?.title}</SheetTitle>
          <SheetDescription>Job Details</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {data?.data?.coverImg && (
            <div>
              <img
                src={data.data.coverImg}
                alt={data.data.title}
                className="h-48 w-full rounded-lg object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-base">{data?.data?.description || "No description provided"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Budget</p>
                <p className="text-base font-semibold">${data?.data?.budget}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="text-base font-semibold capitalize">{data?.data?.status}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-base">
                  {typeof data?.data?.location === "string"
                    ? data.data.location
                    : data?.data?.location?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-base">{data?.data?.address || "N/A"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Date</p>
              <p className="text-base">
                {data?.data?.date ? new Date(data.data.date).toLocaleDateString() : "N/A"}
              </p>
            </div>

            {data?.data?.category && data.data.category.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-500">Categories</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.data.category.map((cat, index) => (
                    <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                      {typeof cat === "string" ? cat : cat.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Customer</p>
                {typeof data?.data?.customerId === "string" ? (
                  <p className="text-base">{data.data.customerId}</p>
                ) : data?.data?.customerId ? (
                  <div className="text-base">
                    <p className="font-medium">ID: {data.data.customerId._id}</p>
                    <p className="text-sm text-gray-600">Email: {data.data.customerId.email}</p>
                    <p className="text-sm text-gray-600">Phone: {data.data.customerId.phone}</p>
                  </div>
                ) : (
                  <p className="text-base">N/A</p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Contractor</p>
                {typeof data?.data?.contractorId === "string" ? (
                  <p className="text-base">{data.data.contractorId}</p>
                ) : data?.data?.contractorId ? (
                  <div className="text-base">
                    <p className="font-medium">ID: {data.data.contractorId._id}</p>
                    <p className="text-sm text-gray-600">Email: {data.data.contractorId.email}</p>
                    <p className="text-sm text-gray-600">Phone: {data.data.contractorId.phone}</p>
                  </div>
                ) : (
                  <p className="text-base">N/A</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Applied</p>
                <p className="text-base">{data?.data?.isApplied ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4 text-sm text-gray-500">
              <div>
                <p className="font-medium">Created At</p>
                <p>{new Date(data?.data?.createdAt || "").toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-medium">Updated At</p>
                <p>{new Date(data?.data?.updatedAt || "").toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

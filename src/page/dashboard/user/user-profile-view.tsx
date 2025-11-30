import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useUserById } from "@/api/api-hooks/useUsers";
import { Eye } from "lucide-react";

export const UserProfile = ({ id }: { id: string }) => {
  const { data } = useUserById(id);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Eye className="size-4 cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{data?.data?.full_name}</SheetTitle>
            <SheetDescription>{data?.data?.email}</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-4">
              {data?.data?.profile_img ? (
                <img
                  src={data.data.profile_img}
                  alt={data.data.full_name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl font-semibold text-gray-600">
                  {data?.data?.full_name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-base font-semibold capitalize">{data?.data?.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Bio</p>
                <p className="text-base">{data?.data?.bio || "No bio provided"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-base">{data?.data?.description || "No description provided"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-base">{data?.data?.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-base">{data?.data?.address || "N/A"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Verified</p>
                  <p className="text-base">{data?.data?.is_verified ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Suspended</p>
                  <p className="text-base">{data?.data?.isSuspend ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Starting Budget</p>
                  <p className="text-base">${data?.data?.starting_budget || 0}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Hourly Charge</p>
                  <p className="text-base">${data?.data?.hourly_charge || 0}/hr</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Total Jobs</p>
                <p className="text-base">{data?.data?.total_jobs || 0}</p>
              </div>

              {data?.data?.skills && data.data.skills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Skills</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.data.skills.map((skill: string, index: number) => (
                      <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data?.data?.location && data.data.location.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-base">{data?.data?.location?.join(", ")}</p>
                </div>
              )}

              {data?.data?.category && data.data.category.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Categories</p>
                  <p className="text-base">{data.data.category.join(", ")}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 border-t pt-4 text-sm text-gray-500">
                <div>
                  <p className="font-medium">Joined At</p>
                  <p>{new Date(data?.data?.createdAt || "").toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

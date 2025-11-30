import { User } from "@/api/api-types/user.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useUserById } from "@/api/api-hooks/useUsers";
import { EllipsisVertical, Eye } from "lucide-react";
import { Suspense } from "react";

interface Props extends React.ComponentProps<"div"> {
  users: User[] | undefined;
}

export function UserTable({ users }: Props) {
  if (!users) return null;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>address</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id} className="*:py-3">
            <TableCell className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.profile_img || ""} />
                <AvatarFallback className="uppercase">
                  {user?.full_name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span>{user?.full_name || ""}</span>
            </TableCell>
            <TableCell>{user?.email || ""}</TableCell>
            <TableCell>{user?.phone || ""}</TableCell>
            <TableCell>{user?.address || ""}</TableCell>
            <TableCell className="flex flex-row gap-2">
              <Suspense fallback={<div>Loading...</div>}>
                <UserProfile id={user._id} />
              </Suspense>
              <EllipsisVertical className="size-4" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const UserProfile = ({ id }: { id: string }) => {
  const { data } = useUserById(id);
  console.log("🚀 ~ UserProfile ~ data:", data);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Eye className="size-4" />
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

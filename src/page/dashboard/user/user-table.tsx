import { User } from "@/api/api-types/user.types";
import { TableSkeletonLoader } from "@/components/shared/table-skeleton-loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Suspense } from "react";
import { UserProfile } from "./user-profile-view";

interface Props extends React.ComponentProps<"div"> {
  users: User[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
}

export function UserTable({ users, isLoading, error }: Props) {
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

  if (!users || users.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

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
              {/* <EllipsisVertical className="size-4" /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

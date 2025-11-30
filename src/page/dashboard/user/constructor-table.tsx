import { useUsers } from "@/api/api-hooks/useUsers";
import type { Pagination, User } from "@/api/api-types/user.types";
import React, { useMemo } from "react";
import { UserTable, type Contractor } from "./user-table";

interface ContractorTableProps {
  searchParams?: {
    search?: string;
    location?: string;
    category?: string;
    page?: number;
    limit?: number;
  };
  onPaginationChange?: (pagination: Pagination) => void;
}

export const ContractorTable: React.FC<ContractorTableProps> = ({
  searchParams,
  onPaginationChange,
}) => {
  const { data, isLoading, error } = useUsers({
    role: "contractor",
    ...searchParams,
  });

  // Notify parent of pagination changes
  React.useEffect(() => {
    if (data?.data?.pagination && onPaginationChange) {
      onPaginationChange(data.data.pagination);
    }
  }, [data?.data?.pagination, onPaginationChange]);

  const contractors: Contractor[] = useMemo(() => {
    if (!data?.data?.users) return [];

    return data.data.users.map((user: User) => ({
      id: parseInt(user._id),
      name: user.full_name,
      email: user.email,
      phone: user.phone,
      location: user.address || user.location || "N/A",
      status: user.isSuspend ? "Suspended" : "Active",
      skills: user.skills || [],
      rating: 4.5, // TODO: Add rating field to API
      reviews: 0, // TODO: Add reviews field to API
      doneJobs: user.total_jobs,
      verification: user.is_verified ? "Verified" : "Pending",
    }));
  }, [data]);

  const handleView = (id: number) => {
    console.log("View contractor:", id);
  };

  const handleSuspend = (id: number) => {
    console.log("Suspend contractor:", id);
    // TODO: Implement suspend API call
  };

  const handleDelete = (id: number) => {
    console.log("Delete contractor:", id);
    // TODO: Implement delete API call
  };

  return (
    <UserTable
      title="Contractors"
      data={contractors}
      userType="contractor"
      isLoading={isLoading}
      error={error}
      onView={handleView}
      onSuspend={handleSuspend}
      onDelete={handleDelete}
    />
  );
};

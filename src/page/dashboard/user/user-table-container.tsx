import { useUsers } from "@/api/api-hooks/useUsers";
import type { User } from "@/api/api-types/user.types";
import React, { useMemo } from "react";
import { UserTable, type Customer } from "./user-table";

interface CustomerTableProps {
  searchParams?: {
    search?: string;
    location?: string;
    category?: string;
    page?: number;
    limit?: number;
  };
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ searchParams }) => {
  const { data, isLoading, error } = useUsers({
    role: "customer",
    ...searchParams,
  });

  const customers: Customer[] = useMemo(() => {
    if (!data?.data?.users) return [];

    return data.data.users.map((user: User) => ({
      id: parseInt(user._id),
      name: user.full_name,
      email: user.email,
      phone: user.phone,
      location: user.address || user.location || "N/A",
      status: user.isSuspend ? "Suspended" : "Active",
      jobPosted: user.total_jobs,
    }));
  }, [data]);

  const handleView = (id: number) => {
    console.log("View customer:", id);
  };

  const handleSuspend = (id: number) => {
    console.log("Suspend customer:", id);
    // TODO: Implement suspend API call
  };

  const handleDelete = (id: number) => {
    console.log("Delete customer:", id);
    // TODO: Implement delete API call
  };

  return (
    <UserTable
      title="Customers"
      data={customers}
      userType="customer"
      isLoading={isLoading}
      error={error}
      onView={handleView}
      onSuspend={handleSuspend}
      onDelete={handleDelete}
    />
  );
};

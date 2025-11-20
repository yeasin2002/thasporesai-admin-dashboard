import { Button } from "@/components";
import { Eye, MoreVertical, Star, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import ProfileViewDrawer from "./user-profile-details-drawer";

export type UserStatus = "Active" | "Suspended";
export type VerificationStatus = "Verified" | "Pending";

export interface BaseUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: UserStatus;
}

export interface Customer extends BaseUser {
  jobPosted: number;
}

export interface Contractor extends BaseUser {
  skills: string[];
  rating: number;
  reviews: number;
  doneJobs: number;
  verification: VerificationStatus;
}

export type UserType = "customer" | "contractor";

interface Column<T extends BaseUser> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
}

interface UserTableProps<T extends BaseUser> {
  title: string;
  data: T[];
  userType: UserType;
  isLoading?: boolean;
  error?: Error | null;
  onView?: (id: number) => void;
  onSuspend?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function UserTable<T extends BaseUser>({
  title,
  data: initialData,
  userType,
  isLoading = false,
  error = null,
  onView,
  onSuspend,
  onDelete,
}: UserTableProps<T>) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState<T[]>(initialData);

  const handleSuspend = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Active" ? "Suspended" : "Active" }
          : item,
      ),
    );
    setOpenMenuId(null);
    onSuspend?.(id);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    setOpenMenuId(null);
    onDelete?.(id);
  };

  const handleView = (id: number) => {
    setIsDrawerOpen(true);
    setOpenMenuId(null);
    onView?.(id);
  };

  const getStatusBadge = (status: UserStatus) => (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
        status === "Active" ? "bg-green-100 text-[#0E9E4D]" : "bg-[#FFE0E0] text-[#FF000D]"
      }`}
    >
      {status}
    </span>
  );

  const getVerificationBadge = (verification: VerificationStatus) => (
    <span
      className={`inline-block rounded-lg px-3 py-1 text-xs font-medium ${
        verification === "Verified" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {verification}
    </span>
  );

  const getColumns = (): Column<T>[] => {
    if (userType === "customer") {
      return [
        { key: "name", label: "Name", render: (item) => item.name },
        { key: "email", label: "Email", render: (item) => item.email },
        { key: "phone", label: "Phone", render: (item) => item.phone },
        { key: "location", label: "Location", render: (item) => item.location },
        { key: "status", label: "Status", render: (item) => getStatusBadge(item.status) },
        {
          key: "jobPosted",
          label: "Job Posted",
          render: (item) => (item as unknown as Customer).jobPosted,
        },
      ] as Column<T>[];
    }

    return [
      { key: "name", label: "Name", render: (item) => item.name },
      {
        key: "skills",
        label: "Skills",
        render: (item) => (
          <div className="flex flex-wrap gap-2">
            {(item as unknown as Contractor).skills.map((skill, i) => (
              <Button
                key={i}
                variant="outline"
                className="mr-2 rounded-md border border-gray-300 bg-[#BDBDBD] px-3 py-1 text-xs text-[#616161] hover:bg-[#BDBDBD]"
              >
                {skill}
              </Button>
            ))}
          </div>
        ),
      },
      {
        key: "rating",
        label: "Rating",
        render: (item) => {
          const contractor = item as unknown as Contractor;
          return (
            <div className="flex items-center gap-1 text-[14px]">
              <Star size={14} className="fill-gray-500 text-gray-500" />
              {contractor.rating.toFixed(1)} ({contractor.reviews})
            </div>
          );
        },
      },
      { key: "location", label: "Location", render: (item) => item.location },
      { key: "status", label: "Status", render: (item) => getStatusBadge(item.status) },
      {
        key: "doneJobs",
        label: "Done Jobs",
        render: (item) => (item as unknown as Contractor).doneJobs,
      },
      {
        key: "verification",
        label: "Verification",
        render: (item) => getVerificationBadge((item as unknown as Contractor).verification),
      },
    ] as Column<T>[];
  };

  const columns = getColumns();

  if (error) {
    return (
      <div className="h-[100vh]">
        <div className="h-[70vh] rounded-xl p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-[#000000]">{title}</h2>
          <div className="flex h-[50vh] items-center justify-center">
            <div className="text-center">
              <p className="text-lg text-red-600">Error loading {title.toLowerCase()}</p>
              <p className="mt-2 text-sm text-gray-600">{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100vh]">
      <div className="h-[70vh] rounded-xl p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold text-[#000000]">{title}</h2>

        {isLoading ? (
          <div className="flex h-[50vh] items-center justify-center">
            <div className="text-center">
              <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="text-gray-600">Loading {title.toLowerCase()}...</p>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-[50vh] items-center justify-center">
            <p className="text-gray-600">No {title.toLowerCase()} found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="mb-32 w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-4 text-left">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    </td>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-4 ${col.key === "name" ? "text-[16px] font-medium text-[#212121]" : "text-gray-600"}`}
                      >
                        {col.render(item)}
                      </td>
                    ))}
                    <td className="relative px-4 py-4">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                        className="rounded p-1 hover:bg-gray-100"
                      >
                        <MoreVertical size={20} className="text-gray-600" />
                      </button>

                      {openMenuId === item.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                          <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                            <button
                              onClick={() => handleView(item.id)}
                              className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                            >
                              <Eye size={16} />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => handleSuspend(item.id)}
                              className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                            >
                              <X size={16} />
                              <span>
                                {item.status === "Active" ? "Suspend Account" : "Activate Account"}
                              </span>
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-gray-50"
                            >
                              <Trash2 size={16} />
                              <span>Delete Account</span>
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isDrawerOpen && <ProfileViewDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />}
    </div>
  );
}

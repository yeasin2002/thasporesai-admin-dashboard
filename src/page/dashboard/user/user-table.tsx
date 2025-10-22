import { useDebounce } from "@/hooks/useDebaunce";
import { useGetUserQuery } from "@/redux/features/user/user.api";
import { Eye, MoreVertical, Trash2, X } from "lucide-react";
import { useState } from "react";
import { User } from "./types";
import ProfileViewDrawer from "./user-profile-details-drawer";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "Suspended" | "View";
  jobPosted: number;
}

const UserTable = ({ searchTerm }: { searchTerm: string }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { data } = useGetUserQuery(debouncedSearch);

  const handleSuspend = (id: string | number) => {
    setCustomers(
      customers.map((c) =>
        c.id === id ? { ...c, status: c.status === "Active" ? "Suspended" : "Active" } : c,
      ),
    );
    setOpenMenuId(null);
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
    setOpenMenuId(null);
  };
  const handleView = (id: string) => {
    console.log(id);
    setIsOpen(true);
  };

  return (
    <div className="h-[100vh]">
      <div className="h-[70vh] rounded-xl p-6 shadow-sm">
        <h2 className="f mb-6 text-2xl font-semibold text-[#000000]">Customers</h2>

        <div className="overflow-x-auto">
          <table className="mb-32 w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-4 text-left">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">Name</th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Email
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Phone
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Location
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Job Posted
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data && data.data.length > 0 ? (
                data.data.map((customer: User) => (
                  <tr
                    key={customer._id}
                    className="border-b border-gray-100 transition-colors duration-150 hover:bg-gray-50"
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-4 py-4 text-[15px] font-medium whitespace-nowrap text-gray-900">
                      {customer.full_name || "N/A"}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-600">
                      {customer.email || "N/A"}
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-600">
                      {customer.phone || "N/A"}
                    </td>

                    {/* Location */}
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-600">
                      {customer.location || "—"}
                    </td>

                    {/* Account Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          customer.account_status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {customer.account_status}
                      </span>
                    </td>

                    {/* Job Posted */}
                    <td className="px-4 py-4 text-center text-sm text-gray-700">
                      {customer.jobPosted || 0}
                    </td>

                    {/* Actions */}
                    <td className="relative px-4 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === customer._id ? null : customer._id)
                        }
                        className="rounded p-1 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <MoreVertical size={18} className="text-gray-600" />
                      </button>

                      {openMenuId === customer._id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                          <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                            <button
                              onClick={() => handleView(customer._id)}
                              className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                            >
                              <Eye size={16} />
                              <span>View</span>
                            </button>

                            <button
                              onClick={() => handleSuspend(customer._id)}
                              className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                            >
                              <X size={16} />
                              <span>
                                {customer.account_status === "active"
                                  ? "Suspend Account"
                                  : "Activate Account"}
                              </span>
                            </button>

                            <button
                              onClick={() => handleDelete(customer._id)}
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
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="bg-gray-50 py-8 text-center text-sm text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>

            {isOpen && isOpen && <ProfileViewDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;

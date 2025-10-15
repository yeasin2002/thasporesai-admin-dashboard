import React, { useState } from "react";
import { MoreVertical, X, Trash2, Eye } from "lucide-react";
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

const UserTable: React.FC = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Jessica Lee",
      email: "rajasif84@gmail.com",
      phone: "01309242235",
      location: "Bohimiya, Planvilla, USA",
      status: "Active",
      jobPosted: 22,
    },
    {
      id: 2,
      name: "David Martinez",
      email: "rajasif84@gmail.com",
      phone: "01309242235",
      location: "Bohimiya, Planvilla, USA",
      status: "Suspended",
      jobPosted: 2,
    },
    {
      id: 3,
      name: "Robert Taylor",
      email: "rajasif84@gmail.com",
      phone: "01309242235",
      location: "Bohimiya, Planvilla, USA",
      status: "Active",
      jobPosted: 22,
    },
    {
      id: 4,
      name: "Amanda White",
      email: "rajasif84@gmail.com",
      phone: "01309242235",
      location: "Bohimiya, Planvilla, USA",
      status: "Suspended",
      jobPosted: 22,
    },
    {
      id: 5,
      name: "Asif Karim",
      email: "rajasif84@gmail.com",
      phone: "01309242235",
      location: "Bohimiya, Planvilla, USA",
      status: "Suspended",
      jobPosted: 22,
    },
    {
      id: 6,
      name: "Asif Karim",
      email: "rajasif84@gmail.com",
      phone: "01309242235",
      location: "Bohimiya, Planvilla, USA",
      status: "Active",
      jobPosted: 22,
    },
    {
      id: 7,
      name: "Asif Karim",
      email: "rajasif84@gmail.com",
      phone: "01309242235",
      location: "Bohimiya, Planvilla, USA",
      status: "Suspended",
      jobPosted: 22,
    },
  ]);

  const handleSuspend = (id: number) => {
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
  const handleView = (id: number) => {
    console.log(id);
    setIsOpen(true);
  };

  return (
    <div className="h-[100vh]">
      <div className="h-[70vh] rounded-xl  p-6 shadow-sm">
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
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-4 text-[16px] font-medium text-[#212121]">
                    {customer.name}
                  </td>
                  <td className="px-4 py-4 text-gray-600">{customer.email}</td>
                  <td className="px-4 py-4 text-gray-600">{customer.phone}</td>
                  <td className="px-4 py-4 text-gray-600">{customer.location}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-800">{customer.jobPosted}</td>
                  <td className="relative px-4 py-4">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === customer.id ? null : customer.id)}
                      className="rounded p-1 hover:bg-gray-100"
                    >
                      <MoreVertical size={20} className="text-gray-600" />
                    </button>

                    {openMenuId === customer.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                        <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                          <button
                            onClick={() => handleView(customer.id)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                          >
                            <Eye size={16} />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => handleSuspend(customer.id)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                          >
                            <X size={16} />
                            <span>
                              {customer.status === "Active"
                                ? "Suspend Account"
                                : "Activate Account"}
                            </span>
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
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
            {isOpen && isOpen && <ProfileViewDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;

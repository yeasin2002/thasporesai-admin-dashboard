import React, { useState } from "react";
import { MoreVertical, X, Trash2, Eye, Star } from "lucide-react";
import { Button } from "@/components";
import { useGetConstrutorQuery, useGetUserQuery } from "@/redux/features/user/user.api";

interface Contractor {
  id: number;
  name: string;
  skills: string[];
  rating: number;
  reviews: number;
  location: string;
  status: "Active" | "Suspended";
  doneJobs: number;
  verification: "Verified" | "Pending";
}

const ContractorTable = ({ searchTerm }: { searchTerm: string }) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [contractors, setContractors] = useState<Contractor[]>([
    {
      id: 1,
      name: "Jessica Lee",
      skills: ["Plumbing"],
      rating: 4.1,
      reviews: 201,
      location: "Bohimiya, Planvilla, USA",
      status: "Suspended",
      doneJobs: 22,
      verification: "Verified",
    },
    {
      id: 2,
      name: "David Martinez",
      skills: ["Electrician"],
      rating: 4.5,
      reviews: 150,
      location: "Bohimiya, Planvilla, USA",
      status: "Active",
      doneJobs: 15,
      verification: "Verified",
    },
    {
      id: 3,
      name: "Robert Taylor",
      skills: ["HVAC"],
      rating: 3.9,
      reviews: 88,
      location: "Bohimiya, Planvilla, USA",
      status: "Active",
      doneJobs: 10,
      verification: "Pending",
    },
    {
      id: 4,
      name: "Amanda White",
      skills: ["Plumbing", "Welding"],
      rating: 4.8,
      reviews: 312,
      location: "Bohimiya, Planvilla, USA",
      status: "Suspended",
      doneJobs: 30,
      verification: "Pending",
    },
  ]);
  const { data } = useGetConstrutorQuery(searchTerm);
  console.log(data?.data);
  const handleToggleSuspend = (id: number) => {
    setContractors((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "Active" ? "Suspended" : "Active" } : c,
      ),
    );
    setOpenMenuId(null);
  };

  // Delete Contractor
  const handleDelete = (id: number) => {
    setContractors((prev) => prev.filter((c) => c.id !== id));
    setOpenMenuId(null);
  };

  // View Contractor
  const handleView = (id: number) => {
    console.log(`Viewing contractor ID: ${id}`);
    setOpenMenuId(null);
  };

  // Status Badge
  const getStatusBadge = (status: "Active" | "Suspended") => (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
        status === "Active" ? "bg-green-100 text-[#0E9E4D]" : "bg-[#FFE0E0] text-[#FF000D]"
      }`}
    >
      {status}
    </span>
  );

  // Verification Badge
  const getVerificationBadge = (verification: "Verified" | "Pending") => (
    <span
      className={`inline-block rounded-lg px-3 py-1 text-xs font-medium ${
        verification === "Verified" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {verification}
    </span>
  );

  return (
    <div className="h-[100vh] p-6">
      <div className="h-[70vh] rounded-xl bg-[#F8F8F8] p-6 shadow-[14px]">
        <h2 className="mb-6 text-2xl font-semibold text-[#000000]">Contractors</h2>
        <div className="">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-4 text-left">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">Name</th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Skills
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Rating
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Location
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Done Jobs
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Verification
                </th>
                <th className="px-4 py-4 text-left text-[16px] font-medium text-[#616161]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.length > 0 ? (
                data?.data.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    </td>
                    <td className="px-4 py-4 text-[16px] font-medium text-[#212121]">
                      {c.full_name}
                    </td>
                    <td className="px-4 py-4">
                      {c.skills.map((skill, i) => (
                        <Button
                          key={i}
                          aria-readonly
                          variant={"outline"}
                          className="hover:none mr-2 rounded-md border border-gray-300 bg-[#BDBDBD] px-3 py-1 text-xs text-[#616161]"
                        >
                          {skill}
                        </Button>
                      ))}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      <div className="flex items-center gap-1 text-[14px]">
                        <Star size={14} className="fill-gray-500 text-gray-500" />
                        {c?.rating?.toFixed(1)} ({c.reviews})
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#616161]">{c.location}</td>
                    <td className="px-4 py-4">{getStatusBadge(c.status)}</td>
                    <td className="px-4 py-4 text-gray-800">{c.doneJobs}</td>
                    <td className="px-4 py-4">{getVerificationBadge(c.verification)}</td>
                    <td className="relative px-4 py-4">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === c.id ? null : c.id)}
                        className="rounded p-1 hover:bg-gray-100"
                      >
                        <MoreVertical size={20} className="text-gray-600" />
                      </button>

                      {openMenuId === c.id && (
                        <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                          <button
                            onClick={() => handleView(c.id)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                          >
                            <Eye size={16} /> View Profile
                          </button>
                          <button
                            onClick={() => handleToggleSuspend(c.id)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                          >
                            <X size={16} />{" "}
                            {c.status === "Active" ? "Suspend Account" : "Activate Account"}
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} /> Delete Account
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl text-black"> no data found</p>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContractorTable;

import { Check, Mail, MoreVertical } from "lucide-react";
import React, { useState } from "react";

interface Job {
  id: number;
  jobId: string;
  jobTitle: string;
  customerName: string;
  customerEmail: string;
  description: string;
  status: "Completed" | "Pending";
  postedDate: string;
}

const HelpSupportTable: React.FC = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [jobs] = useState<Job[]>([
    {
      id: 1,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customerName: "Robert Browny Crown",
      customerEmail: "robertbrown@gmail.com",
      description: "I am facing real problem......",
      status: "Completed",
      postedDate: "2023-10-14",
    },
    {
      id: 2,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customerName: "Robert Browny Crown",
      customerEmail: "robertbrown@gmail.com",
      description: "I am facing real problem......",
      status: "Pending",
      postedDate: "2023-10-13",
    },
    {
      id: 3,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customerName: "Robert Browny Crown",
      customerEmail: "robertbrown@gmail.com",
      description: "I am facing real problem......",
      status: "Completed",
      postedDate: "2023-10-12",
    },
  ]);

  const getStatusClasses = (status: Job["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-[#E6E6E6] text-[#6B6B6B]";
      case "Pending":
        return "bg-[#FFF3D6] text-[#F5A623]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="mb-24 rounded-xl bg-[#F8F8F8] p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-[#212121]">Help and Support</h2>
      <div className="overflow-x-auto bg-[#F8F8F8]">
        <table className="mb-24 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-300 text-[#616161]">
              <th className="py-3 font-medium">ID</th>
              <th className="py-3 font-medium">Job Title</th>
              <th className="py-3 font-medium">Customer</th>
              <th className="py-3 font-medium">Description</th>
              <th className="py-3 font-medium">Status</th>
              <th className="py-3 font-medium">Posted Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="border-b border-gray-300 transition-colors hover:bg-gray-50"
              >
                <td className="py-4 text-[15px] font-medium text-[#212121]">{job.jobId}</td>
                <td className="py-4 text-[15px] font-semibold text-[#212121]">{job.jobTitle}</td>
                <td className="py-4">
                  <p className="text-[15px] font-medium text-[#212121]">{job.customerName}</p>
                  <p className="text-xs text-gray-500">{job.customerEmail}</p>
                </td>
                <td className="py-4 text-[15px] text-gray-700">{job.description}</td>
                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                      job.status,
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="py-4 text-[15px] text-gray-600">{job.postedDate}</td>

                {/* Action Menu */}
                <td className="relative py-4">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === job.id ? null : job.id)}
                    className="rounded p-1 transition hover:bg-gray-200"
                  >
                    <MoreVertical size={18} className="text-gray-600" />
                  </button>

                  {openMenuId === job.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                      <div className="absolute right-6 z-20 mt-2 w-40 rounded-lg border border-gray-100 bg-white py-1 shadow-md">
                        <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50">
                          <Check size={16} />
                          Mark as done
                        </button>
                        <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50">
                          <Mail size={16} />
                          View Message
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
    </div>
  );
};

export default HelpSupportTable;

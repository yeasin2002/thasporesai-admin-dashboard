import { MoreVertical, User, X } from "lucide-react";
import React, { useState } from "react";
import JobDrawerWith from "./job-profile-details";

interface Job {
  id: number;
  jobId: string;
  jobTitle: string;
  customerName: string;
  customerEmail: string;
  contractorName: string;
  contractorEmail: string;
  category: string;
  budget: number;
  status: "Completed" | "Pending" | "Active" | "Cancelled";
  postedDate: string;
}

const JobManagementTable: React.FC = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customerName: "Robert Browny Crown",
      customerEmail: "robertbrown@gmail.com",
      contractorName: "Asif Rahman Raj",
      contractorEmail: "asifraj@gmail.com",
      category: "Plumbing",
      budget: 350,
      status: "Completed",
      postedDate: "2023-10-14",
    },
    {
      id: 2,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customerName: "Robert Browny Crown",
      customerEmail: "robertbrown@gmail.com",
      contractorName: "Asif Rahman Raj",
      contractorEmail: "asifraj@gmail.com",
      category: "Hiring",
      budget: 350,
      status: "Pending",
      postedDate: "2023-10-13",
    },
    {
      id: 3,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customerName: "Robert Browny Crown",
      customerEmail: "robertbrown@gmail.com",
      contractorName: "Asif Rahman Raj",
      contractorEmail: "asifraj@gmail.com",
      category: "Plumbing",
      budget: 350,
      status: "Active",
      postedDate: "2023-10-12",
    },
    {
      id: 4,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customerName: "Robert Browny Crown",
      customerEmail: "robertbrown@gmail.com",
      contractorName: "Asif Rahman Raj",
      contractorEmail: "asifraj@gmail.com",
      category: "Plumbing",
      budget: 350,
      status: "Completed",
      postedDate: "2023-10-11",
    },
    {
      id: 5,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customerName: "Robert Browny Crown",
      customerEmail: "robertbrown@gmail.com",
      contractorName: "Asif Rahman Raj",
      contractorEmail: "asifraj@gmail.com",
      category: "Hiring",
      budget: 350,
      status: "Pending",
      postedDate: "2023-10-10",
    },
  ]);

  const handleCancelJob = (id: number) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, status: "Cancelled" } : job)));
    setOpenMenuId(null);
  };

  const handleViewProfile = (id: number) => {
    console.log(id);
    setIsOpen(true);
    setOpenMenuId(null);
  };

  const getStatusClasses = (status: Job["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-gray-200 text-gray-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Active":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-xl bg-[#F8F8F8] p-6 shadow-sm">
      {" "}
      <h2 className="mb-6 text-2xl font-semibold text-[#000000]">Job Management</h2>
      <div className="overflow-x-auto">
        <table className="mb-20 w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[##616161]">
                Job ID
              </th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[##616161]">
                Job Title
              </th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[##616161]">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[##616161]">
                Contractor
              </th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[##616161]">
                Category
              </th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[##616161]">
                Budget
              </th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[##616161]">
                Status
              </th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[##616161]">
                Posted Date
              </th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[##616161]"></th>{" "}
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-[16px] font-medium text-[#212121]">{job.jobId}</td>

                <td className="px-4 py-3 text-[16px] font-medium text-[#212121]">{job.jobTitle}</td>

                <td className="px-4 py-3">
                  <p className="text-[16px] font-medium text-[#212121]">{job.customerName}</p>
                  <p className="text-xs text-gray-500">{job.customerEmail}</p>
                </td>

                <td className="px-4 py-3">
                  <p className="text-[16px] font-medium text-[#212121]">{job.contractorName}</p>
                  <p className="text-xs text-gray-500">{job.contractorEmail}</p>
                </td>

                <td className="px-4 py-3 text-[16px] text-gray-600">{job.category}</td>

                <td className="px-4 py-3 text-[16px] text-gray-800">${job.budget}</td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(job.status)}`}
                  >
                    {job.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-[16px] text-gray-600">{job.postedDate}</td>

                {/* 5. Actions Dropdown */}
                <td className="relative px-4 py-3">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === job.id ? null : job.id)}
                    className="rounded p-1 hover:bg-gray-200"
                  >
                    <MoreVertical size={20} className="text-gray-600" />
                  </button>

                  {openMenuId === job.id && (
                    <>
                      {/* Overlay to close menu when clicking outside */}
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />

                      {/* Dropdown Menu - Styled to match the image */}
                      <div className="absolute right-6 z-20 mt-2 w-40 rounded-lg border border-gray-100 bg-white py-1 shadow-xl">
                        {/* View Profile Action */}
                        <button
                          onClick={() => handleViewProfile(job.id)}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <User size={16} />
                          <span>View Profile</span>
                        </button>

                        {/* Cancel Job Action - Only visible for Active/Pending jobs */}
                        {job.status !== "Completed" && job.status !== "Cancelled" && (
                          <button
                            onClick={() => handleCancelJob(job.id)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-white"
                          >
                            <X size={16} />
                            <span>Cancel Job</span>
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

          {isOpen && isOpen && <JobDrawerWith isOpen={isOpen} setIsOpen={setIsOpen} />}
        </table>
      </div>
    </div>
  );
};

export default JobManagementTable;

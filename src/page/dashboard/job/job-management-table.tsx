import { Job, JobStatus } from "@/api/api-types/job.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense, useState } from "react";
import JobProfileView from "./job-profile-view";

interface Props {
  jobs: Job[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
}

const JobManagementTable = ({ jobs, isLoading, error }: Props) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const getStatusClasses = (status: JobStatus) => {
    switch (status) {
      case "completed":
        return "bg-gray-200 text-gray-700";
      case "open":
        return "bg-yellow-100 text-yellow-700";
      case "in-progress":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status: JobStatus) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "open":
        return "Open";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-gray-500">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-gray-500">No jobs found</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#F8F8F8] p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold text-[#000000]">Job Management</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id} className="*:py-3">
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>
                  {job.category && job.category.length > 0
                    ? job.category
                        .map((cat) => (typeof cat === "string" ? cat : cat.name))
                        .join(", ")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {typeof job.location === "string"
                    ? job.location
                    : job.location?.name || job.address || "N/A"}
                </TableCell>
                <TableCell>${job.budget}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(job.status)}`}
                  >
                    {formatStatus(job.status)}
                  </span>
                </TableCell>
                <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Suspense fallback={<div>Loading...</div>}>
                    <JobProfileView
                      id={job._id}
                      isOpen={selectedJobId === job._id}
                      onOpenChange={(open) => setSelectedJobId(open ? job._id : null)}
                    />
                  </Suspense>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobManagementTable;

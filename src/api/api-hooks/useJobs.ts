import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateJobData, GetJobsParams } from "../api-types/job.types";
import { createJob, getJobById, getJobs } from "../query-list/job.query";

/**
 * React Query hook for fetching jobs with filtering, sorting, and pagination
 * @param params - Query parameters for filtering and pagination
 * @returns Query result with jobs data, loading state, and error
 * @example
 * ```tsx
 * const { data, isLoading, error } = useJobs({
 *   status: "open",
 *   search: "plumbing",
 *   page: 1,
 *   limit: 10,
 *   sortBy: "createdAt",
 *   sortOrder: "desc"
 * });
 * ```
 */
export const useJobs = (params?: GetJobsParams) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => getJobs(params),
  });
};

/**
 * React Query hook for fetching a single job by ID
 * @param id - Job ID
 * @returns Query result with job data, loading state, and error
 * @example
 * ```tsx
 * const { data, isLoading, error } = useJob("job-id-123");
 * const job = data?.data; // Job object
 * ```
 */
export const useJob = (id: string) => {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => getJobById(id),
    enabled: !!id, // Only run if id exists
  });
};

/**
 * React Query mutation hook for creating a new job
 * @returns Mutation result with mutate function, loading state, and error
 * @example
 * ```tsx
 * const createJobMutation = useCreateJob();
 *
 * const handleCreate = async () => {
 *   await createJobMutation.mutateAsync({
 *     title: "Fix plumbing",
 *     category: ["plumbing"],
 *     description: "Need urgent plumbing repair",
 *     location: "New York",
 *     address: "123 Main St",
 *     budget: 500,
 *     date: "2024-01-15",
 *     coverImg: "https://example.com/image.jpg"
 *   });
 * };
 * ```
 */
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobData: CreateJobData) => createJob(jobData),
    onSuccess: () => {
      // Invalidate jobs list to refetch with new job
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

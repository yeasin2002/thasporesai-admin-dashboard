import { SortOrder } from "./user.types";

export type JobStatus = "open" | "in-progress" | "completed" | "cancelled";
export type JobSortField = "createdAt" | "updatedAt" | "title" | "budget" | "date";

export interface Job {
  _id: string;
  title: string;
  category: string[];
  description: string;
  location: string;
  address: string;
  budget: number;
  date: string;
  coverImg: string;
  customerId: string;
  contractorId: string;
  status: JobStatus;
  isApplied: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobsResponse {
  status: number;
  message: string;
  data: {
    jobs: Job[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface JobResponse {
  status: number;
  message: string;
  data: Job;
}

export interface ErrorResponse {
  status: number;
  message: string;
  data: string;
  success: boolean;
  errors: string;
}

/**
 * Query parameters for fetching jobs
 * Reuses pagination params from user module
 * @see GET /api/job
 */
export interface GetJobsParams {
  /** Search by title or description (case-insensitive) */
  search?: string;
  /** Filter by job status */
  status?: JobStatus;
  /** Filter by location */
  location?: string;
  /** Filter by category ID */
  category?: string;
  /** Filter by customer ID */
  customerId?: string;
  /** Filter by contractor ID */
  contractorId?: string;
  /** Page number (default: 1) */
  page?: number;
  /** Items per page (default: 10) */
  limit?: number;
  /** Sort field (default: createdAt) */
  sortBy?: JobSortField;
  /** Sort order: ascending or descending (default: desc) */
  sortOrder?: SortOrder;
}

/**
 * Request body for creating a new job
 * @see POST /api/job
 */
export interface CreateJobData {
  title: string;
  category: string[];
  description: string;
  location: string;
  address: string;
  budget: number;
  date: string;
  coverImg?: string;
}

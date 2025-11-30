import { axiosInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import {
  CreateJobData,
  ErrorResponse,
  GetJobsParams,
  JobResponse,
  JobsResponse,
} from "../api-types/job.types";

/**
 * Fetch all jobs with filtering, sorting, and pagination
 * @param params - Query parameters for filtering jobs
 * @returns Promise with jobs data and pagination info
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const getJobs = async (params?: GetJobsParams): Promise<JobsResponse> => {
  try {
    const { data } = await axiosInstance.get<JobsResponse>("/job", { params });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to fetch jobs");
    }
    throw error;
  }
};

/**
 * Create a new job
 * @param jobData - Job data to create
 * @returns Promise with created job data
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const createJob = async (jobData: CreateJobData): Promise<JobResponse> => {
  try {
    const { data } = await axiosInstance.post<JobResponse>("/job", jobData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to create job");
    }
    throw error;
  }
};

/**
 * Get single job by ID
 * @param id - Job ID
 * @returns Promise with job data
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const getJobById = async (id: string): Promise<JobResponse> => {
  try {
    const { data } = await axiosInstance.get<JobResponse>(`/job/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to fetch job");
    }
    throw error;
  }
};

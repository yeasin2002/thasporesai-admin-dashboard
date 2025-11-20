import { axiosInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import {
  ErrorResponse,
  GetUsersParams,
  UpdateUserData,
  UserResponse,
  UsersResponse,
} from "../api-types/user.types";

/**
 * Fetch users with filtering, sorting, and pagination
 * @param params - Query parameters for filtering users
 * @returns Promise with users data and pagination info
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const getUsers = async (params?: GetUsersParams): Promise<UsersResponse> => {
  try {
    const { data } = await axiosInstance.get<UsersResponse>("/api/user", { params });
    return data;
  } catch (error) {
    // Type-safe error handling
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to fetch users");
    }
    throw error;
  }
};

/**
 * Get current authenticated user profile
 * @returns Promise with current user data
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const getCurrentUser = async (): Promise<UserResponse> => {
  try {
    const { data } = await axiosInstance.get<UserResponse>("/api/user/me");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to fetch current user");
    }
    throw error;
  }
};

/**
 * Get single user by ID
 * @param id - User ID
 * @returns Promise with user data
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const getUserById = async (id: string): Promise<UserResponse> => {
  try {
    const { data } = await axiosInstance.get<UserResponse>(`/api/user/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to fetch user");
    }
    throw error;
  }
};

/**
 * Update current user profile
 * @param userData - Partial user data to update
 * @returns Promise with updated user data
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const updateCurrentUser = async (userData: UpdateUserData): Promise<UserResponse> => {
  try {
    const { data } = await axiosInstance.patch<UserResponse>("/api/user/me", userData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to update user");
    }
    throw error;
  }
};

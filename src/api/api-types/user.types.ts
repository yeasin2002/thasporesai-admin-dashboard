export type UserRole = "contractor" | "customer" | "admin";
export type SortOrder = "asc" | "desc";
export type UserSortField = "createdAt" | "updatedAt" | "full_name" | "email" | "role";

export interface Experience {
  company_name: string;
  start_date: string | null;
  end_date: string | null;
}

export interface WorkSample {
  name: string;
  img: string;
  description: string;
}

export interface User {
  _id: string;
  role: UserRole;
  full_name: string;
  profile_img: string;
  cover_img: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  description: string;
  is_verified: boolean;
  isSuspend: boolean;
  starting_budget: number;
  hourly_charge: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  total_jobs: number;
  // Optional fields that may exist
  location?: string;
  availability?: string | null;
  category?: string[];
  skills?: string[];
  experience?: Experience[];
  work_samples?: WorkSample[];
  certification?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface UsersResponse {
  status: number;
  message: string;
  data: {
    users: User[];
    pagination: Pagination;
  };
  success: boolean;
}

export interface ErrorResponse {
  status: number;
  message: string;
  data: string;
  success: boolean;
  errors: string;
}

/**
 * Query parameters for fetching users
 * @see GET /api/user
 */
export interface GetUsersParams {
  /** Search by full name or email (case-insensitive) */
  search?: string;
  /** Filter by user role */
  role?: UserRole;
  /** Filter by location ID */
  location?: string;
  /** Filter by category ID */
  category?: string;
  /** Page number (default: 1) */
  page?: number;
  /** Items per page (default: 10) */
  limit?: number;
  /** Sort field (default: createdAt) */
  sortBy?: UserSortField;
  /** Sort order: ascending or descending (default: desc) */
  sortOrder?: SortOrder;
}

/**
 * Response for single user endpoints
 * @see GET /api/user/me
 * @see GET /api/user/:id
 * @see PATCH /api/user/me
 */
export interface UserResponse {
  status: number;
  message: string;
  data: User;
  success: boolean;
}

/**
 * Request body for updating user profile
 * @see PATCH /api/user/me
 */
export interface UpdateUserData {
  full_name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  description?: string;
  location?: string;
  availability?: string | null;
  category?: string[];
  skills?: string[];
  experience?: Experience[];
  work_samples?: WorkSample[];
  starting_budget?: number;
  hourly_charge?: number;
  certification?: string;
  profile_img?: string;
  cover_img?: string;
}

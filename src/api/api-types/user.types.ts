export type UserRole = "contractor" | "customer" | "admin";
export type SortOrder = "asc" | "desc";

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
  bio: string;
  location: string;
  availability: string | null;
  is_verified: boolean;
  category: string[];
  skills: string[];
  experience: Experience[];
  work_samples: WorkSample[];
  starting_budget: number;
  certification: string;
  hourly_charge: number;
  createdAt: string | null;
  updatedAt: string | null;
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
}

export interface GetUsersParams {
  search?: string;
  role?: UserRole;
  location?: string;
  category?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

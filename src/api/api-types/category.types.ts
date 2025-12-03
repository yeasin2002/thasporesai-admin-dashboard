import { SortOrder } from "./user.types";

export type CategorySortField = "createdAt" | "updatedAt" | "name";

export interface Category {
  _id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CategoriesResponse {
  status: number;
  message: string;
  data: {
    categories: Category[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CategoryResponse {
  status: number;
  message: string;
  data: Category;
}

export interface ErrorResponse {
  status: number;
  message: string;
  data: string | null;
  success?: boolean;
}

/**
 * Query parameters for fetching categories
 * @see GET /api/category
 */
export interface GetCategoriesParams {
  /** Search in name or description */
  search?: string;
  /** Page number (default: 1) */
  page?: number;
  /** Items per page (default: 10) */
  limit?: number;
  /** Sort field (default: createdAt) */
  sortBy?: CategorySortField;
  /** Sort order: ascending or descending (default: desc) */
  sortOrder?: SortOrder;
}

/**
 * Request body for creating a new category (Admin Only)
 * Uses multipart/form-data
 * @see POST /api/category
 */
export interface CreateCategoryData {
  /** Category name (required) */
  name: string;
  /** Category description (optional) */
  description?: string;
  /** Icon image file (required) */
  icon: File;
}

/**
 * Request body for updating a category (Admin Only)
 * Uses multipart/form-data
 * @see PUT /api/category/:id
 */
export interface UpdateCategoryData {
  /** Category name (optional) */
  name?: string;
  /** Category description (optional) */
  description?: string;
  /** Icon image file (optional) */
  icon?: File;
}

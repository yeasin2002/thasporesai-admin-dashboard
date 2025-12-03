import { axiosInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import {
  CategoriesResponse,
  CategoryResponse,
  CreateCategoryData,
  ErrorResponse,
  GetCategoriesParams,
  UpdateCategoryData,
} from "../api-types/category.types";

/**
 * Fetch all categories with filtering and pagination
 * @param params - Query parameters for filtering categories
 * @returns Promise with categories data and pagination info
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const getCategories = async (params?: GetCategoriesParams): Promise<CategoriesResponse> => {
  try {
    const { data } = await axiosInstance.get<CategoriesResponse>("/category", { params });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to fetch categories");
    }
    throw error;
  }
};

/**
 * Get single category by ID
 * @param id - Category ID
 * @returns Promise with category data
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const getCategoryById = async (id: string): Promise<CategoryResponse> => {
  try {
    const { data } = await axiosInstance.get<CategoryResponse>(`/category/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to fetch category");
    }
    throw error;
  }
};

/**
 * Create a new category (Admin Only)
 * Uses multipart/form-data for file upload
 * @param categoryData - Category data with icon file
 * @returns Promise with created category data
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const createCategory = async (
  categoryData: CreateCategoryData,
): Promise<CategoryResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", categoryData.name);
    if (categoryData.description) {
      formData.append("description", categoryData.description);
    }
    formData.append("icon", categoryData.icon);

    const { data } = await axiosInstance.post<CategoryResponse>("/category", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to create category");
    }
    throw error;
  }
};

/**
 * Update a category (Admin Only)
 * Uses multipart/form-data for file upload
 * @param id - Category ID
 * @param categoryData - Partial category data to update
 * @returns Promise with updated category data
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const updateCategory = async (
  id: string,
  categoryData: UpdateCategoryData,
): Promise<CategoryResponse> => {
  try {
    const formData = new FormData();
    if (categoryData.name) {
      formData.append("name", categoryData.name);
    }
    if (categoryData.description) {
      formData.append("description", categoryData.description);
    }
    if (categoryData.icon) {
      formData.append("icon", categoryData.icon);
    }

    const { data } = await axiosInstance.put<CategoryResponse>(`/category/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to update category");
    }
    throw error;
  }
};

/**
 * Delete a category (Admin Only)
 * @param id - Category ID
 * @returns Promise with success response
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const deleteCategory = async (id: string): Promise<CategoryResponse> => {
  try {
    const { data } = await axiosInstance.delete<CategoryResponse>(`/category/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to delete category");
    }
    throw error;
  }
};

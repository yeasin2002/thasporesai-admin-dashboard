import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateCategoryData,
  GetCategoriesParams,
  UpdateCategoryData,
} from "../api-types/category.types";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../query-list/category.query";

/**
 * React Query hook for fetching categories with filtering and pagination
 * @param params - Query parameters for filtering and pagination
 * @returns Query result with categories data, loading state, and error
 * @example
 * ```tsx
 * const { data, isLoading, error } = useCategories({
 *   search: "plumber",
 *   page: 1,
 *   limit: 10,
 *   sortBy: "createdAt",
 *   sortOrder: "desc"
 * });
 *
 * const categories = data?.data.categories;
 * const pagination = data?.data;
 * ```
 */
export const useCategories = (params?: GetCategoriesParams) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
  });
};

/**
 * React Query hook for fetching a single category by ID
 * @param id - Category ID
 * @returns Query result with category data, loading state, and error
 * @example
 * ```tsx
 * const { data, isLoading, error } = useCategory("category-id-123");
 * const category = data?.data; // Category object
 * ```
 */
export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id, // Only run if id exists
  });
};

/**
 * React Query mutation hook for creating a new category (Admin Only)
 * @returns Mutation result with mutate function, loading state, and error
 * @example
 * ```tsx
 * const createCategoryMutation = useCreateCategory();
 *
 * const handleCreate = async (iconFile: File) => {
 *   await createCategoryMutation.mutateAsync({
 *     name: "plumber",
 *     description: "Plumbing services",
 *     icon: iconFile
 *   });
 * };
 * ```
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData: CreateCategoryData) => createCategory(categoryData),
    onSuccess: () => {
      // Invalidate categories list to refetch with new category
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

/**
 * React Query mutation hook for updating a category (Admin Only)
 * @returns Mutation result with mutate function, loading state, and error
 * @example
 * ```tsx
 * const updateCategoryMutation = useUpdateCategory();
 *
 * const handleUpdate = async (iconFile?: File) => {
 *   await updateCategoryMutation.mutateAsync({
 *     id: "category-id-123",
 *     data: {
 *       name: "electrician",
 *       description: "Electrical services",
 *       icon: iconFile
 *     }
 *   });
 * };
 * ```
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryData }) =>
      updateCategory(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific category and list
      queryClient.invalidateQueries({ queryKey: ["categories", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

/**
 * React Query mutation hook for deleting a category (Admin Only)
 * @returns Mutation result with mutate function, loading state, and error
 * @example
 * ```tsx
 * const deleteCategoryMutation = useDeleteCategory();
 *
 * const handleDelete = async () => {
 *   await deleteCategoryMutation.mutateAsync("category-id-123");
 * };
 * ```
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      // Invalidate categories list
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUsersParams, UpdateUserData } from "../api-types/user.types";
import { getCurrentUser, getUserById, getUsers, updateCurrentUser } from "../query-list/user.query";

/**
 * React Query hook for fetching users with filtering, sorting, and pagination
 * @param params - Query parameters for filtering and pagination
 * @returns Query result with users data, loading state, and error
 * @example
 * ```tsx
 * const { data, isLoading, error } = useUsers({
 *   role: "contractor",
 *   search: "john",
 *   page: 1,
 *   limit: 10,
 *   sortBy: "createdAt",
 *   sortOrder: "desc"
 * });
 * ```
 */
export const useUsers = (params?: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};

/**
 * React Query hook for fetching current authenticated user
 * @returns Query result with current user data, loading state, and error
 * @example
 * ```tsx
 * const { data, isLoading, error } = useCurrentUser();
 * const currentUser = data?.data; // User object
 * ```
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: getCurrentUser,
  });
};

/**
 * React Query hook for fetching a single user by ID
 * @param id - User ID
 * @returns Query result with user data, loading state, and error
 * @example
 * ```tsx
 * const { data, isLoading, error } = useUser("user-id-123");
 * const user = data?.data; // User object
 * ```
 */
export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id, // Only run if id exists
  });
};

/**
 * React Query mutation hook for updating current user profile
 * @returns Mutation result with mutate function, loading state, and error
 * @example
 * ```tsx
 * const updateUser = useUpdateCurrentUser();
 *
 * const handleUpdate = async () => {
 *   await updateUser.mutateAsync({
 *     full_name: "John Doe",
 *     bio: "Updated bio",
 *     phone: "1234567890"
 *   });
 * };
 * ```
 */
export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UpdateUserData) => updateCurrentUser(userData),
    onSuccess: () => {
      // Invalidate current user and users list
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

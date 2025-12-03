import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateLocationData,
  GetLocationsParams,
  UpdateLocationData,
} from "../api-types/location.types";
import {
  createLocation,
  deleteLocation,
  getLocationById,
  getLocations,
  updateLocation,
} from "../query-list/location.query";

/**
 * React Query hook for fetching all locations with pagination
 * @param params - Query parameters for filtering and pagination
 * @returns Query result with locations data, loading state, and error
 * @example
 * ```tsx
 * const { data, isLoading, error } = useLocations({ search: "New", page: 1, limit: 10 });
 * const locations = data?.data.locations;
 * const pagination = data?.data;
 * ```
 */
export const useLocations = (params?: GetLocationsParams) => {
  return useQuery({
    queryKey: ["locations", params],
    queryFn: () => getLocations(params),
  });
};

/**
 * React Query hook for infinite scroll locations
 * @param params - Query parameters for filtering (without page)
 * @returns Infinite query result with locations data, loading state, and error
 * @example
 * ```tsx
 * const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteLocations({ search: "New", limit: 10 });
 * const allLocations = data?.pages.flatMap(page => page.data.locations) ?? [];
 * ```
 */
export const useInfiniteLocations = (params?: Omit<GetLocationsParams, "page">) => {
  return useInfiniteQuery({
    queryKey: ["locations", "infinite", params],
    queryFn: ({ pageParam = 1 }) => getLocations({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.data.page < lastPage.data.totalPages ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1,
  });
};

/**
 * React Query hook for fetching a single location by ID
 * @param id - Location ID
 * @returns Query result with location data, loading state, and error
 * @example
 * ```tsx
 * const { data, isLoading, error } = useLocation("location-id-123");
 * const location = data?.data; // Location object
 * ```
 */
export const useLocation = (id: string) => {
  return useQuery({
    queryKey: ["locations", id],
    queryFn: () => getLocationById(id),
    enabled: !!id, // Only run if id exists
  });
};

/**
 * React Query mutation hook for creating a new location
 * @returns Mutation result with mutate function, loading state, and error
 * @example
 * ```tsx
 * const createLocationMutation = useCreateLocation();
 *
 * const handleCreate = async () => {
 *   await createLocationMutation.mutateAsync({
 *     name: "Los Angeles",
 *     state: "CA",
 *     coordinates: {
 *       lat: 34.0522,
 *       lng: -118.2437
 *     }
 *   });
 * };
 * ```
 */
export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (locationData: CreateLocationData) => createLocation(locationData),
    onSuccess: () => {
      // Invalidate locations list to refetch with new location
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};

/**
 * React Query mutation hook for updating a location
 * @returns Mutation result with mutate function, loading state, and error
 * @example
 * ```tsx
 * const updateLocationMutation = useUpdateLocation();
 *
 * const handleUpdate = async () => {
 *   await updateLocationMutation.mutateAsync({
 *     id: "location-id-123",
 *     data: {
 *       name: "Los Angeles City",
 *       state: "CA"
 *     }
 *   });
 * };
 * ```
 */
export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLocationData }) =>
      updateLocation(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific location and list
      queryClient.invalidateQueries({ queryKey: ["locations", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};

/**
 * React Query mutation hook for deleting a location
 * @returns Mutation result with mutate function, loading state, and error
 * @example
 * ```tsx
 * const deleteLocationMutation = useDeleteLocation();
 *
 * const handleDelete = async () => {
 *   await deleteLocationMutation.mutateAsync("location-id-123");
 * };
 * ```
 */
export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLocation(id),
    onSuccess: () => {
      // Invalidate locations list
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};

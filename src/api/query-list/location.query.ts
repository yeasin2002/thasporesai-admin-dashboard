import { axiosInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import {
  CreateLocationData,
  ErrorResponse,
  GetLocationsParams,
  LocationResponse,
  LocationsResponse,
  UpdateLocationData,
} from "../api-types/location.types";

/**
 * Fetch all locations with pagination and search
 * @param params - Query parameters for filtering locations
 * @returns Promise with locations data and pagination info
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const getLocations = async (params?: GetLocationsParams): Promise<LocationsResponse> => {
  try {
    const { data } = await axiosInstance.get<LocationsResponse>("/location", { params });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to fetch locations");
    }
    throw error;
  }
};

/**
 * Get single location by ID
 * @param id - Location ID
 * @returns Promise with location data
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const getLocationById = async (id: string): Promise<LocationResponse> => {
  try {
    const { data } = await axiosInstance.get<LocationResponse>(`/location/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to fetch location");
    }
    throw error;
  }
};

/**
 * Create a new location
 * @param locationData - Location data to create
 * @returns Promise with created location data
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const createLocation = async (
  locationData: CreateLocationData,
): Promise<LocationResponse> => {
  try {
    const { data } = await axiosInstance.post<LocationResponse>("/location", locationData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to create location");
    }
    throw error;
  }
};

/**
 * Update a location
 * @param id - Location ID
 * @param locationData - Partial location data to update
 * @returns Promise with updated location data
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const updateLocation = async (
  id: string,
  locationData: UpdateLocationData,
): Promise<LocationResponse> => {
  try {
    const { data } = await axiosInstance.put<LocationResponse>(`/location/${id}`, locationData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to update location");
    }
    throw error;
  }
};

/**
 * Delete a location
 * @param id - Location ID
 * @returns Promise with success response
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const deleteLocation = async (id: string): Promise<LocationResponse> => {
  try {
    const { data } = await axiosInstance.delete<LocationResponse>(`/location/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to delete location");
    }
    throw error;
  }
};

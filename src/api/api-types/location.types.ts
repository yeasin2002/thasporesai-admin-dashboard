export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  _id: string;
  name: string;
  state: string;
  coordinates: Coordinates;
  createdAt: string;
  updatedAt: string;
}

export interface LocationsResponse {
  status: number;
  message: string;
  success: boolean;
  data: Location[];
}

export interface LocationResponse {
  status: number;
  message: string;
  success: boolean;
  data: Location;
}

export interface ErrorResponse {
  status: number;
  message: string;
  data: string | null;
  success: boolean;
}

/**
 * Request body for creating a new location
 * @see POST /api/location
 */
export interface CreateLocationData {
  /** Location name (required) */
  name: string;
  /** State code (required, e.g., "NY", "CA") */
  state: string;
  /** Coordinates (required) */
  coordinates: Coordinates;
}

/**
 * Request body for updating a location
 * @see PUT /api/location/:id
 */
export interface UpdateLocationData {
  /** Location name (optional) */
  name?: string;
  /** State code (optional) */
  state?: string;
  /** Coordinates (optional) */
  coordinates?: Coordinates;
}

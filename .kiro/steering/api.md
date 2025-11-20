# API Architecture & Best Practices

## Overview

This project uses a three-layer API architecture that separates concerns between types, query functions, and React hooks. This pattern leverages **TanStack Query v5** (React Query) for server state management and **Axios** for HTTP requests.

## Directory Structure

```
src/api/
├── api-types/          # TypeScript interfaces and types
│   └── [feature].types.ts
├── query-list/         # Pure API query functions (Axios calls)
│   └── [feature].query.ts
└── api-hooks/          # React hooks with TanStack Query
    └── use[Feature].ts
```

## Three-Layer Architecture

### Layer 1: API Types (`api-types/`)

Define TypeScript interfaces for request parameters, response data, and domain models.

**Naming Convention:** `[feature].types.ts`

**Example:** `user.types.ts`

```typescript
// Request parameters interface
export interface GetUsersParams {
  search?: string;
  role?: UserRole;
  location?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

// Response interface
export interface UsersResponse {
  status: number;
  message: string;
  data: {
    users: User[];
    pagination: Pagination;
  };
}

// Domain model
export interface User {
  _id: string;
  role: UserRole;
  full_name: string;
  email: string;
  // ... other fields
}

// Supporting types
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
```

**Best Practices:**
- Export all interfaces (don't use default exports)
- Use descriptive names: `Get[Feature]Params`, `[Feature]Response`
- Include optional fields with `?` for flexible parameters
- Define enums for fixed values (e.g., `UserRole`, `SortOrder`)
- Keep types close to the API contract

---

### Layer 2: Query Functions (`query-list/`)

Pure async functions that make HTTP requests using the configured Axios instance.

**Naming Convention:** `[feature].query.ts`

**Example:** `user.query.ts`

```typescript
import { axiosInstance } from "@/utils/axios";
import { GetUsersParams, UsersResponse } from "../api-types/user.types";

export const getUsers = async (params?: GetUsersParams): Promise<UsersResponse> => {
  const { data } = await axiosInstance.get<UsersResponse>("/users", { params });
  return data;
};

export const getUserById = async (id: string): Promise<UserResponse> => {
  const { data } = await axiosInstance.get<UserResponse>(`/users/${id}`);
  return data;
};

export const createUser = async (userData: CreateUserData): Promise<UserResponse> => {
  const { data } = await axiosInstance.post<UserResponse>("/users", userData);
  return data;
};

export const updateUser = async (id: string, userData: UpdateUserData): Promise<UserResponse> => {
  const { data } = await axiosInstance.put<UserResponse>(`/users/${id}`, userData);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
```

**Best Practices:**
- Use named exports (not default)
- Function names should match HTTP method + resource: `get[Feature]`, `create[Feature]`, `update[Feature]`, `delete[Feature]`
- Always type the Axios response: `axiosInstance.get<ResponseType>`
- Return `data` directly (unwrap Axios response)
- Use async/await (not `.then()`)
- Keep functions pure - no side effects, no state management
- Use path parameters for IDs: `/users/${id}`
- Use query params for filters: `{ params }`

---

### Layer 3: React Hooks (`api-hooks/`)

React hooks that wrap query functions with TanStack Query for caching, loading states, and error handling.

**Naming Convention:** `use[Feature].ts`

**Example:** `useUsers.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetUsersParams } from "../api-types/user.types";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../query-list/user.query";

// Query hook for fetching list
export const useUsers = (params?: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};

// Query hook for fetching single item
export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id, // Only run if id exists
  });
};

// Mutation hook for creating
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Mutation hook for updating
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) => 
      updateUser(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific user and list
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Mutation hook for deleting
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
```

**Best Practices:**
- Use `useQuery` for GET requests (fetching data)
- Use `useMutation` for POST/PUT/PATCH/DELETE (modifying data)
- Query keys should be arrays: `["users"]`, `["users", id]`, `["users", params]`
- Include params in query key for proper caching
- Use `enabled` option to conditionally run queries
- Invalidate related queries after mutations
- Use `onSuccess`, `onError` callbacks for side effects
- Export hooks as named exports

---

## Axios Configuration

The project uses a pre-configured Axios instance located at `src/utils/axios.ts`.

**Features:**
- Base URL from environment constants
- Automatic JWT token attachment (from Zustand auth store)
- Token refresh on 401 errors
- Request/response interceptors

**Usage:**
```typescript
import { axiosInstance } from "@/utils/axios";

// The instance handles auth tokens automatically
const { data } = await axiosInstance.get("/endpoint");
```

---

## Creating a New API Feature

Follow these steps to add a new API feature (e.g., "jobs"):

### 1. Create Types File

**File:** `src/api/api-types/job.types.ts`

```typescript
export interface Job {
  _id: string;
  title: string;
  description: string;
  budget: number;
  status: JobStatus;
  createdAt: string;
}

export enum JobStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface GetJobsParams {
  status?: JobStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface JobsResponse {
  status: number;
  message: string;
  data: {
    jobs: Job[];
    pagination: Pagination;
  };
}

export interface CreateJobData {
  title: string;
  description: string;
  budget: number;
}
```

### 2. Create Query Functions

**File:** `src/api/query-list/job.query.ts`

```typescript
import { axiosInstance } from "@/utils/axios";
import { GetJobsParams, JobsResponse, CreateJobData, Job } from "../api-types/job.types";

export const getJobs = async (params?: GetJobsParams): Promise<JobsResponse> => {
  const { data } = await axiosInstance.get<JobsResponse>("/jobs", { params });
  return data;
};

export const getJobById = async (id: string): Promise<Job> => {
  const { data } = await axiosInstance.get<Job>(`/jobs/${id}`);
  return data;
};

export const createJob = async (jobData: CreateJobData): Promise<Job> => {
  const { data } = await axiosInstance.post<Job>("/jobs", jobData);
  return data;
};

export const updateJob = async (id: string, jobData: Partial<CreateJobData>): Promise<Job> => {
  const { data } = await axiosInstance.put<Job>(`/jobs/${id}`, jobData);
  return data;
};

export const deleteJob = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/jobs/${id}`);
};
```

### 3. Create React Hooks

**File:** `src/api/api-hooks/useJobs.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetJobsParams, CreateJobData } from "../api-types/job.types";
import { getJobs, getJobById, createJob, updateJob, deleteJob } from "../query-list/job.query";

export const useJobs = (params?: GetJobsParams) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => getJobs(params),
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => getJobById(id),
    enabled: !!id,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateJobData> }) => 
      updateJob(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobs", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};
```

### 4. Use in Components

```typescript
import { useJobs, useCreateJob } from "@/api/api-hooks/useJobs";

function JobsPage() {
  const { data, isLoading, error } = useJobs({ status: "open", page: 1 });
  const createJobMutation = useCreateJob();

  const handleCreate = async () => {
    await createJobMutation.mutateAsync({
      title: "New Job",
      description: "Job description",
      budget: 1000,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data.jobs.map(job => (
        <div key={job._id}>{job.title}</div>
      ))}
      <button onClick={handleCreate}>Create Job</button>
    </div>
  );
}
```

---

## TanStack Query Best Practices

### Query Keys Strategy
- Use hierarchical keys: `["users"]` → `["users", id]` → `["users", id, "posts"]`
- Include all parameters that affect the query: `["users", { page, search }]`
- This enables precise cache invalidation

### Optimistic Updates
```typescript
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users", id] });
      
      // Snapshot previous value
      const previousUser = queryClient.getQueryData(["users", id]);
      
      // Optimistically update
      queryClient.setQueryData(["users", id], (old) => ({ ...old, ...data }));
      
      return { previousUser };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(["users", variables.id], context?.previousUser);
    },
    onSettled: (_, __, variables) => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
    },
  });
};
```

### Pagination
```typescript
export const useUsers = (page: number) => {
  return useQuery({
    queryKey: ["users", { page }],
    queryFn: () => getUsers({ page, limit: 10 }),
    placeholderData: (previousData) => previousData, // Keep previous data while loading
  });
};
```

### Infinite Queries
```typescript
export const useInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: ["users", "infinite"],
    queryFn: ({ pageParam = 1 }) => getUsers({ page: pageParam }),
    getNextPageParam: (lastPage) => 
      lastPage.data.pagination.hasNextPage 
        ? lastPage.data.pagination.currentPage + 1 
        : undefined,
    initialPageParam: 1,
  });
};
```

---

## Common Patterns

### Dependent Queries
```typescript
const { data: user } = useUser(userId);
const { data: posts } = useUserPosts(userId, {
  enabled: !!user, // Only fetch posts after user is loaded
});
```

### Parallel Queries
```typescript
const users = useUsers();
const jobs = useJobs();
const payments = usePayments();

// All queries run in parallel
```

### Error Handling
```typescript
const { data, error, isError } = useUsers();

if (isError) {
  console.error("Failed to fetch users:", error);
  // Show error toast or UI
}
```

### Loading States
```typescript
const { data, isLoading, isFetching } = useUsers();

// isLoading: true on first load
// isFetching: true on any fetch (including refetch)
```

---

## Environment Setup

Ensure TanStack Query is configured in your app:

**File:** `src/main.tsx`

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

---

## Key Principles

1. **Separation of Concerns:** Types, queries, and hooks are separate
2. **Type Safety:** Full TypeScript coverage from API to UI
3. **Reusability:** Query functions can be used outside React (e.g., in utilities)
4. **Testability:** Pure functions are easy to test
5. **Caching:** TanStack Query handles caching automatically
6. **DRY:** Define API contracts once, use everywhere

---

## Migration Checklist

When adding a new API feature:

- [ ] Create `[feature].types.ts` with all interfaces
- [ ] Create `[feature].query.ts` with all API functions
- [ ] Create `use[Feature].ts` with React hooks
- [ ] Export types from types file
- [ ] Use named exports everywhere
- [ ] Include proper TypeScript types
- [ ] Add query key arrays
- [ ] Invalidate queries after mutations
- [ ] Test in a component

---

## Tools & Dependencies

- **@tanstack/react-query** v5.90.5 - Server state management
- **axios** v1.13.1 - HTTP client
- **@tanstack/eslint-plugin-query** v5.91.2 - ESLint rules for React Query

---

## Additional Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- Project axios config: `src/utils/axios.ts`

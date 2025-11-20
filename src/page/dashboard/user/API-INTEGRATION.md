# API Integration Guide

## Overview

The UserTable component is now fully integrated with the backend API using TanStack Query and Axios.

## Architecture

```
index.tsx (User Component)
    ↓ passes searchParams
CustomerTable / ContractorTable
    ↓ calls useUsers hook
TanStack Query (useUsers)
    ↓ calls query function
Axios (getUsers)
    ↓ HTTP GET request
Backend API (/api/user)
```

## Data Flow

### 1. Search & Filter (index.tsx)

```typescript
const searchParams = {
  search: searchQuery || undefined,
  sortOrder: currentFilter as "asc" | "desc",
  page,
  limit: 10,
};

<CustomerTable searchParams={searchParams} />
<ContractorTable searchParams={searchParams} />
```

### 2. API Hook (CustomerTable / ContractorTable)

```typescript
const { data, isLoading, error } = useUsers({
  role: "customer", // or "contractor"
  ...searchParams,
});
```

### 3. Data Transformation

```typescript
const customers: Customer[] = useMemo(() => {
  if (!data?.data?.users) return [];

  return data.data.users.map((user: User) => ({
    id: parseInt(user._id),
    name: user.full_name,
    email: user.email,
    phone: user.phone,
    location: user.address || user.location || "N/A",
    status: user.isSuspend ? "Suspended" : "Active",
    jobPosted: user.total_jobs,
  }));
}, [data]);
```

### 4. Render with Loading/Error States

```typescript
<UserTable
  title="Customers"
  data={customers}
  userType="customer"
  isLoading={isLoading}
  error={error}
  onView={handleView}
  onSuspend={handleSuspend}
  onDelete={handleDelete}
/>
```

## Features

### ✅ Real-time Data Fetching

- Automatically fetches users from `/api/user` endpoint
- Filters by role (customer/contractor)
- Supports search, pagination, and sorting

### ✅ Loading States

- Shows spinner while fetching data
- Displays "Loading customers/contractors..." message

### ✅ Error Handling

- Catches and displays API errors
- Shows user-friendly error messages

### ✅ Empty States

- Shows "No customers/contractors found" when data is empty

### ✅ Automatic Caching

- TanStack Query caches responses
- Reduces unnecessary API calls
- Improves performance

### ✅ Type Safety

- Full TypeScript support
- API types match backend response
- Compile-time error checking

## API Endpoints Used

### GET /api/user

**Query Parameters:**

- `role`: "customer" | "contractor" | "admin"
- `search`: string (search by name or email)
- `location`: string (filter by location ID)
- `category`: string (filter by category ID)
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `sortBy`: string (default: createdAt)
- `sortOrder`: "asc" | "desc"

**Response:**

```typescript
{
  status: 200,
  message: "Users fetched successfully",
  data: {
    users: User[],
    pagination: {
      currentPage: number,
      totalPages: number,
      totalUsers: number,
      limit: number,
      hasNextPage: boolean,
      hasPrevPage: boolean
    }
  },
  success: true
}
```

## Field Mapping

### API → Customer Table

| API Field              | Table Field | Transformation                       |
| ---------------------- | ----------- | ------------------------------------ |
| `_id`                  | `id`        | `parseInt(user._id)`                 |
| `full_name`            | `name`      | Direct                               |
| `email`                | `email`     | Direct                               |
| `phone`                | `phone`     | Direct                               |
| `address` / `location` | `location`  | Fallback to "N/A"                    |
| `isSuspend`            | `status`    | `isSuspend ? "Suspended" : "Active"` |
| `total_jobs`           | `jobPosted` | Direct                               |

### API → Contractor Table

| API Field              | Table Field    | Transformation                         |
| ---------------------- | -------------- | -------------------------------------- |
| `_id`                  | `id`           | `parseInt(user._id)`                   |
| `full_name`            | `name`         | Direct                                 |
| `email`                | `email`        | Direct                                 |
| `phone`                | `phone`        | Direct                                 |
| `address` / `location` | `location`     | Fallback to "N/A"                      |
| `isSuspend`            | `status`       | `isSuspend ? "Suspended" : "Active"`   |
| `skills`               | `skills`       | Direct (array)                         |
| `total_jobs`           | `doneJobs`     | Direct                                 |
| `is_verified`          | `verification` | `is_verified ? "Verified" : "Pending"` |
| N/A                    | `rating`       | TODO: Add to API                       |
| N/A                    | `reviews`      | TODO: Add to API                       |

## TODO: Implement Actions

### Suspend/Activate User

```typescript
const handleSuspend = async (id: number) => {
  // TODO: Create API endpoint PATCH /api/user/:id/suspend
  // TODO: Create mutation hook useSuspendUser
  // TODO: Invalidate users query after success
};
```

### Delete User

```typescript
const handleDelete = async (id: number) => {
  // TODO: Create API endpoint DELETE /api/user/:id
  // TODO: Create mutation hook useDeleteUser
  // TODO: Invalidate users query after success
};
```

### View User Details

```typescript
const handleView = (id: number) => {
  // TODO: Fetch user details with useUser(id)
  // TODO: Pass data to ProfileViewDrawer
};
```

## Performance Optimizations

### 1. Memoization

- Uses `useMemo` to prevent unnecessary data transformations
- Only recalculates when API data changes

### 2. Query Caching

- TanStack Query caches responses by query key
- Cache key: `["users", { role, search, page, ... }]`
- Automatic cache invalidation on mutations

### 3. Debounced Search

- TODO: Add debounce to search input (300ms)
- Reduces API calls while typing

## Testing the Integration

### 1. Start the dev server

```bash
npm run dev
```

### 2. Navigate to Users page

- Go to `/dashboard/users`

### 3. Test Features

- ✅ Switch between Customers and Contractors tabs
- ✅ Search for users by name or email
- ✅ Change sort order (asc/desc)
- ✅ Verify loading states
- ✅ Check error handling (disconnect network)
- ✅ Test empty states (search for non-existent user)

## Next Steps

1. **Add Pagination Controls**
   - Previous/Next buttons
   - Page number display
   - Items per page selector

2. **Implement Mutations**
   - Suspend/Activate user
   - Delete user
   - Update user profile

3. **Add Filters**
   - Location filter
   - Category filter
   - Date range filter

4. **Enhance Search**
   - Debounce input
   - Search suggestions
   - Advanced search options

5. **Add Bulk Actions**
   - Select multiple users
   - Bulk suspend/delete
   - Export to CSV

## Troubleshooting

### Issue: "Failed to fetch users"

- Check if backend server is running
- Verify API_BASE_URL in constants
- Check network tab for request details

### Issue: "No users found"

- Verify database has users with correct role
- Check search/filter parameters
- Review API response in network tab

### Issue: Loading state never ends

- Check for API errors in console
- Verify axios interceptors are working
- Check authentication token

### Issue: Type errors

- Ensure API response matches User interface
- Check field mappings in transformation
- Verify optional fields are handled

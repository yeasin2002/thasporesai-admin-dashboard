# User Table Component

## Overview

The `UserTable` component is a reusable, type-safe table component that handles both **Customers** and **Contractors** with a single implementation.

## Features

- ✅ **Fully Type-Safe** - TypeScript generics ensure type safety
- ✅ **Reusable** - Single component for multiple user types
- ✅ **Modular** - Easy to extend with new user types
- ✅ **Dynamic Columns** - Automatically renders correct columns based on user type
- ✅ **Built-in Actions** - View, Suspend/Activate, Delete
- ✅ **Profile Drawer** - Integrated profile view drawer

## Usage

### Customer Table

```tsx
import { UserTable, type Customer } from "./UserTable";

const customers: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    location: "New York, USA",
    status: "Active",
    jobPosted: 15,
  },
];

export const CustomerTable = () => {
  return (
    <UserTable
      title="Customers"
      data={customers}
      userType="customer"
      onView={(id) => console.log("View customer:", id)}
      onSuspend={(id) => console.log("Suspend customer:", id)}
      onDelete={(id) => console.log("Delete customer:", id)}
    />
  );
};
```

### Contractor Table

```tsx
import { UserTable, type Contractor } from "./UserTable";

const contractors: Contractor[] = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "0987654321",
    location: "Los Angeles, USA",
    status: "Active",
    skills: ["Plumbing", "Electrical"],
    rating: 4.5,
    reviews: 120,
    doneJobs: 45,
    verification: "Verified",
  },
];

export const ContractorTable = () => {
  return (
    <UserTable
      title="Contractors"
      data={contractors}
      userType="contractor"
      onView={(id) => console.log("View contractor:", id)}
      onSuspend={(id) => console.log("Suspend contractor:", id)}
      onDelete={(id) => console.log("Delete contractor:", id)}
    />
  );
};
```

## Props

### `UserTableProps<T>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | Table title (e.g., "Customers", "Contractors") |
| `data` | `T[]` | ✅ | Array of user data |
| `userType` | `"customer" \| "contractor"` | ✅ | Determines which columns to display |
| `onView` | `(id: number) => void` | ❌ | Callback when view action is clicked |
| `onSuspend` | `(id: number) => void` | ❌ | Callback when suspend/activate is clicked |
| `onDelete` | `(id: number) => void` | ❌ | Callback when delete action is clicked |

## Types

### `Customer`

```typescript
interface Customer extends BaseUser {
  jobPosted: number;
}
```

### `Contractor`

```typescript
interface Contractor extends BaseUser {
  skills: string[];
  rating: number;
  reviews: number;
  doneJobs: number;
  verification: "Verified" | "Pending";
}
```

### `BaseUser`

```typescript
interface BaseUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "Suspended";
}
```

## Column Configuration

### Customer Columns
- Name
- Email
- Phone
- Location
- Status
- Job Posted
- Actions

### Contractor Columns
- Name
- Skills (with badges)
- Rating (with star icon)
- Location
- Status
- Done Jobs
- Verification
- Actions

## Actions Menu

Each row has an actions menu with:
- **View** - Opens profile drawer
- **Suspend/Activate** - Toggles user status
- **Delete** - Removes user from table

## State Management

The component manages its own state for:
- Open menu ID (for dropdown)
- Drawer open/close state
- Data updates (suspend/delete)

## Extending

To add a new user type:

1. Create a new interface extending `BaseUser`
2. Add the type to `UserType` union
3. Add column configuration in `getColumns()`
4. Use the component with the new type

```typescript
// 1. Define new type
interface Admin extends BaseUser {
  permissions: string[];
  lastLogin: string;
}

// 2. Update UserType
export type UserType = "customer" | "contractor" | "admin";

// 3. Add columns in getColumns()
if (userType === "admin") {
  return [
    // ... admin columns
  ];
}

// 4. Use it
<UserTable
  title="Admins"
  data={admins}
  userType="admin"
/>
```

## Benefits of Refactoring

### Before
- ❌ Duplicate code in `CustomerTable` and `ContractorTable`
- ❌ Hard to maintain (changes needed in multiple places)
- ❌ More files to manage
- ❌ Inconsistent behavior between tables

### After
- ✅ Single source of truth
- ✅ Easy to maintain and extend
- ✅ Type-safe with TypeScript generics
- ✅ Consistent behavior across all user types
- ✅ Reduced code by ~60%

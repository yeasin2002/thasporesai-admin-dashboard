/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  _id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  account_status: "active" | "inactive"; // assuming possible values
  isSuspend: boolean;
  is_verified: boolean;
  category: any[]; // adjust type if you know category structure
  experience: any[]; // adjust type if you know experience structure
  skills: any[]; // adjust type if you know skill structure
  work_samples: any[]; // adjust type if you know work sample structure
  createdAt: string;
  updatedAt: string;
  location: string;
  __v: number;
}

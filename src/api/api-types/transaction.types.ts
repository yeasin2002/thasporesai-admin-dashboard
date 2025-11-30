import { SortOrder } from "./user.types";

export type TransactionType =
  | "platform_fee"
  | "service_fee"
  | "contractor_payout"
  | "refund"
  | "deposit"
  | "withdrawal"
  | "escrow_hold"
  | "escrow_release";

export type TransactionStatus = "pending" | "completed" | "failed" | "cancelled";

export type TransactionSortField = "createdAt" | "updatedAt" | "amount" | "completedAt";

export interface TransactionUser {
  _id: string;
  full_name: string;
  email: string;
}

export interface Transaction {
  _id: string;
  type: TransactionType;
  amount: number;
  from: TransactionUser;
  to: TransactionUser;
  offer: string;
  job: string;
  status: TransactionStatus;
  description: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TransactionPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TransactionsResponse {
  status: number;
  message: string;
  data: {
    transactions: Transaction[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  success: boolean;
}

export interface TransactionResponse {
  status: number;
  message: string;
  data: Transaction;
  success: boolean;
}

export interface ErrorResponse {
  status: number;
  message: string;
  data: string;
  success: boolean;
  errors: string;
}

/**
 * Query parameters for fetching transactions
 * @see GET /api/wallet/transactions
 */
export interface GetTransactionsParams {
  /** Filter by transaction type */
  type?: TransactionType;
  /** Filter by transaction status */
  status?: TransactionStatus;
  /** Filter by user ID (from or to) */
  userId?: string;
  /** Filter by job ID */
  jobId?: string;
  /** Filter by offer ID */
  offerId?: string;
  /** Page number (default: 1) */
  page?: number;
  /** Items per page (default: 10) */
  limit?: number;
  /** Sort field (default: createdAt) */
  sortBy?: TransactionSortField;
  /** Sort order: ascending or descending (default: desc) */
  sortOrder?: SortOrder;
}

import { useQuery } from "@tanstack/react-query";
import { GetTransactionsParams } from "../api-types/transaction.types";
import { getTransactions } from "../query-list/transaction.query";

/**
 * React Query hook for fetching transactions with filtering, sorting, and pagination
 * @param params - Query parameters for filtering and pagination
 * @returns Query result with transactions data, loading state, and error
 * @example
 * ```tsx
 * const { data, isLoading, error } = useTransactions({
 *   type: "service_fee",
 *   status: "completed",
 *   page: 1,
 *   limit: 10,
 *   sortBy: "createdAt",
 *   sortOrder: "desc"
 * });
 * 
 * const transactions = data?.data.transactions;
 * const pagination = data?.data.pagination;
 * ```
 */
export const useTransactions = (params?: GetTransactionsParams) => {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => getTransactions(params),
  });
};

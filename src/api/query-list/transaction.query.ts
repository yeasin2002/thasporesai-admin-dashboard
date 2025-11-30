import { axiosInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import {
  ErrorResponse,
  GetTransactionsParams,
  TransactionsResponse,
} from "../api-types/transaction.types";

/**
 * Fetch all transactions with filtering, sorting, and pagination
 * @param params - Query parameters for filtering transactions
 * @returns Promise with transactions data and pagination info
 * @throws {AxiosError<ErrorResponse>} When the API request fails
 */
export const getTransactions = async (
  params?: GetTransactionsParams,
): Promise<TransactionsResponse> => {
  try {
    const { data } = await axiosInstance.get<TransactionsResponse>("/wallet/transactions", {
      params,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.message || "Failed to fetch transactions");
    }
    throw error;
  }
};

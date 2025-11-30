import { useTransactions } from "@/api/api-hooks/useTransactions";
import { GetTransactionsParams, TransactionStatus } from "@/api/api-types/transaction.types";
import { useState } from "react";
import SearchAndFilterBar from "../user/search-filter-bar";
import PaymentTable from "./payment-table";

export const Payments = () => {
  const [currentFilter, setCurrentFilter] = useState<TransactionStatus | "all">("all");
  const [page] = useState(1);

  const handleSearchSubmit = (_query: string, filter: string) => {
    setCurrentFilter(filter as TransactionStatus | "all");
  };

  const handleFilterSelection = (filter: string) => {
    setCurrentFilter(filter as TransactionStatus | "all");
  };

  const statusOptions = ["all", "pending", "completed", "failed", "cancelled"];

  const params: GetTransactionsParams = {
    status: currentFilter !== "all" ? (currentFilter as TransactionStatus) : undefined,
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  const { data, isLoading, error } = useTransactions(params);

  return (
    <div>
      <SearchAndFilterBar
        onSearch={handleSearchSubmit}
        onFilterChange={handleFilterSelection}
        filterOptions={statusOptions}
      />
      <div>
        <PaymentTable transactions={data?.data.transactions} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

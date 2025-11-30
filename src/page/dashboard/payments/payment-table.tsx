import { Transaction, TransactionStatus } from "@/api/api-types/transaction.types";
import { TableSkeletonLoader } from "@/components/shared/table-skeleton-loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  transactions: Transaction[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
}

const PaymentTable = ({ transactions, isLoading, error }: Props) => {
  const getStatusClasses = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return "bg-gray-200 text-gray-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatTransactionType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (isLoading) {
    return <TableSkeletonLoader rows={5} columns={8} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-gray-500">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#F8F8F8] p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#000000]">Payment Transactions</h2>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id} className="*:py-3">
                <TableCell className="font-medium">{transaction._id.slice(-8)}</TableCell>
                <TableCell>{formatTransactionType(transaction.type)}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{transaction.from.full_name}</p>
                    <p className="text-xs text-gray-500">{transaction.from.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{transaction.to.full_name}</p>
                    <p className="text-xs text-gray-500">{transaction.to.email}</p>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClasses(transaction.status)}`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {transaction.description || "N/A"}
                </TableCell>
                <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentTable;

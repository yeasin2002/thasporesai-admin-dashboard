import React, { useState } from "react";
import { Download, Eye } from "lucide-react"; // Icons for Export and View

// 1. Updated Interface for Payment Transaction Data
interface PaymentTransaction {
  id: number;
  jobId: string;
  jobTitle: string;
  customer: string;
  contractor: string;
  amount: number;
  commissionRate: number; // Stored as a flat percentage value, e.g., 5
  status: "Completed" | "Pending" | "Failed";
  postedDate: string;
}

const PaymentTable: React.FC = () => {
  // Simple state to hold the data
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    {
      id: 1,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customer: "Robert Browny Crown",
      contractor: "Asif Rahman Raj",
      amount: 3500,
      commissionRate: 5,
      status: "Completed",
      postedDate: "2023-10-14",
    },
    {
      id: 2,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customer: "Robert Browny Crown",
      contractor: "Asif Rahman Raj",
      amount: 3500,
      commissionRate: 5,
      status: "Pending",
      postedDate: "2023-10-14",
    },
    {
      id: 3,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customer: "Robert Browny Crown",
      contractor: "Asif Rahman Raj",
      amount: 3500,
      commissionRate: 5,
      status: "Failed",
      postedDate: "2023-10-13",
    },
    {
      id: 4,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customer: "Robert Browny Crown",
      contractor: "Asif Rahman Raj",
      amount: 3500,
      commissionRate: 5,
      status: "Pending",
      postedDate: "2023-10-12",
    },
    {
      id: 5,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customer: "Robert Browny Crown",
      contractor: "Asif Rahman Raj",
      amount: 3500,
      commissionRate: 5,
      status: "Completed",
      postedDate: "2023-10-11",
    },
    {
      id: 6,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customer: "Robert Browny Crown",
      contractor: "Asif Rahman Raj",
      amount: 3500,
      commissionRate: 5,
      status: "Pending",
      postedDate: "2023-10-10",
    },
    {
      id: 7,
      jobId: "021F2548H",
      jobTitle: "Kitchen Plumbing...",
      customer: "Robert Browny Crown",
      contractor: "Asif Rahman Raj",
      amount: 3500,
      commissionRate: 5,
      status: "Completed",
      postedDate: "2023-10-09",
    },
  ]);

  // Handler for the Export button
  const handleExport = () => {
    console.log("Exporting payment transactions data...");
    // Add your data export logic here (e.g., generating a CSV file)
  };

  // Handler for the View action
  const handleView = (id: number) => {
    console.log(`Viewing transaction details for ID: ${id}`);
    // Add logic to open a modal or navigate to a details page
  };

  // Helper function for status badge styling
  const getStatusClasses = (status: PaymentTransaction["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-gray-200 text-gray-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Helper function to calculate commission amount
  const calculateCommission = (amount: number, rate: number) => {
    return (amount * (rate / 100)).toFixed(0);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      {/* Header with Title and Export Button */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#000000]">Payment Transactions</h2>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Download size={16} />
          Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[#616161]">Job ID</th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[#616161]">
                Job Title
              </th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[#616161]">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[#616161]">
                Contractor
              </th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[#616161]">Amount</th>
              <th className="px-4 py-3 text-left text-[16px] font-medium text-[#616161]">
                Commission ({transactions[0]?.commissionRate ?? 5}%)
              </th>{" "}
              {/* Uses the rate from data */}
              <th className="px-4 py-3 text-left text-sm font-medium text-[#616161]">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#616161]">
                Posted Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#616161]">Action</th>{" "}
              {/* View column */}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-[16px] text-[#212121]">{transaction.jobId}</td>

                <td className="px-4 py-3 text-[16px] font-medium text-[#212121]">
                  {transaction.jobTitle}
                </td>

                <td className="px-4 py-3 text-[16px] text-gray-700">{transaction.customer}</td>

                <td className="px-4 py-3 text-[16px] text-gray-700">{transaction.contractor}</td>

                {/* Amount column - Styled as currency */}
                <td className="px-4 py-3 text-[16px] font-medium text-[#212121]">
                  ${transaction.amount.toFixed(0)}
                </td>

                {/* Commission column - Styled as green text */}
                <td className="px-4 py-3 text-[16px] font-medium text-green-600">
                  ${calculateCommission(transaction.amount, transaction.commissionRate)}
                </td>

                {/* Status Badge */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(transaction.status)}`}
                  >
                    {transaction.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-[16px] text-gray-600">{transaction.postedDate}</td>

                {/* View Button/Icon */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleView(transaction.id)}
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-[16px] text-gray-600 transition-colors hover:bg-gray-200"
                  >
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;

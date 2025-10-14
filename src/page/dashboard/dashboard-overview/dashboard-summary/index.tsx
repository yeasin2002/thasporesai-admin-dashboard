import React from "react";
import { Users, Briefcase, DollarSign, Wallet } from "lucide-react";

const DashboardSummaryCard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mx-auto grid max-w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <div className="rounded-xl bg-[#6B9BC2] p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-90">Total Users</p>
              <h2 className="mt-2 text-3xl font-bold">28,300</h2>
            </div>
            <div className="rounded-lg bg-white p-2">
              <Users size={24} color="#6B9BC2" />
            </div>
          </div>
        </div>

        {/* Active Jobs */}
        <div className="rounded-xl border border-[#6B9BC2] bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6B9BC2]">Active Jobs</p>
              <h2 className="mt-2 text-3xl font-bold text-[#6B9BC2]">28,300</h2>
            </div>
            <div className="rounded-lg bg-[#6B9BC2] p-2">
              <Briefcase size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="rounded-xl border border-[#6B9BC2] bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6B9BC2]">Total Revenue</p>
              <h2 className="mt-2 text-3xl font-bold text-[#6B9BC2]">1,20,542 $</h2>
            </div>
            <div className="rounded-lg bg-[#6B9BC2] p-2">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* My Commission */}
        <div className="rounded-xl border border-[#6B9BC2] bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6B9BC2]">My Commission</p>
              <h2 className="mt-2 text-3xl font-bold text-[#6B9BC2]">20,542 $</h2>
            </div>
            <div className="rounded-lg bg-[#6B9BC2] p-2">
              <Wallet size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaryCard;

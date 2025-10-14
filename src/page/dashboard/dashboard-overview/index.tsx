import DashboardSummaryCard from "./dashboard-summary";
import { JobsOverview } from "./job-overview.tsx";
import { UserGrowthChart } from "./user-growth-chart/index.tsx";
import { RevenueCommissionChart } from "./weekly-graph";

// import RevenueCommissionChart from "./weekly-graph";

export const DashboardOverview = () => {
  return (
    <div className="mb-20">
      <DashboardSummaryCard />
      <RevenueCommissionChart />
      <div className="mt-5 gap-3 md:flex">
        <div className="h-[400px] md:w-1/2">
          <JobsOverview />
        </div>
        <div className="mt-5 h-[350px] md:mt-0 md:w-1/2">
          <UserGrowthChart />
        </div>
      </div>
    </div>
  );
};

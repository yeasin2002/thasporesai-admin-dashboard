"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { day: "Sun", revenue: 230000, commission: 165000 },
  { day: "Mon", revenue: 220000, commission: 185000 },
  { day: "Mon", revenue: 195000, commission: 145000 },
  { day: "Wed", revenue: 280000, commission: 225000 },
  { day: "Tue", revenue: 210000, commission: 155000 },
  { day: "Fri", revenue: 235000, commission: 210000 },
  { day: "Sat", revenue: 290000, commission: 215000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(210, 50%, 60%)",
  },
  commission: {
    label: "Commission",
    color: "hsl(210, 50%, 75%)",
  },
};

export function RevenueCommissionChart() {
  return (
    <Card className="mt-4 bg-[#F8F8F8] p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">Revenue & Commission</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[hsl(210,50%,60%)]" />
              <span className="text-muted-foreground text-sm">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[hsl(210,50%,75%)]" />
              <span className="text-muted-foreground text-sm">Commission</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            Weekly
          </Button>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="revenue"
              fill="hsl(210, 50%, 60%)"
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="commission"
              fill="hsl(210, 50%, 75%)"
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}

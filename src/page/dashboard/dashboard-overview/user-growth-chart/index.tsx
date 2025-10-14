"use client";

import { Card } from "@/components/ui/card";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { day: "Sat", customers: 1200, contractors: 800 },
  { day: "Sun", customers: 1500, contractors: 1100 },
  { day: "Mon", customers: 1800, contractors: 1400 },
  { day: "Tue", customers: 2600, contractors: 1900 },
  { day: "Wed", customers: 2200, contractors: 2100 },
  { day: "Thu", customers: 2000, contractors: 2300 },
  { day: "Fri", customers: 2200, contractors: 2400 },
];

const chartConfig = {
  customers: {
    label: "Customers",
    color: "hsl(220, 70%, 30%)",
  },
  contractors: {
    label: "Contractors",
    color: "hsl(210, 50%, 75%)",
  },
};

export function UserGrowthChart() {
  return (
    <Card className="bg-[#F8F8F8] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">User growth</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(220,70%,30%)]" />
            <span className="text-muted-foreground text-sm">Customers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(210,50%,75%)]" />
            <span className="text-muted-foreground text-sm">Contractors</span>
          </div>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
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
              domain={[0, 3000]}
              ticks={[0, 1000, 2000, 3000]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="natural"
              dataKey="customers"
              stroke="hsl(220, 70%, 30%)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="natural"
              dataKey="contractors"
              stroke="hsl(210, 50%, 75%)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}

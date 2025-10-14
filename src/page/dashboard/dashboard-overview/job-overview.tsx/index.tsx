"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const jobsData = [
  {
    label: "Active Jobs",
    value: "12,22",
    progress: 65,
    // Softer blue for active items
    color: "#11344F",
  },
  {
    label: "Pending jobs",
    value: "25",
    progress: 85,
    // A slightly lighter, more muted blue
    color: "#13527F",
  },
  {
    label: "Completed jobs",
    value: "2,202",
    progress: 95,
    // A very light, almost desaturated blue/gray for completed
    color: "#A3C4E0",
  },
];

export function JobsOverview() {
  return (
    <Card className="h-full p-6 shadow-sm bg-[#F8F8F8]">
      {" "}
      {/* Added shadow for depth like the image */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#000000]">Jobs Overview</h2>{" "}
        {/* Darker text for titles */}
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        >
          {" "}
          {/* Softer button style */}
          <Calendar className="h-4 w-4 text-gray-500" /> {/* Muted icon color */}
          Weekly
        </Button>
      </div>
      <div className="space-y-6">
        {jobsData.map((job, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{job.label}</span>{" "}
              {/* Softer text color */}
              <span className="text-sm font-semibold text-gray-800">{job.value}</span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-100">
              {" "}
              {/* Lighter background for the track */}
              <div
                className="h-full rounded-full transition-all duration-300 ease-in-out" // Added transition for smoothness
                style={{
                  width: `${job.progress}%`,
                  backgroundColor: job.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

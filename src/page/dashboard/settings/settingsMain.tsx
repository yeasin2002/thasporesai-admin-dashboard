"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SettingsFormData {
  autoApprove: boolean;
  paymentProvider: string;
  paymentSchedule: string;
  minimumPayout: string;
  securityContractors: string;
  supportContractors: string;
  securityPrivacy: string;
  supportLegal: string;
}

const SettingsPage = () => {
  const [viewMode, setViewMode] = useState<"edit" | "view">("edit");
  const [savedData, setSavedData] = useState<SettingsFormData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SettingsFormData>({
    defaultValues: {
      autoApprove: false,
      paymentProvider: "Stripe",
      paymentSchedule: "Weekly",
      minimumPayout: "50",
      securityContractors: "Contractors",
      supportContractors: "Contractors",
      securityPrivacy: "",
      supportLegal: "",
    },
  });

  const autoApprove = watch("autoApprove");
  // const paymentProvider = watch("paymentProvider");
  const paymentSchedule = watch("paymentSchedule");
  const securityContractors = watch("securityContractors");
  const supportContractors = watch("supportContractors");

  const onSubmit = (data: SettingsFormData) => {
    setSavedData(data);
    setViewMode("view");
    console.log("Settings saved:", data);
  };

  const handleWithdraw = () => {
    console.log("Withdraw clicked");
  };

  if (viewMode === "view" && savedData) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto rounded-lg bg-white p-8 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <Button onClick={() => setViewMode("edit")} variant="outline">
              Edit Settings
            </Button>
          </div>
          <p className="mb-8 text-sm text-gray-600">
            Manage your platform configuration and preferences
          </p>

          <div className="space-y-8">
            {/* Auto Approve Section */}
            <div className="border-b pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-900">
                    Auto approve certificate verification
                  </h3>
                  <p className="text-sm text-gray-500">
                    Automatically approve new contractor registrations
                  </p>
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    savedData.autoApprove
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {savedData.autoApprove ? "Enabled" : "Disabled"}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#616161]">
                  Payment Provider
                </label>
                <div className="text-base text-gray-900">{savedData.paymentProvider}</div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#616161]">
                  Payment Schedule
                </label>
                <div className="text-base text-gray-900">{savedData.paymentSchedule}</div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#616161]">
                  Minimum payout amount
                </label>
                <div className="text-base text-gray-900">${savedData.minimumPayout}</div>
              </div>
            </div>

            {/* Security & Privacy */}
            <div className="space-y-6 border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Security & Privacy</h2>
                  <p className="mt-1 text-[18px] text-[#616161]">Platform security and privacy</p>
                </div>
                <div className="bg-white text-sm font-medium text-gray-900">
                  {savedData.securityContractors}
                </div>
              </div>
              <p className="text-sm whitespace-pre-line text-gray-600">
                {savedData.securityPrivacy || "No additional security information provided."}
              </p>
            </div>

            {/* Support & Legal */}
            <div className="space-y-6 border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Support & Legal</h2>
                  <p className="mt-1 text-sm text-gray-500">Platform support & Legal</p>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {savedData.supportContractors}
                </div>
              </div>
              <p className="text-sm whitespace-pre-line text-gray-600">
                {savedData.supportLegal || "No support or legal information provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="mx-auto max-w-full rounded-lg bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mb-8 text-sm text-gray-600">
          Manage your platform configuration and preferences
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Auto Approve Section */}
          <div className="rounded-md border-b bg-[#F8F8F8] p-5 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1 text-sm font-medium text-gray-900">
                  Auto approve certificate verification
                </h3>
                <p className="text-sm text-gray-500">
                  Automatically approve new contractor registrations
                </p>
              </div>
              <Switch
                checked={autoApprove}
                onCheckedChange={(checked) => setValue("autoApprove", checked)}
              />
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-6 rounded-md bg-[#F8F8F8] p-5">
            <h2 className="text-[20px] font-semibold text-[#000000]">Payment Information</h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#616161]">
                Payment Schedule
              </label>
              <Select
                value={paymentSchedule}
                onValueChange={(value) => setValue("paymentSchedule", value)}
              >
                <SelectTrigger className="w-1/2 bg-white py-6">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#616161]">
                Minimum payout amount
              </label>
              <Input
                type="number"
                {...register("minimumPayout", {
                  required: "Minimum payout is required",
                })}
                placeholder="50"
                className="w-1/2 bg-white py-6"
              />
              {errors.minimumPayout && (
                <p className="mt-1 text-sm text-red-600">{errors.minimumPayout.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleWithdraw}
                className="rounded-full bg-[#13527F] px-12 py-2 text-white hover:bg-[#0f4065]"
              >
                Withdraw
              </Button>
            </div>
          </div>

          {/* Security & Privacy */}
          <div className="space-y-4 rounded-md bg-[#F8F8F8] p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">Security & Privacy</h2>
                <p className="mt-1 text-[18px] text-[#616161]">Platform security and privacy</p>
              </div>
              <Select
                value={securityContractors}
                onValueChange={(value) => setValue("securityContractors", value)}
              >
                <SelectTrigger className="w-40 bg-white">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Contractors">Contractors</SelectItem>
                  <SelectItem value="Employees">Employees</SelectItem>
                  <SelectItem value="All Users">All Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              {...register("securityPrivacy")}
              placeholder="Enter security and privacy information..."
              className="min-h-[100px] w-full bg-white"
            />

            <div className="flex justify-end">
              <Button type="submit" className="rounded-full bg-[#13527F] hover:bg-[#0f4065]">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4 rounded-md bg-[#F8F8F8] p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">Support & Legal</h2>
                <p className="mt-1 text-[18px] text-gray-500">Platform support & Legal</p>
              </div>
              <Select
                value={supportContractors}
                onValueChange={(value) => setValue("supportContractors", value)}
              >
                <SelectTrigger className="w-40 bg-white">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Contractors">Contractors</SelectItem>
                  <SelectItem value="Employees">Employees</SelectItem>
                  <SelectItem value="All Users">All Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              {...register("supportLegal")}
              placeholder="Enter support and legal information..."
              className="min-h-[100px] w-full bg-white"
            />

            <div className="flex justify-end">
              <Button type="submit" className="rounded-full bg-[#13527F] hover:bg-[#0f4065]">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;

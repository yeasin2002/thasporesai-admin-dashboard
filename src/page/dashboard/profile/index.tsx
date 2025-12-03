/* eslint-disable @typescript-eslint/no-explicit-any */
import { Camera } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function AdminProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "The",
      lastName: "Aye",
      email: "theaye03@gmail.com",
      phone: "+201 266 64640",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    alert("Profile updated successfully!");

    reset({
      ...data,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <h1 className="text-[32px] font-bold text-[#000000]">Admin Profile</h1>
            <p className="mt-1 text-[16px] text-[#616161]">Manage Your Account Information</p>
          </div>
          <div className="my-4 rounded-md bg-[#F8F8F8] p-6">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=68"
                alt="Profile"
                className="h-16 w-16 rounded-full border-2 border-gray-200 object-cover"
              />

              <div className="absolute -right-2 -bottom-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md">
                <Camera size={16} className="text-gray-600" />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="my-4 mb-8 rounded-md bg-[#F8F8F8] p-6">
            <h3 className="mb-4 text-lg text-[24px] font-semibold text-[#000000]">
              Personal Information
            </h3>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[18px] font-medium text-[#000000]">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="mb-2 block text-[18px] font-medium text-[#000000]">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[18px] font-medium text-[#000000]">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="mb-2 block text-[18px] font-medium text-[#000000]">
                  Phone no
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="my-4 mb-8 rounded-md bg-[#F8F8F8] p-6">
            <h3 className="mb-4 text-lg text-[24px] font-semibold text-[#000000]">
              Change Password
            </h3>

            <div className="mb-4">
              <label className="mb-2 block text-[18px] font-medium text-[#000000]">
                Current Password
              </label>
              <input
                type="password"
                {...register("currentPassword")}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[18px] font-medium text-[#000000]">
                  New Password
                </label>
                <input
                  type="password"
                  {...register("newPassword")}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="mb-2 block text-[18px] font-medium text-[#000000]">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-end gap-3 border-t border-gray-200 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="rounded-2xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#13527F] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

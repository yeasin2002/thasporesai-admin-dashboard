import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants";
import { AuthInput, AuthTitle } from "@/page/auth/components";
import { ResetPasswordResponse } from "@/types/response";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (body: ResetPasswordRequest) =>
      axios.post<ResetPasswordResponse>(`${API_BASE_URL}/auth/reset-password`, body, {
        headers: { "Content-Type": "application/json" },
      }),
    onError: (error: AxiosError<{ message?: string; errors?: Array<{ message: string }> }>) => {
      console.log("🚀 ~ ResetPassword ~ error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        "Failed to reset password";
      toast.error(errorMessage);
    },

    onSuccess: (response) => {
      console.log("🚀 ~ ResetPassword ~ response:", response);
      toast.success(response.data.message || "Password reset successfully");

      // Navigate to login page after successful reset
      setTimeout(() => {
        navigate("/");
      }, 1500);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log("Reset password data:", data);

    if (!emailFromState) {
      toast.error("Email not found. Please start from forgot password page.");
      navigate("/forgot-password");
      return;
    }

    await mutateAsync({
      email: emailFromState,
      otp: data.otp,
      newPassword: data.password,
    });
  };

  return (
    <div className="bg-background flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-md space-y-8">
        <div>
          <AuthTitle title="Reset Password" subtitle="Please enter a new password" />
          <p className="mt-2 text-gray-400">Email : {emailFromState}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* <AuthInput
              icon={<Mail />}
              placeholder="E-mail"
              labelName="Email"
              type="email"
              groupClassName="py-6"
              value={emailFromState}
              disabled={true}
            /> */}

            <AuthInput
              register={register("otp")}
              error={errors.otp?.message}
              icon={<Lock />}
              placeholder="OTP"
              labelName="Enter OTP"
              type="text"
              groupClassName="py-6"
            />
            <AuthInput
              register={register("password")}
              error={errors.password?.message}
              icon={<Lock />}
              placeholder="New password"
              labelName="Enter New Password"
              type="password"
              groupClassName="py-6"
            />

            <AuthInput
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
              icon={<Lock />}
              placeholder="Confirm password"
              labelName="Confirm New Password"
              type="password"
              groupClassName="py-6"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="h-12 w-full rounded-lg bg-[#3d4f5c] px-12 text-white hover:bg-[#4a5d6a]"
              disabled={isPending}
            >
              {isPending ? "Resetting..." : "Done"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

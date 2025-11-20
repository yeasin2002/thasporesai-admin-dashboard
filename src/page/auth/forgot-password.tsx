import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants";
import { AuthInput, AuthTitle } from "@/page/auth/components";
import { ForgotPasswordResponse } from "@/types/response";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ChevronRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (body: { email: string }) =>
      axios.post<ForgotPasswordResponse>(`${API_BASE_URL}/auth/forgot-password`, body, {
        headers: { "Content-Type": "application/json" },
      }),
    onError: (error: AxiosError<{ message?: string; errors?: Array<{ message: string }> }>) => {
      console.log("🚀 ~ ForgotPassword ~ error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        "Failed to send OTP";
      toast.error(errorMessage);
    },

    onSuccess: (response, variables) => {
      console.log("🚀 ~ ForgotPassword ~ response:", response);
      toast.success(response.data.message || "OTP sent successfully to your email");

      // Navigate to reset password page with email
      navigate("/reset-password", { state: { email: variables.email } });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log("Forgot password data:", data);
    await mutateAsync(data);
  };

  return (
    <div className="bg-background flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-md space-y-8">
        <AuthTitle title="Forgot Password" subtitle="To catch you follow the process" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AuthInput
            register={register("email")}
            error={errors.email?.message}
            icon={<Mail />}
            placeholder="E-mail"
            type="email"
            groupClassName="py-6"
          />

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="h-12 rounded-lg bg-[#3d4f5c] px-12 text-white hover:bg-[#4a5d6a]"
              disabled={isPending}
            >
              {isPending ? "Sending..." : "Send Code"}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

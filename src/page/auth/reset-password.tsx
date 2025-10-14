import { Button } from "@/components/ui/button";
import { AuthInput, AuthTitle } from "@/page/auth/components";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log("Reset password data:", data);
  };

  return (
    <div className="bg-background flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-md space-y-8">
        <AuthTitle title="Reset Password" subtitle="Please enter a new password" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
              placeholder="New password"
              labelName="Confirm New Password"
              type="password"
              groupClassName="py-6"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="h-12 w-full rounded-lg bg-[#3d4f5c] px-12 text-white hover:bg-[#4a5d6a]"
            >
              Done
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

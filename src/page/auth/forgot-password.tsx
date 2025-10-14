import { Button } from "@/components/ui/button";
import { AuthInput, AuthTitle } from "@/page/auth/components";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("Forgot password data:", data);
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
            >
              Send Code
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            <span className="text-muted-foreground text-sm">Don't get any code?</span>
            <Button type="button" variant="link" className="text-sm">
              Resend Code
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

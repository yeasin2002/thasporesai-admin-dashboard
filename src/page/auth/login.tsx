import { Button } from "@/components/ui/button";
import { AuthFooter, AuthInput, AuthTitle } from "@/page/auth/components";
import { loginSchema, type LoginFormData } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
  };

  return (
    <div className="bg-background flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-md space-y-8">
        <AuthTitle title="Login" subtitle="Please select your account" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <AuthInput
              register={register("email")}
              error={errors.email?.message}
              icon={<Mail />}
              placeholder="Email"
              type="email"
              groupClassName="py-6"
            />

            <AuthInput
              register={register("password")}
              error={errors.password?.message}
              icon={<Lock />}
              placeholder="Password"
              type="password"
              groupClassName="py-6"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="h-12 rounded-lg bg-[#3d4f5c] px-12 text-white hover:bg-[#4a5d6a]"
            >
              Login
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
        <AuthFooter title="Don't have an account" subtitle="Forgot Password?" url="/register" />
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { API_BASE_URL_Admin } from "@/constants";
import { AuthFooter, AuthInput, AuthTitle } from "@/page/auth/components";
import useAuthStore from "@/store/auth.store";
import { AuthSuccessResponse } from "@/types/response";
import { loginSchema, type LoginFormData } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ChevronRight, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setTokens } = useAuthStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      axios.post<AuthSuccessResponse>(`${API_BASE_URL_Admin}/auth/login`, body, {
        headers: { "Content-Type": "application/json" },
      }),
    onError: (error: AxiosError) => {
      console.log("🚀 ~ LoginPage ~ error:", error);

      if (error.status === 401) return toast.error("Invalid email or password");
      else return toast.error("Something went wrong");
    },

    onSuccess: (status) => {
      console.log("🚀 ~ LoginPage ~ status:", status);
      setUser(status.data.data.user);
      setTokens(status.data.accessToken, status.data.refreshToken);

      toast.success("Login successful");
      return navigate("/dashboard");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login data:", data);
    await mutateAsync(data);
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
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
        <AuthFooter title="Don't have an account" subtitle="Forgot Password?" url="/register" />
      </div>
    </div>
  );
}

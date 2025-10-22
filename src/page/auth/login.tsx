import { Button } from "@/components/ui/button";
import verifyToken from "@/hooks/verfyToken";
import { AuthFooter, AuthInput, AuthTitle } from "@/page/auth/components";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authslice";
import { loginSchema, type LoginFormData } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "mdkawsarislam2002@gmail.com",
      password: "yeasin2002",
    },
  });
  const [login, { error, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data: LoginFormData) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      console.log(res.error);
      if (res?.success) {
        toast.success("Login successful");
        const user = verifyToken(res.data?.accessToken);
        dispatch(setUser({ user, token: res.data?.accessToken }));
        navigate("/dashboard");
      }else if(res?.error){
        toast.error(res.error.data.message)
      }
    } catch (error: any) {
      console.error("Login Error:", error);
    }
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
              disabled={isSubmitting}
              className={`flex h-12 items-center justify-center gap-2 rounded-lg px-12 text-white transition-all duration-300 ${isSubmitting ? "cursor-not-allowed bg-[#3d4f5c]/70" : "bg-[#3d4f5c] hover:scale-[1.02] hover:bg-[#4a5d6a]"}`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span className="font-medium">Signing in...</span>
                </>
              ) : (
                <>
                  <span className="font-medium">Login</span>
                  <ChevronRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
        <AuthFooter title="Don't have an account" subtitle="Forgot Password?" url="/register" />
      </div>
    </div>
  );
}

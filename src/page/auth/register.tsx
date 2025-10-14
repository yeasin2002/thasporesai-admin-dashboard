import { Button } from "@/components/ui/button";
import { AuthFooter, AuthInput, AuthTitle } from "@/page/auth/components";
import { registerSchema, type RegisterFormData } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, ChevronRight, Globe, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data);
  };

  return (
    <div className="bg-background flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-2xl space-y-8">
        <AuthTitle title="Sign-Up" subtitle="Please select your account" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <AuthInput
                register={register("firstName")}
                error={errors.firstName?.message}
                icon={<User />}
                placeholder="First name"
                type="text"
                groupClassName="py-6"
              />

              <AuthInput
                register={register("lastName")}
                error={errors.lastName?.message}
                icon={<User />}
                placeholder="Last name"
                type="text"
                groupClassName="py-6"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <AuthInput
                register={register("companyName")}
                error={errors.companyName?.message}
                icon={<Building2 />}
                placeholder="Company name"
                type="text"
                groupClassName="py-6"
              />

              <AuthInput
                register={register("country")}
                error={errors.country?.message}
                icon={<Globe />}
                placeholder="Country"
                type="text"
                groupClassName="py-6"
              />
            </div>

            <AuthInput
              register={register("email")}
              error={errors.email?.message}
              icon={<Mail />}
              placeholder="E-mail"
              type="email"
              groupClassName="py-6"
            />

            <AuthInput
              register={register("password")}
              error={errors.password?.message}
              icon={<Lock />}
              placeholder="Create Password"
              type="password"
              groupClassName="py-6"
            />

            <AuthInput
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
              icon={<Lock />}
              placeholder="Confirm Password"
              type="password"
              groupClassName="py-6"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="h-12 rounded-lg bg-[#3d4f5c] px-12 text-white hover:bg-[#4a5d6a]"
            >
              Sign Up
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>

        <AuthFooter title="Already have an account?" subtitle="Login" url="/login" />
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { AuthTitle } from "@/page/auth/components";
import { cn } from "@/utils";
import { otpSchema, type OtpFormData } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { OTPInput, SlotProps } from "input-otp";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const OtpPage = () => {
  const [otpValue, setOtpValue] = useState("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = (data: OtpFormData) => {
    console.log("OTP data:", data);
  };

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    setValue("otp", value, { shouldValidate: true });
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-8 py-12">
      <div className="w-full max-w-md space-y-8">
        <AuthTitle title="OTP Verification!" subtitle="Please Check your email" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <OTPInput
              value={otpValue}
              onChange={handleOtpChange}
              containerClassName="flex items-center justify-start gap-3"
              maxLength={4}
              render={({ slots }) => (
                <div className="flex gap-4">
                  {slots.map((slot, idx) => (
                    <Slot key={idx} {...slot} />
                  ))}
                </div>
              )}
            />
            {errors.otp && (
              <p className="text-destructive text-start text-sm">{errors.otp.message}</p>
            )}
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="h-12 w-full rounded-lg bg-[#3d4f5c] text-white hover:bg-[#4a5d6a]"
            >
              Verify
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "text-foreground flex size-16 items-center justify-center rounded-lg border-0 bg-[#9EA3A7] text-2xl font-medium shadow-sm transition-all",
        {
          "bg-[#3d4f5c]": props.isActive,
        },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}

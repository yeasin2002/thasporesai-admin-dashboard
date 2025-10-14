import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface AuthInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  register?: UseFormRegisterReturn;
  error?: string;
  icon?: React.ReactNode;
  labelName?: string;
  groupClassName?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
}

export const AuthInput = ({
  register,
  error,
  icon,
  labelName,
  groupClassName,
  type = "text",
  className,
  ...props
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full space-y-1.5">
      {labelName && (
        <Label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {labelName}
        </Label>
      )}
      <InputGroup
        className={cn("h-11", error && "border-destructive", groupClassName)}
        data-disabled={props.disabled}
      >
        {icon && (
          <InputGroupAddon align="inline-start" className="pointer-events-none">
            {icon}
          </InputGroupAddon>
        )}
        <InputGroupInput
          type={inputType}
          aria-invalid={!!error}
          className={cn(className)}
          {...(register || {})}
          {...props}
        />
        {isPassword && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              size="icon-xs"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};

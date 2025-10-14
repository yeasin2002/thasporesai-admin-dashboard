import LogoImg from "@/assets/logo.svg?react";
import { cn } from "@/utils";

interface Props extends React.ComponentProps<"svg"> {}

export const Logo = ({ className, ...props }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <LogoImg className={cn("mt-2 size-12", className)} {...props} />
      <p className="text-sidebar-foreground text-lg font-semibold">Lignaflow</p>
    </div>
  );
};

export const LogoIcon = ({ className, ...props }: Props) => {
  return <LogoImg className={cn("mt-2 size-12", className)} {...props} />;
};

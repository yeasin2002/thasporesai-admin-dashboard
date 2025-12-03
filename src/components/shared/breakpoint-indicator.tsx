import { cn } from "@/utils";

export const BreakpointIndicator = ({ className }: { className?: string }) => {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-50 flex size-8 items-center justify-center rounded-full bg-black p-2 font-mono text-xs text-white",
        className,
      )}
    >
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
};

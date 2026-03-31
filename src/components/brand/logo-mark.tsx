import { Building2 } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  iconClassName?: string;
};

export function LogoMark({ className, iconClassName }: LogoMarkProps) {
  return (
    <div
      className={cn(
        "flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md",
        className,
      )}
    >
      <Building2 className={cn("size-7", iconClassName)} aria-hidden />
    </div>
  );
}

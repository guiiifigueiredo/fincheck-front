import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isPending?: boolean;
}

export function Button({
  className,
  isPending,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isPending}
      className={cn(
        "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all",
        className,
      )}
      {...props}
      
      />
  );
}

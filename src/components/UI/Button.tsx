"use client";

import * as React from "react";
import Link from "next/link";
import { tv } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    variant: {
      default: "bg-slate-950 text-white hover:bg-slate-900",
      secondary: "bg-slate-100 text-slate-950 hover:bg-slate-200",
      outline:
        "border border-slate-200 bg-transparent text-slate-950 hover:bg-slate-100",
      ghost: "bg-transparent text-slate-950 hover:bg-slate-100",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    },
    size: {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-11 px-6 text-base",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      fullWidth,
      isLoading,
      loadingText,
      href,
      disabled,
      ...props
    },
    ref,
  ) => {
    const content = (
      <button
        ref={ref}
        className={buttonVariants({
          variant,
          size,
          fullWidth,
          className,
        })}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? loadingText || "Loading..." : children}
      </button>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={buttonVariants({ variant, size, fullWidth, className })}
        >
          {isLoading ? loadingText || "Loading..." : children}
        </Link>
      );
    }

    return content;
  },
);

Button.displayName = "Button";

export default Button;

import { clsx } from "@/utils";
import React from "react";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    startIcon?: JSX.Element | null;
    endIcon?: JSX.Element | null;
  }
> = ({ startIcon, endIcon, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        "py-1.5 text-sm flex-shrink-0 inline-flex items-center px-3 rounded-sm outline outline-[1px] dark:outline-zinc-100 outline-zinc-700 dark:text-white text-zinc-900",
        props.className ?? ""
      )}
    >
      {startIcon}
      <span>{props.children}</span>
      {endIcon}
    </button>
  );
};

export default Button;

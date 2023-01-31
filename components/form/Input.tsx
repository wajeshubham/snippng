import { clsx } from "@/utils";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

const Input: React.FC<Props> = ({ label, containerClassName, ...props }) => {
  return (
    <div className="flex flex-col">
      {label ? (
        <label
          className="text-sm my-0.5 dark:text-white text-zinc-900"
          htmlFor={props.id}
        >
          {label}
        </label>
      ) : null}
      <input
        {...props}
        className={clsx(
          "w-full dark:bg-zinc-700 placeholder:dark:text-zinc-400 block px-2 py-1.5 bg-zinc-100 border-[1px] dark:border-zinc-400 border-zinc-300 dark:text-white text-zinc-900 outline-none rounded-sm",
          props.className ?? ""
        )}
      />
    </div>
  );
};

export default Input;

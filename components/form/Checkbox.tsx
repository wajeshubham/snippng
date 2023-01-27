import { clsx } from "@/utils";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  description?: string;
}

const Checkbox: React.FC<Props> = ({ label, id, description, ...props }) => {
  return (
    <fieldset className="my-1 cursor-pointer">
      <legend className="sr-only">Checkboxes</legend>
      <div className="relative flex items-center">
        <div className="flex h-5 items-center">
          <input
            {...props}
            id={id}
            type="checkbox"
            className={clsx(
              "h-5 w-5 rounded-full checked:dark:bg-zinc-700 checked:bg-zinc-700 checked:dark:text-zinc-700 checked:text-zinc-700 dark:bg-zinc-400 bg-zinc-100 dark:border-zinc-100 border-zinc-300 !border-[1px] !ring-0",
              props.className || ""
            )}
          />
        </div>
        <div className="ml-3">
          <label
            htmlFor={id}
            className="font-medium dark:text-white text-zinc-900"
          >
            {label}
          </label>
          {description ? (
            <p id="comments-description" className="text-zinc-500">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </fieldset>
  );
};

export default Checkbox;

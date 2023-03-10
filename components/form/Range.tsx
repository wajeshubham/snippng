import { clsx } from "@/utils";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  unit: string;
  label: string;
  min: number;
  max: number;
}
const Range: React.FC<Props> = ({ unit = "px", label, ...props }) => {
  return (
    <div className="w-full my-2 dark:text-white text-zinc-900">
      <div>
        <p>{label}</p>
      </div>
      <div className="w-full flex justify-start items-start flex-col">
        <input
          {...props}
          type="range"
          className={clsx(
            "w-full h-2 bg-gray-200 mt-3 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 text-teal-500",
            props.className || ""
          )}
        />
        <div className="flex justify-between w-full items-center my-2">
          <span className="text-xs">{`${props.min}${unit}`}</span>
          <span className="text-xs">{`${props.max}${unit}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Range;

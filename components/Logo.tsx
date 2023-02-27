import { clsx } from "@/utils";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import React from "react";

const isBeta = false;

const Logo: React.FC<{ size?: "xs" | "sm" | "xl" | "2xl" }> = ({
  size = "xl",
}) => {
  const getTextClassesBySize = () => {
    switch (size) {
      case "xs":
        return " text-xs";
      case "sm":
        return " text-sm";
      case "xl":
        return " text-xl";
      case "2xl":
        return " text-2xl";
      default:
        return "text-xl";
    }
  };

  const getIconClassesBySize = () => {
    switch (size) {
      case "xs":
        return "h-4 w-4 mr-1";
      case "sm":
        return "h-5 w-5 mr-1";
      case "xl":
        return "h-7 w-7 mr-2";
      case "2xl":
        return "h-9 w-9 mr-2";
      default:
        return "h-7 w-7 mr-2";
    }
  };

  return (
    <h1
      className={clsx(
        "relative dark:text-white text-zinc-900 inline-flex items-center",
        getTextClassesBySize() || ""
      )}
    >
      <CommandLineIcon
        className={clsx("inset-0", getIconClassesBySize() || "")}
      />
      <span className="inline-flex items-center">
        Snippng
        {isBeta ? (
          <span className="inline-flex items-center ml-1.5 rounded-sm dark:bg-indigo-600 bg-indigo-100 h-[15px] py-1.5 px-1 text-[10px] dark:text-indigo-100 text-indigo-600 border-[1px] border-indigo-600">
            Beta
          </span>
        ) : null}
      </span>
    </h1>
  );
};

export default Logo;

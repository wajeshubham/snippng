import { DEFAULT_COLORS } from "@/lib/constants";
import { CheckIcon } from "@heroicons/react/24/outline";
import React from "react";

interface Props {
  selectedColors: string[];
  onSelect: (color: string) => void;
  onUnSelect: (color: string) => void;
}

export const GradientSelect: React.FC<Props> = ({
  selectedColors,
  onSelect,
  onUnSelect,
}) => {
  return (
    <>
      <p className="dark:text-white text-zinc-900 mt-4">Color palette</p>

      <span className="mb-3 text-xs dark:text-zinc-400 text-zinc-500">
        To create a <strong>gradient</strong>, select multiple. You can control
        the <strong>gradient angle</strong> in the settings dropdown at the top
        right corner.
      </span>
      <div className="flex justify-start items-start gap-3 flex-wrap">
        {DEFAULT_COLORS.map((color) => {
          let selected = selectedColors.includes(color);
          return (
            <button
              key={color}
              onClick={() => {
                selected ? onUnSelect(color) : onSelect(color);
              }}
              className="h-10 w-10 rounded-full border-2 dark:border-white border-zinc-400 flex justify-center items-center relative"
              style={{
                background: color,
              }}
            >
              {selected ? (
                <span className="absolute -top-1 -right-1 rounded-full flex justify-center items-center h-5 w-5 bg-indigo-500">
                  <CheckIcon className="h-4 w-4 font-bold text-white" />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </>
  );
};

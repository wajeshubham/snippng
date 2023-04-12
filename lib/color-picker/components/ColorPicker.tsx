import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

import { SketchPicker } from "react-color";
import { GradientSelect } from "./variants";
interface Props {
  color: string;
  onChange: (color: string) => void;
  gradientColors?: string[];
  onGradientSelect?: (color: string) => void;
  onGradientUnSelect?: (color: string) => void;
  children: React.ReactNode;
}

export const ColorPicker: React.FC<Props> = ({
  color,
  gradientColors,
  onGradientSelect,
  onGradientUnSelect,
  onChange,
  children,
}) => {
  return (
    <Menu as="div" className="relative">
      <input
        className="h-0 w-0 p-0 m-0 absolute"
        data-note="input-to-test-color-picker-and-wrapperBg"
        style={{
          visibility: "hidden",
        }}
        id="color-picker"
        type={"color"}
        defaultValue={color}
      />
      <Menu.Button as="div">{children}</Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute md:w-96 w-72 left-0 -translate-x-1/2 z-50 top-full max-h-[500px] mt-2 origin-top-right divide-y-[1px] dark:divide-zinc-400 divide-zinc-300 dark:bg-black bg-white overflow-auto text-sm rounded-sm outline outline-[1px] dark:outline-zinc-400 outline-zinc-300 dark:dark:text-white text-zinc-900">
          <SketchPicker
            className="!w-fit dark:!bg-black !bg-white !shadow-none"
            color={color}
            onChange={(color) => onChange(color.hex)}
          />

          {gradientColors && onGradientSelect && onGradientUnSelect ? (
            <div className="flex justify-between px-3 pb-3 flex-col">
              <GradientSelect
                selectedColors={gradientColors}
                onSelect={onGradientSelect}
                onUnSelect={onGradientUnSelect}
              />
            </div>
          ) : null}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

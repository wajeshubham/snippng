import { SelectOptionInterface } from "@/types";
import { clsx } from "@/utils";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";

export interface SelectComponentProps {
  value: SelectOptionInterface;
  options: { id: string; label: string }[];
  onChange: (value: SelectOptionInterface) => void;
  children?: React.ReactNode;
  placeholder?: string | React.ReactNode;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const Select: React.FC<SelectComponentProps> = ({
  value,
  placeholder = "Choose one",
  options,
  onChange,
  Icon,
}) => {
  return (
    <Listbox
      value={value}
      onChange={(val) => {
        onChange(val);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative w-full max-w-xs">
            <Listbox.Button className="py-1.5 inline-flex dark:bg-black dark:hover:bg-zinc-800 hover:bg-zinc-100 bg-white items-center text-sm px-3 rounded-sm outline outline-[1px] dark:outline-zinc-400 outline-zinc-300 w-full dark:text-white text-zinc-900">
              {Icon ? (
                <Icon className="h-4 w-4 text-zinc-900 dark:text-white mr-2" />
              ) : null}
              <span className="block truncate text-left">
                {value.label ?? placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center mx-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute dark:bg-black bg-white z-40 mt-1 max-h-60 w-full overflow-auto text-sm rounded-sm outline outline-[1px] dark:outline-zinc-400 outline-zinc-300 dark:text-white text-zinc-900">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      clsx(
                        active
                          ? "dark:text-white text-zinc-900 dark:bg-zinc-600 bg-zinc-100"
                          : "",
                        "relative cursor-default dark:text-white text-zinc-900 select-none py-2 pl-3 pr-9 hover:dark:bg-zinc-600 hover:bg-zinc-100"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            value.id === option.id
                              ? "font-semibold"
                              : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option.label}
                        </span>

                        {value.id === option.id ? (
                          <span
                            className={clsx(
                              "absolute inset-y-0 right-0 flex items-center pr-4 dark:text-white text-zinc-900"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;

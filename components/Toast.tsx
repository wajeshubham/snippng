import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ToastInterface, ToastVariantType } from "@/types";

interface Props extends ToastInterface {
  onClose: () => void;
}

const Toast: React.FC<Props> = ({
  message,
  description,
  type = "success",
  onClose,
}) => {
  const [show, setShow] = useState(false);

  const getIconByType = () => {
    switch (type) {
      case "success":
        return (
          <CheckCircleIcon
            className="h-6 w-6 text-green-500"
            aria-hidden="true"
          />
        );
      case "error":
        return (
          <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
        );
      case "info":
        return (
          <InformationCircleIcon
            className="h-6 w-6 text-blue-500"
            aria-hidden="true"
          />
        );
    }
  };

  useEffect(() => {
    if (show) return;
    let timer = setTimeout(() => {
      setShow(true); // to give some animation
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [show]);

  return (
    <>
      <div
        data-testid="toast"
        className="flex w-full flex-col items-center space-y-4 sm:items-end"
      >
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg dark:bg-zinc-700 border-[1px] dark:border-zinc-600 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{getIconByType()}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    {message}
                  </p>
                  {description ? (
                    <p className="mt-1 text-sm dark:text-zinc-300 text-zinc-500">
                      {description}{" "}
                    </p>
                  ) : null}
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-transparent dark:text-zinc-200 text-zinc-600 hover:dark:text-zinc-100 hover:text-zinc-700"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default Toast;

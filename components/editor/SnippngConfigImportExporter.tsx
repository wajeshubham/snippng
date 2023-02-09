import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
  CloudArrowDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";

import { useSnippngEditor } from "@/context/SnippngEditorContext";
import { useToast } from "@/context/ToastContext";
import {
  clsx,
  copyJSONText,
  deepClone,
  getExportableConfig,
  validateSnippngConfig,
} from "@/utils";
import Button from "../form/Button";
import { SnippngEditorConfigInterface } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SnippngConfigImportExporter: React.FC<Props> = ({ open, onClose }) => {
  const { editorConfig } = useSnippngEditor();
  const [isExport, setIsExport] = useState(true);
  const [configToBeImport, setConfigToBeImport] =
    useState<SnippngEditorConfigInterface | null>(null);
  const [isConfigValid, setIsConfigValid] = useState(false);
  const { addToast } = useToast();

  const getJsxByDatatype = (value: string | number | boolean) => {
    switch (typeof value) {
      case "string":
        return (
          <code className="dark:text-green-300 text-green-700">
            {`"${value}"` || <>&quot;&quot;</>}
          </code>
        );
      case "number":
        return (
          <code className="dark:text-orange-400 text-orange-600">{+value}</code>
        );
      case "boolean":
        return (
          <code className="dark:text-orange-400 text-orange-600">
            {value.toString()}
          </code>
        );
      default:
        return <code className="dark:text-zinc-300 text-zinc-600">null</code>;
    }
  };

  const getEditorConfigJsx = (
    object: object | Array<any>,
    isArray: boolean = false
  ) => {
    if (object === null) return "null";
    return Object.keys(object)
      .sort()
      .map((key) => {
        const val = object[key as keyof typeof object];
        return (
          <pre
            key={key}
            className="whitespace-pre-wrap ml-4 dark:text-white text-zinc-900"
          >
            <code className="dark:text-yellow-500 text-red-500">
              {isArray ? "" : <>&quot;{key}&quot;: </>}
            </code>
            {val && typeof val === "object" ? (
              <>
                <code>{Array.isArray(val) ? "[" : "{"}</code>
                {getEditorConfigJsx(val, Array.isArray(val))}
                <code>{Array.isArray(val) ? "]," : "},"}</code>
              </>
            ) : (
              <>
                {getJsxByDatatype(val)},
                <br />
              </>
            )}
          </pre>
        );
      });
  };

  const parseAndValidateImportedJson = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.addEventListener("load", (e) => {
      let jsonData = JSON.parse(e.target!.result! as string);
      setConfigToBeImport(jsonData);
      setIsConfigValid(validateSnippngConfig(jsonData));
    });
    reader.readAsText(file);
    e.target.value = "";
    e.target.files = null;
    reader.removeEventListener("load", () => {});
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-200 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col divide-y dark:divide-zinc-600 dark:bg-zinc-700 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-zinc-700 dark:bg-zinc-800 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            Import/export config
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-zinc-700 dark:bg-zinc-800 text-zinc-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => onClose()}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-zinc-300">
                            You can copy/export the config in a json file which
                            you can share to others. Similarly, you can
                            import/paste the config here to apply it on the code
                            area
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="w-full flex justify-start border-b-[1px]">
                          <button
                            onClick={() => {
                              setIsExport(true);
                            }}
                            className={clsx(
                              "dark:text-white text-zinc-900 w-1/2 flex-shrink-0 py-2",
                              isExport
                                ? "border-b-2 border-zinc-900 dark:border-white"
                                : ""
                            )}
                          >
                            Export
                          </button>
                          <button
                            onClick={() => {
                              setIsExport(false);
                            }}
                            className={clsx(
                              "dark:text-white text-zinc-900 w-1/2 flex-shrink-0 py-2",
                              isExport
                                ? ""
                                : "border-b-2 border-zinc-900 dark:border-white"
                            )}
                          >
                            Import
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y dark:bg-zinc-700 dark:divide-zinc-600 px-4 sm:px-6">
                          <div className="space-y-6 pt-6 pb-5">
                            {isExport ? (
                              <div>
                                <label
                                  htmlFor="project-name"
                                  className="block text-sm font-medium dark:text-white text-zinc-900"
                                >
                                  Current config
                                </label>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                                  Paste your config and click import to apply
                                  changes or Export the following config by
                                  clicking export button
                                </p>

                                <div className="relative overflow-hidden mt-1 text-xs text-zinc-900 rounded-md border-[1px] border-zinc-300 dark:border-zinc-600 dark:text-white bg-zinc-100 dark:bg-zinc-800 p-3">
                                  <div className="absolute top-2 right-2 flex justify-end items-center gap-x-1">
                                    <button
                                      onClick={() => {
                                        const dataToBeDownloaded =
                                          getExportableConfig(editorConfig);
                                        var dataStr =
                                          "data:text/json;charset=utf-8," +
                                          encodeURIComponent(
                                            JSON.stringify(dataToBeDownloaded)
                                          );

                                        let anchor =
                                          document.createElement("a");
                                        anchor.setAttribute("href", dataStr);
                                        anchor.setAttribute(
                                          "download",
                                          "snippngConfig.json"
                                        );
                                        anchor.click();
                                      }}
                                      className="h-6 w-6 flex justify-center items-center rounded-[4px] border-[1px] border-zinc-900/70 dark:border-white/70 text-zinc-900/70 dark:text-white/70 hover:border-zinc-900 hover:dark:border-white hover:text-zinc-900 hover:dark:text-white"
                                    >
                                      <CloudArrowDownIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (!navigator?.clipboard)
                                          return addToast({
                                            message: "navigator unavailable",
                                            type: "error",
                                          });
                                        const dataToBeCopied =
                                          getExportableConfig(editorConfig);
                                        copyJSONText(dataToBeCopied).then(
                                          () => {
                                            debugger;
                                            addToast({
                                              message: "Configuration copied",
                                            });
                                          }
                                        );
                                      }}
                                      className="h-6 w-6 flex justify-center items-center rounded-[4px] border-[1px] border-zinc-900/70 dark:border-white/70 text-zinc-900/70 dark:text-white/70 hover:border-zinc-900 hover:dark:border-white hover:text-zinc-900 hover:dark:text-white"
                                    >
                                      <ClipboardDocumentIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                  <pre>
                                    {"{"}
                                    {getEditorConfigJsx(
                                      getExportableConfig({
                                        ...editorConfig,
                                      })
                                    )}
                                    {"}"}
                                  </pre>
                                </div>
                                <small className="text-zinc-500 dark:text-zinc-400 text-[10px]">
                                  code and background image are empty while
                                  exporting
                                </small>
                              </div>
                            ) : (
                              <>
                                <Button
                                  StartIcon={ArrowDownTrayIcon}
                                  className="w-full"
                                >
                                  Import config
                                </Button>
                                <input
                                  type="file"
                                  accept="application/json"
                                  onChange={parseAndValidateImportedJson}
                                />
                                {configToBeImport ? (
                                  <div className="w-full flex flex-col gap-y-1 !mt-2">
                                    {!isConfigValid ? (
                                      <small className="text-red-500 text-[10px]">
                                        Imported config is invalid
                                      </small>
                                    ) : null}
                                    <div className="relative overflow-hidden text-xs text-zinc-900 rounded-md border-[1px] border-zinc-300 dark:border-zinc-600 dark:text-white bg-zinc-100 dark:bg-zinc-800 p-3">
                                      <pre className="text-white">
                                        {"{"}
                                        {getEditorConfigJsx({
                                          ...deepClone(configToBeImport),
                                        })}
                                        {"}"}
                                      </pre>
                                    </div>
                                  </div>
                                ) : null}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SnippngConfigImportExporter;

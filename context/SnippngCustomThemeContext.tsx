import { Button, Input, SnippngCodeArea } from "@/components";
import {
  SnippngCustomThemeContextInterface,
  SnippngThemeAttributesInterface,
} from "@/types";
import { debounce, LocalStorage } from "@/utils";
import { Dialog, Transition } from "@headlessui/react";
import React, {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSnippngEditor } from "./SnippngEditorContext";

const defaultCustomTheme: SnippngThemeAttributesInterface = {
  id: "",
  label: "Custom theme",
  theme: "light",
  config: {
    attributeName: "#24a507",
    background: "#231c14",
    bool: "#3f91f1",
    className: "#d8ff84",
    comment: "#24a507",
    cursor: "#a0ea00",
    definition: "#00ff7f",
    foreground: "#d8ff84",
    gutterBackground: "#231c14",
    gutterBorder: "#5e4355",
    gutterForeground: "#5e4355",
    keyword: "#d80450",
    lineHighlight: "#ffffff",
    null: "#f63f05",
    number: "#f63f05",
    operator: "#3f91f1",
    selection: "#273900",
    selectionMatch: "#39a78d",
    string: "#e6a2f3",
    tagName: "#d80450",
    typeName: "#24a507",
    variableName: "#8ccdf0",
  },
};

const SnippngCustomThemeContext =
  createContext<SnippngCustomThemeContextInterface>({
    open: false,
    setOpen: (open) => {},
    config: { ...defaultCustomTheme },
  });

const useCustomTheme = () => useContext(SnippngCustomThemeContext);

const SnippngCustomThemeContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<SnippngThemeAttributesInterface>({
    ...defaultCustomTheme,
  });

  const { handleConfigChange } = useSnippngEditor();

  const onConfigChange = debounce(
    (key: keyof typeof theme.config, value: string) => {
      setTheme((prevTheme) => ({
        ...prevTheme,
        config: {
          ...prevTheme.config,
          [key]: value,
        },
      }));
    },
    400
  );

  const saveAndApplyTheme = () => {
    let previousThemes =
      (LocalStorage.get("local_themes") as SnippngThemeAttributesInterface[]) ||
      [];
    let id = crypto.randomUUID();
    let themeToBeApplied = {
      id,
      label: theme.label,
    };
    previousThemes.push({
      ...theme,
      id,
    });
    LocalStorage.set("local_themes", previousThemes);
    handleConfigChange("selectedTheme")(themeToBeApplied);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setTheme({ ...defaultCustomTheme });
    }
  }, [open]);

  return (
    <SnippngCustomThemeContext.Provider
      value={{ open, setOpen, config: theme }}
    >
      {children}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={(value) => {
            let confirm = window.confirm(
              "Are you sure you want to close the theme construction?"
            );
            if (confirm) {
              setOpen(value);
            }
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative flex xl:flex-row flex-col justify-start items-start gap-8 transform overflow-hidden rounded-lg bg-white dark:bg-zinc-900 md:p-8 p-4 border-[1px] dark:border-zinc-500 border-zinc-200  px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-[95%] sm:p-6">
                  <div className="xl:w-4/5 w-full">
                    <SnippngCodeArea underConstructionTheme={theme} />
                  </div>
                  <div className="xl:w-1/5 w-full text-xs dark:text-white flex flex-col gap-y-5 text-zinc-900">
                    <p className="text-lg">Configure a new theme</p>
                    <Input
                      label="Theme name"
                      value={theme.label}
                      onChange={(e) => {
                        setTheme({
                          ...theme,
                          label: e.target.value,
                        });
                      }}
                    />
                    <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                      {Object.keys(theme.config).map((k) => {
                        let key = k as keyof typeof theme.config;
                        return (
                          <div
                            className="flex justify-start relative items-center gap-x-2 w-full"
                            key={k}
                            title={k}
                          >
                            <label
                              className="h-5 w-5 border-[1px] flex flex-shrink-0"
                              style={{ backgroundColor: theme.config[key] }}
                              htmlFor={k}
                            >
                              <input
                                id={k}
                                className="w-0 h-0 opacity-0"
                                type={"color"}
                                value={theme.config[key]}
                                onChange={(e) => {
                                  onConfigChange(key, e.target.value);
                                }}
                              />
                            </label>
                            <p className="truncate">{k}</p>
                          </div>
                        );
                      })}
                    </div>
                    <Button
                      className="w-full justify-center"
                      onClick={saveAndApplyTheme}
                    >
                      Save &amp; apply
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </SnippngCustomThemeContext.Provider>
  );
};

export {
  SnippngCustomThemeContextProvider,
  useCustomTheme,
  SnippngCustomThemeContext,
};

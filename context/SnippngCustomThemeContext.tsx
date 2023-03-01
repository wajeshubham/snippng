import { Button, Input, SnippngCodeArea } from "@/components";
import { ColorPicker } from "@/lib/color-picker";
import {
  SnippngCustomThemeContextInterface,
  SnippngThemeAttributesInterface,
} from "@/types";
import { LocalStorage } from "@/utils";
import { Dialog, Transition } from "@headlessui/react";
import React, {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSnippngEditor } from "./SnippngEditorContext";
import { useToast } from "./ToastContext";

const defaultCustomTheme: SnippngThemeAttributesInterface = {
  id: "",
  label: "Custom theme",
  theme: "light",
  config: {
    attributeName: "#24a507",
    background: "#181e24",
    bool: "#3f91f1",
    className: "#d8ff84",
    comment: "#66a159",
    controlFlow: "#ff8800",
    curlyBraces: "#f394ff",
    cursor: "#f394ff",
    definition: "#49c5ee",
    foreground: "#d1d1d1",
    gutterBackground: "#181e24",
    gutterBorder: "#404040",
    gutterForeground: "#525252",
    keyword: "#ff8800",
    lineHighlight: "#ffffff",
    null: "#ff8800",
    number: "#f63f05",
    operator: "#ff7b00",
    roundBraces: "#3f91f1",
    selection: "#3d3d3d",
    selectionMatch: "#707070",
    squareBraces: "#ffd500",
    string: "#2be937",
    tagName: "#d80450",
    typeName: "#49c5ee",
    variableName: "#ffd500",
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
  const { addToast } = useToast();

  const onConfigChange = (key: keyof typeof theme.config, value: string) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      config: {
        ...prevTheme.config,
        [key]: value,
      },
    }));
  };

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
    addToast({
      message: "Theme saved successfully!",
      description: "You can view your custom themes in your profile",
    });
  };

  const onClose = () => {
    let confirm = window.confirm(
      "Are you sure you want to close the theme construction?"
    );
    if (confirm) {
      setOpen(false);
    }
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
        <Dialog as="div" className="relative z-40" onClose={onClose}>
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
                <Dialog.Panel className="relative flex xl:flex-row flex-col justify-start items-start gap-8 transform overflow-visible rounded-lg bg-white dark:bg-zinc-900 md:p-8 p-4 border-[1px] dark:border-zinc-500 border-zinc-200  px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-[95%] sm:p-6">
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
                            <ColorPicker
                              color={theme.config[key]}
                              onChange={(color) => {
                                onConfigChange(key, color);
                              }}
                            >
                              <div
                                className="h-5 w-5 border-[1px] flex flex-shrink-0"
                                style={{ backgroundColor: theme.config[key] }}
                              ></div>
                            </ColorPicker>
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
                    <Button
                      className="w-full justify-center -mt-2"
                      onClick={onClose}
                    >
                      Cancel
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

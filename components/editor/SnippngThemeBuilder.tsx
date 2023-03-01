import { Button, Input, SnippngCodeArea } from "@/components";
import { useSnippngEditor } from "@/context/SnippngEditorContext";
import { useToast } from "@/context/ToastContext";
import { ColorPicker } from "@/lib/color-picker";
import { defaultCustomTheme, defaultEditorConfig } from "@/lib/constants";
import { SnippngThemeAttributesInterface } from "@/types";
import { LocalStorage } from "@/utils";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

const SnippngThemeBuilder: React.FC<{
  themeConfig?: SnippngThemeAttributesInterface;
}> = ({ themeConfig = { ...defaultCustomTheme } }) => {
  const [theme, setTheme] = useState<SnippngThemeAttributesInterface>({
    ...themeConfig,
  });

  const { handleConfigChange, setEditorConfig } = useSnippngEditor();
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
    addToast({
      message: "Theme saved successfully!",
      description: "You can view your custom themes in your profile",
    });
  };

  useEffect(() => {
    return () => {
      // to avoid changing main editor's config state while creating theme we will set the persisted editor state
      let persistedEditorConfig = LocalStorage.get("config");
      setEditorConfig({
        ...(persistedEditorConfig || defaultEditorConfig),
      });
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-start items-start transform rounded-lg bg-white dark:bg-zinc-900 border-[1px] dark:border-zinc-500 border-zinc-200 text-left shadow-xl transition-all w-full">
      <div className="w-full text-xs px-4 pt-4 dark:text-white flex flex-col gap-y-5 text-zinc-900">
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
        <div className="grid md:grid-cols-7 grid-cols-2 gap-x-2 gap-y-3">
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
                    className="h-7 w-7 border-[1px] flex flex-shrink-0"
                    style={{ backgroundColor: theme.config[key] }}
                  ></div>
                </ColorPicker>
                <p className="truncate">{k}</p>
              </div>
            );
          })}
        </div>
        <Button
          StartIcon={ArrowDownOnSquareIcon}
          className="w-full justify-center"
          onClick={saveAndApplyTheme}
        >
          Save theme
        </Button>
      </div>
      <div className="w-full -mb-10 p-4">
        <SnippngCodeArea underConstructionTheme={theme} />
      </div>
    </div>
  );
};

export default SnippngThemeBuilder;

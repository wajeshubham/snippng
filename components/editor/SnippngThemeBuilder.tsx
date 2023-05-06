import { Button, Input, SnippngCodeArea } from "@/components";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useSnippngEditor } from "@/context/SnippngEditorContext";
import { useToast } from "@/context/ToastContext";
import { ColorPicker } from "@/lib/color-picker";
import { defaultCustomTheme, defaultEditorConfig } from "@/lib/constants";
import { SnippngThemeAttributesInterface } from "@/types";
import { LocalStorage, deepClone } from "@/utils";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const SnippngThemeBuilder: React.FC<{
  themeConfig?: SnippngThemeAttributesInterface;
}> = ({ themeConfig = { ...defaultCustomTheme } }) => {
  const [theme, setTheme] = useState<SnippngThemeAttributesInterface>({
    ...themeConfig,
    isCustom: true,
  });
  const [saving, setSaving] = useState(false);

  const { handleConfigChange, setEditorConfig } = useSnippngEditor();
  const { addToast } = useToast();
  const { user } = useAuth();

  const onConfigChange = (key: keyof typeof theme.config, value: string) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      config: {
        ...prevTheme.config,
        [key]: value,
      },
    }));
  };

  const saveAndApplyTheme = async () => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    if (!user) return;
    setSaving(true);
    try {
      const dataToBeAdded = {
        ...deepClone(theme), // deep clone the theme to avoid mutation
        ownerUid: user.uid,
        owner: {
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        },
      };
      const savedDoc = await addDoc(collection(db, "themes"), {
        ...dataToBeAdded,
      });
      if (savedDoc.id) {
        // get previously saved themes
        let previousThemes =
          (LocalStorage.get(
            "local_themes"
          ) as SnippngThemeAttributesInterface[]) || [];

        // push newly created theme inside the previous themes array
        previousThemes.push({
          ...dataToBeAdded,
          id: savedDoc.id,
        });
        // store the newly created theme inside local storage
        LocalStorage.set("local_themes", previousThemes);

        addToast({
          message: "Theme saved successfully!",
          description: "You can view your custom themes in your profile",
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    return () => {
      // to avoid changing main editor's config state while creating theme
      // we will set the persisted editor state
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
          disabled={saving}
          StartIcon={ArrowDownOnSquareIcon}
          className="w-full justify-center"
          onClick={saveAndApplyTheme}
        >
          {saving ? "Saving..." : "Save theme"}
        </Button>
      </div>
      <div className="w-full -mb-10 p-4">
        <SnippngCodeArea underConstructionTheme={theme} />
      </div>
    </div>
  );
};

export default SnippngThemeBuilder;

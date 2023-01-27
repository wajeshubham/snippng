import { LANGUAGES, THEMES } from "@/lib/constants";
import { SnippngEditorConfig, SnippngEditorContext } from "@/types";
import React, { createContext, useState } from "react";

const defaultEditorConfig: SnippngEditorConfig = {
  selectedLang: LANGUAGES[0],
  selectedTheme: THEMES[0],
  showLineNumbers: false,
  wrapperBg: "#eee811",
  editorWindowControlsType: "mac-left",
  editorFontSize: "14px",
  hasDropShadow: true,
};

const SnippngEditorContext = createContext<SnippngEditorContext>({
  editorConfig: { ...defaultEditorConfig },
  handleConfigChange:
    <K extends keyof SnippngEditorConfig, V extends SnippngEditorConfig[K]>(
      key: K
    ) =>
    (value: V) => {},
});

const SnippngContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [editorConfig, setEditorConfig] = useState<SnippngEditorConfig>({
    ...defaultEditorConfig,
  });

  const handleConfigChange =
    <K extends keyof SnippngEditorConfig, V extends SnippngEditorConfig[K]>(
      key: K
    ) =>
    (value: V) => {
      setEditorConfig({
        ...editorConfig,
        [key]: value,
      });
    };

  return (
    <SnippngEditorContext.Provider value={{ editorConfig, handleConfigChange }}>
      {children}
    </SnippngEditorContext.Provider>
  );
};

export { SnippngContextProvider, SnippngEditorContext };

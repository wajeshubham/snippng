import { LANGUAGES, THEMES } from "@/lib/constants";
import { SnippngEditorConfig, SnippngEditorContext } from "@/types";
import React, { createContext, useEffect, useState } from "react";

const defaultEditorConfig: SnippngEditorConfig = {
  selectedLang:
    LANGUAGES.find((theme) => theme.id === "typescript") || LANGUAGES[0],
  selectedTheme: THEMES[0],
  showLineNumbers: true,
  wrapperBg: "#eee811",
  editorWindowControlsType: "mac-left",
  editorFontSize: 14,
  paddingVertical: 70,
  paddingHorizontal: 70,
  hasDropShadow: true,
  rounded: true,
  fileName: "@utils/debounce.js",
  showFileName: true,
  lineHeight: 19,
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

  const handleLineHeight = () => {
    const content = document.querySelector(".cm-content") as HTMLDivElement;
    const gutters = document.querySelector(".cm-gutters") as HTMLDivElement;
    if (content && gutters) {
      content.style.lineHeight = `${editorConfig.lineHeight}px`;
      gutters.style.lineHeight = `${editorConfig.lineHeight}px`;
    }
  };

  useEffect(() => {
    handleLineHeight();
  }, [editorConfig.lineHeight]);

  return (
    <SnippngEditorContext.Provider value={{ editorConfig, handleConfigChange }}>
      {children}
    </SnippngEditorContext.Provider>
  );
};

export { SnippngContextProvider, SnippngEditorContext };

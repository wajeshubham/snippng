import { LANGUAGES, THEMES } from "@/lib/constants";
import {
  SnippngEditorConfigInterface,
  SnippngEditorContextInterface,
} from "@/types";
import React, { createContext, useCallback, useEffect, useState } from "react";

const defaultEditorConfig: SnippngEditorConfigInterface = {
  selectedLang:
    LANGUAGES.find((language) => language.id === "typescript") || LANGUAGES[0],
  selectedTheme: THEMES.find((theme) => theme.id === "vscodeDark") || THEMES[0],
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

const SnippngEditorContext = createContext<SnippngEditorContextInterface>({
  editorConfig: { ...defaultEditorConfig },
  handleConfigChange:
    <
      K extends keyof SnippngEditorConfigInterface,
      V extends SnippngEditorConfigInterface[K]
    >(
      key: K
    ) =>
    (value: V) => {},
});

const SnippngContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [editorConfig, setEditorConfig] =
    useState<SnippngEditorConfigInterface>({
      ...defaultEditorConfig,
    });

  const handleConfigChange =
    <
      K extends keyof SnippngEditorConfigInterface,
      V extends SnippngEditorConfigInterface[K]
    >(
      key: K
    ) =>
    (value: V) => {
      setEditorConfig({
        ...editorConfig,
        [key]: value,
      });
    };

  const handleLineHeight = useCallback(() => {
    const content = document.querySelector(".cm-content") as HTMLDivElement;
    const gutters = document.querySelector(".cm-gutters") as HTMLDivElement;
    if (content && gutters) {
      content.style.lineHeight = `${editorConfig.lineHeight}px`;
      gutters.style.lineHeight = `${editorConfig.lineHeight}px`;
    }
  }, [editorConfig.lineHeight]);

  useEffect(() => {
    handleLineHeight();
  }, [editorConfig.lineHeight, handleLineHeight]);

  return (
    <SnippngEditorContext.Provider value={{ editorConfig, handleConfigChange }}>
      {children}
    </SnippngEditorContext.Provider>
  );
};

export { SnippngContextProvider, SnippngEditorContext };

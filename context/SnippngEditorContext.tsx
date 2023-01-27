import { LANGUAGES, THEMES } from "@/lib/constants";
import { SnippngEditorConfig, SnippngEditorContext } from "@/types";
import React, { createContext, useEffect, useState } from "react";

const defaultEditorConfig: SnippngEditorConfig = {
  selectedLang: LANGUAGES[0],
  selectedTheme: THEMES[0],
  showLineNumbers: false,
  wrapperBg: "#eee811",
  editorWindowControlsType: "mac-left",
  editorFontSize: 14,
  paddingVertical: 70,
  paddingHorizontal: 70,
  hasDropShadow: true,
  rounded: true,
  fileName: "@pages/index.tsx",
  showFileName: false,
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
    if (
      content &&
      content.style.lineHeight !== `${editorConfig.lineHeight}px`
    ) {
      content.style.lineHeight = `${editorConfig.lineHeight}px`;
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

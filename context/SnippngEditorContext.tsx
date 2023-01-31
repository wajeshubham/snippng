import { defaultEditorConfig } from "@/lib/constants";
import {
  SnippngEditorConfigInterface,
  SnippngEditorContextInterface,
} from "@/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const SnippngEditorContext = createContext<SnippngEditorContextInterface>({
  editorConfig: { ...defaultEditorConfig },
  setEditorConfig: (config: SnippngEditorConfigInterface) => {},
  handleConfigChange:
    <
      K extends keyof SnippngEditorConfigInterface,
      V extends SnippngEditorConfigInterface[K]
    >(
      key: K
    ) =>
    (value: V) => {},
});

const useSnippngEditor = () => useContext(SnippngEditorContext);

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
    <SnippngEditorContext.Provider
      value={{ editorConfig, handleConfigChange, setEditorConfig }}
    >
      {children}
    </SnippngEditorContext.Provider>
  );
};

export { SnippngContextProvider, useSnippngEditor };

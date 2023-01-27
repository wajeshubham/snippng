import { SelectOptionInterface } from "./tsx";

export type SnippngWindowControlsType =
  | "mac-left"
  | "mac-right"
  | "windows-left"
  | "windows-right";

export interface SnippngEditorConfigInterface {
  selectedLang: SelectOptionInterface;
  selectedTheme: SelectOptionInterface;
  wrapperBg: string;
  showLineNumbers: boolean;
  editorWindowControlsType: SnippngWindowControlsType;
  editorFontSize: number;
  hasDropShadow: boolean;
  paddingVertical: number;
  paddingHorizontal: number;
  rounded: boolean;
  fileName: string;
  showFileName: boolean;
  lineHeight: number;
}

export interface SnippngEditorContextInterface {
  editorConfig: SnippngEditorConfigInterface;
  handleConfigChange: <
    K extends keyof SnippngEditorConfigInterface,
    V extends SnippngEditorConfigInterface[K]
  >(
    key: K
  ) => (value: V) => void;
}

import { SelectOptionInterface } from "./tsx";

export type SnippngWindowControls =
  | "mac-left"
  | "mac-right"
  | "windows-left"
  | "windows-right";

export interface SnippngEditorConfig {
  selectedLang: SelectOptionInterface;
  selectedTheme: SelectOptionInterface;
  wrapperBg: string;
  showLineNumbers: boolean;
  editorWindowControlsType: SnippngWindowControls;
  editorFontSize: string;
  hasDropShadow: boolean;
}

export interface SnippngEditorContext {
  editorConfig: SnippngEditorConfig;
  handleConfigChange: <
    K extends keyof SnippngEditorConfig,
    V extends SnippngEditorConfig[K]
  >(
    key: K
  ) => (value: V) => void;
}

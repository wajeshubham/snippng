import { SelectOptionInterface } from "./tsx";

export type SnippngWindowControlsType =
  | "mac-left"
  | "mac-right"
  | "windows-left"
  | "windows-right";

export interface SnippngEditorConfigInterface {
  ownerUid?: string;
  uid?: string;
  code: string;
  editorFontSize: number;
  editorWidth: number;
  editorWindowControlsType: SnippngWindowControlsType;
  gradients: string[];
  gradientAngle: number;
  fileName: string;
  hasDropShadow: boolean;
  lineHeight: number;
  paddingHorizontal: number;
  paddingVertical: number;
  rounded: boolean;
  selectedLang: SelectOptionInterface;
  selectedTheme: SelectOptionInterface;
  showFileName: boolean;
  showLineNumbers: boolean;
  snippetsName: string;
  wrapperBg: string;
}

export interface SnippngEditorContextInterface {
  editorConfig: SnippngEditorConfigInterface;
  handleConfigChange: <
    K extends keyof SnippngEditorConfigInterface,
    V extends SnippngEditorConfigInterface[K]
  >(
    key: K
  ) => (value: V) => void;
  setEditorConfig: (config: SnippngEditorConfigInterface) => void;
}

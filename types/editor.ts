import { createTheme } from "@uiw/codemirror-themes";

export interface SelectOptionInterface {
  id: string;
  label: string;
}

export type CustomTheme = ReturnType<typeof createTheme>;
export interface SnippngThemeAttributesInterface {
  id: string;
  label: string;
  theme: "light" | "dark";
  isPublic?: boolean;
  config: {
    background: string;
    foreground: string;
    cursor: string;
    selection: string;
    selectionMatch: string;
    lineHighlight: string;
    gutterBackground: string;
    gutterForeground: string;
    gutterBorder: string;
    comment: string;
    variableName: string;
    string: string;
    number: string;
    bool: string;
    null: string;
    keyword: string;
    operator: string;
    className: string;
    definition: string;
    typeName: string;
    tagName: string;
    attributeName: string;
    roundBraces: string;
    squareBraces: string;
    curlyBraces: string;
    controlFlow: string;
  };
}

export type SnippngWindowControlsType =
  | "mac-left"
  | "mac-right"
  | "windows-left"
  | "windows-right";

export interface SnippngEditorConfigInterface {
  ownerUid?: string;
  uid?: string;
  watermark?: boolean;
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
  bgImageVisiblePatch: string | null;
  bgBlur: number;
}

type CustomOmit<I, F extends keyof I> = Omit<I, F>; // Omit not throwing type error for some reason

export type SnippngExportableConfig = CustomOmit<
  SnippngEditorConfigInterface,
  "uid" | "ownerUid"
>;

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

export interface SnippngCustomThemeContextInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  config: SnippngThemeAttributesInterface;
}

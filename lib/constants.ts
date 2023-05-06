import {
  SnippngEditorConfigInterface,
  SnippngThemeAttributesInterface,
} from "@/types";
import { deepClone, LocalStorage } from "@/utils";

export const isBrowser = typeof window !== "undefined";

export const THEMES: {
  id: string;
  label: string;
  isCustom?: boolean;
}[] = [
  {
    id: "abcdef",
    label: "ABCDEF",
  },
  {
    id: "androidstudio",
    label: "Android Studio",
  },
  {
    id: "atomone",
    label: "Atom one",
  },
  {
    id: "aura",
    label: "Aura",
  },
  {
    id: "bbedit",
    label: "Bbedit",
  },
  {
    id: "bespin",
    label: "Bespin",
  },
  {
    id: "darcula",
    label: "Darcula",
  },

  {
    id: "duotoneDark",
    label: "Duotone Dark",
  },
  {
    id: "duotoneLight",
    label: "Duotone Light",
  },
  {
    id: "eclipse",
    label: "Eclipse",
  },
  {
    id: "githubDark",
    label: "Github Dark",
  },
  {
    id: "githubLight",
    label: "Github Light",
  },
  {
    id: "gruvboxDark",
    label: "Gruvbox Dark",
  },
  {
    id: "gruvboxLight",
    label: "Gruvbox Light",
  },
  {
    id: "material",
    label: "Material",
  },
  {
    id: "materialDark",
    label: "Material Dark",
  },
  {
    id: "materialLight",
    label: "Material Light",
  },
  {
    id: "noctisLilac",
    label: "Noctis Lilac",
  },
  {
    id: "nord",
    label: "Nord",
  },
  {
    id: "okaidia",
    label: "Okaidia",
  },
  {
    id: "solarizedDark",
    label: "Solarized Dark",
  },
  {
    id: "solarizedLight",
    label: "Solarized Light",
  },
  {
    id: "sublime",
    label: "Sublime",
  },
  {
    id: "tokyoNight",
    label: "Tokyo Night",
  },
  {
    id: "tokyoNightStorm",
    label: "Tokyo Night Storm",
  },
  {
    id: "tokyoNightDay",
    label: "Tokyo Night Day",
  },
  {
    id: "vscodeDark",
    label: "VS Code Dark",
  },
  {
    id: "xcodeDark",
    label: "xCode Dark",
  },
  {
    id: "xcodeLight",
    label: "xCode Light",
  },
];

/**
 *
 * @returns Merged list of predefined and custom themes created by user
 */
export const getAvailableThemes = () => {
  // retrieve the locally saved themes
  let localThemes = LocalStorage.get("local_themes") as
    | SnippngThemeAttributesInterface[]
    | undefined;

  let localThemesToBeMerged: {
    id: string;
    label: string;
    isCustom?: boolean;
  }[] = [];

  if (localThemes?.length) {
    // if there are locally retrieved themes then map them in correct format
    localThemesToBeMerged = localThemes?.map((x) => ({
      id: x.id,
      label: x.label,
      isCustom: x.isCustom || false,
    }));
  }
  return [
    {
      id: "create_new",
      label: "+ Create new",
    },
    ...localThemesToBeMerged,
    ...THEMES,
  ];
};

export const LANGUAGES = [
  {
    label: "Auto",
    id: "auto",
  },
  {
    label: "Apache",
    id: "apache",
    custom: true,
  },
  {
    label: "Bash",
    id: "shell",
  },
  {
    label: "Plain Text",
    id: "text",
  },
  {
    label: "C",
    id: "c",
  },
  {
    label: "C++",
    id: "cpp",
  },
  {
    label: "C#",
    id: "csharp",
  },
  {
    label: "Clojure",
    id: "clojure",
  },
  {
    label: "COBOL",
    id: "cobol",
  },
  {
    label: "CoffeeScript",
    id: "coffeescript",
  },
  {
    label: "Crystal",
    id: "crystal",
  },
  {
    label: "CSS",
    id: "css",
  },
  {
    label: "D",
    id: "d",
  },
  {
    label: "Dart",
    id: "dart",
  },
  {
    label: "Diff",
    id: "diff",
  },
  {
    label: "Django",
    id: "django",
  },
  {
    label: "Docker",
    id: "dockerfile",
  },
  {
    label: "Elixir",
    id: "elixir",
    custom: true,
  },
  {
    label: "Elm",
    id: "elm",
  },
  {
    label: "Erlang",
    id: "erlang",
  },

  {
    label: "Fortran",
    id: "fortran",
  },
  {
    label: "Gherkin",
    id: "gherkin",
  },
  {
    label: "GraphQL",
    id: "graphql",
    custom: true,
  },
  {
    label: "Go",
    id: "go",
  },
  {
    label: "Groovy",
    id: "groovy",
  },
  {
    label: "Handlebars",
    id: "handlebars",
  },
  {
    label: "Haskell",
    id: "haskell",
  },
  {
    label: "HTML/XML",
    id: "htmlmixed",
  },
  {
    label: "Java",
    id: "java",
  },
  {
    label: "JavaScript",
    id: "javascript",
  },
  {
    label: "JSON",
    id: "json",
  },
  {
    label: "JSX",
    id: "jsx",
  },
  {
    label: "Julia",
    id: "julia",
  },
  {
    label: "Kotlin",
    id: "kotlin",
  },
  {
    label: "LaTeX",
    id: "stex",
  },
  {
    label: "Lisp",
    id: "commonlisp",
  },
  {
    label: "Lua",
    id: "lua",
  },
  {
    label: "Markdown",
    id: "markdown",
  },
  {
    label: "Mathematica",
    id: "mathematica",
  },
  {
    label: "MATLAB/Octave",
    id: "octave",
  },
  {
    label: "MySQL",
    id: "mysql",
  },
  {
    label: "N-Triples",
    id: "ntriples",
  },
  {
    label: "NGINX",
    id: "nginx",
  },
  {
    label: "Nim",
    id: "nim",
    custom: true,
  },
  {
    label: "Nix",
    id: "nix",
  },
  {
    label: "Objective C",
    id: "objectiveC",
  },
  {
    label: "Pascal",
    id: "pascal",
  },
  {
    label: "Perl",
    id: "perl",
  },
  {
    label: "PHP",
    id: "php",
  },
  {
    label: "PowerShell",
    id: "powershell",
  },
  {
    label: "Protocol Buffer",
    id: "protobuf",
  },
  {
    label: "Python",
    id: "python",
  },
  {
    label: "R",
    id: "r",
  },
  {
    label: "RISC-V",
    id: "riscv",
    custom: true,
  },
  {
    label: "Ruby",
    id: "ruby",
  },
  {
    label: "Rust",
    id: "rust",
  },
  {
    label: "Sass",
    id: "sass",
  },
  {
    label: "Scala",
    id: "scala",
  },
  {
    label: "Smalltalk",
    id: "smalltalk",
  },
  {
    label: "Solidity",
    id: "solidity",
    custom: true,
  },
  {
    label: "SPARQL",
    id: "sparql",
  },
  {
    label: "SQL",
    id: "sql",
  },
  {
    label: "Stan",
    id: "stan",
  },
  {
    label: "Stylus",
    id: "stylus",
  },
  {
    label: "Swift",
    id: "swift",
  },
  {
    label: "TCL",
    id: "tcl",
  },
  {
    label: "TOML",
    id: "toml",
  },
  {
    label: "Turtle",
    id: "turtle",
  },
  {
    label: "TypeScript",
    id: "typescript",
  },
  {
    label: "TSX",
    id: "tsx",
  },
  {
    label: "Twig",
    id: "twig",
  },
  {
    label: "VB.NET",
    id: "vb",
  },
  {
    label: "Verilog",
    id: "verilog",
  },
  {
    label: "VHDL",
    id: "vhdl",
  },
  {
    label: "Vue",
    id: "vue",
  },
  {
    label: "XQuery",
    id: "xquery",
  },
  {
    label: "YAML",
    id: "yaml",
  },
];

export const DOWNLOAD_OPTIONS = [
  { label: "PNG", id: "png" },
  { label: "JPEG", id: "jpeg" },
  { label: "SVG", id: "svg" },
];

export const DEFAULT_CODE_SNIPPET = `export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};`;

export const PEXELS_QUERY_STRINGS = [
  "background",
  "gradient",
  "landscape",
  "sky",
  "night-sky",
  "galaxy",
  "coding",
  "abstract",
  "texture",
  "beautiful-zoom-backgrounds",
  "colors",
  "rainbow",
  "programming",
  "gray",
  "teal",
  "blue",
  "red",
  "fruits",
  "orange",
  "shine",
  "stars",
  "green",
  "coffee",
  "ice",
  "ocean",
  "plane",
  "seascapes",
  "art",
  "creative",
  "summer",
  "tea",
  "water",
  "juice",
  "blur",
  "wall",
  "design",
  "desk",
  "infra",
  "buildings",
  "city",
  "city-lights",
  "lamp",
  "garden",
  "butterfly",
  "mac",
  "fire",
  "dark",
  "mountain",
  "cat",
  "dog",
  "space",
  "animal",
  "technology",
];

export const defaultCustomTheme: SnippngThemeAttributesInterface = {
  id: "",
  label: "Custom theme",
  theme: "light",
  config: {
    attributeName: "#24a507",
    background: "#181e24",
    bool: "#3f91f1",
    className: "#d8ff84",
    comment: "#66a159",
    controlFlow: "#ff8800",
    curlyBraces: "#f394ff",
    cursor: "#f394ff",
    definition: "#49c5ee",
    foreground: "#d1d1d1",
    gutterBackground: "#181e24",
    gutterBorder: "#404040",
    gutterForeground: "#525252",
    keyword: "#ff8800",
    lineHighlight: "#ffffff",
    null: "#ff8800",
    number: "#f63f05",
    operator: "#ff7b00",
    roundBraces: "#3f91f1",
    selection: "#3d3d3d",
    selectionMatch: "#707070",
    squareBraces: "#ffd500",
    string: "#2be937",
    tagName: "#d80450",
    typeName: "#49c5ee",
    variableName: "#ffd500",
  },
};

export const predefinedConfig: SnippngEditorConfigInterface = {
  code: DEFAULT_CODE_SNIPPET,
  snippetsName: "",
  editorFontSize: 16,
  editorWindowControlsType: "mac-left",
  fileName: "@utils/debounce.ts",
  hasDropShadow: true,
  lineHeight: 19,
  paddingHorizontal: 70,
  paddingVertical: 70,
  rounded: true,
  selectedLang:
    LANGUAGES.find((language) => language.id === "typescript") || LANGUAGES[0],
  selectedTheme:
    THEMES.find((theme) => theme.id === "tokyoNightStorm") || THEMES[0],
  showFileName: true,
  showLineNumbers: true,
  wrapperBg: "#eee811",
  gradients: ["#ba68c8", "#ffa7c4", "#e57373"],
  gradientAngle: 140,
  editorWidth: 0,
  bgImageVisiblePatch: null,
  bgBlur: 0,
  watermark: true,
};

const getConfig = (): SnippngEditorConfigInterface => {
  let persistedConfig = LocalStorage.get(
    "config"
  ) as SnippngEditorConfigInterface;
  if (persistedConfig) return persistedConfig;
  return { ...deepClone(predefinedConfig) };
};

/**
 * gives persisted config else the predefined one
 */
export const defaultEditorConfig: SnippngEditorConfigInterface = getConfig();

export const DEFAULT_BASE_SETUP = {
  foldGutter: false,
  highlightActiveLine: false,
  highlightActiveLineGutter: false,
  indentOnInput: true,
  lineNumbers: true,
  syntaxHighlighting: true,
  tabSize: 4,
};

export const DEFAULT_COLORS = [
  "#000000",
  "#424242",
  "#757575",
  "#bdbdbd",
  "#eeeeee",
  "#ffffff",
  "#b71c1c",
  "#e53935",
  "#e57373",
  "#1b5e20",
  "#43a047",
  "#81c784",
  "#0d47a1",
  "#1e88e5",
  "#64b5f6",
  "#f57f17",
  "#fdd835",
  "#fff176",
  "#4a148c",
  "#8e24aa",
  "#ba68c8",
  "#3e2723",
  "#6d4c41",
  "#a1887f",
  "#ffa7c4",
];

export const DEFAULT_WIDTHS = {
  minWidth: 320,
  maxWidth: 1200,
};

export const DEFAULT_RANGES = {
  min: {
    BLUR: 0,
    FONT_SIZE: 10,
    PADDING_VERTICAL: 0,
    PADDING_HORIZONTAL: 0,
    LINE_HEIGHT: 10,
    GRADIENT_ANGLE: 0,
  },
  max: {
    BLUR: 20,
    FONT_SIZE: 32,
    PADDING_VERTICAL: 100,
    PADDING_HORIZONTAL: 100,
    LINE_HEIGHT: 40,
    GRADIENT_ANGLE: 360,
  },
};

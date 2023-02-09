import { SnippngEditorConfigInterface, SnippngExportableConfig } from "@/types";
import { langs } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import { defaultEditorConfig } from "@/lib/constants";

export const clsx = (...classNames: string[]) =>
  classNames.filter(Boolean).join(" ");

export const getLanguage = (lang: string): keyof typeof langs => {
  return lang as keyof typeof langs;
};

export const getTheme = (lang: string): keyof typeof themes => {
  return lang as keyof typeof themes;
};

export const getEditorWrapperBg = (
  background: string,
  selectedGradients: string[],
  angle: number
) => {
  return selectedGradients.length <= 0
    ? background
    : selectedGradients.length === 1
    ? selectedGradients[0]
    : `linear-gradient(${angle}deg, ${selectedGradients.join(", ")})`;
};

export const deepClone = <T extends object>(obj: T): T | any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = deepClone(item);
      return arr;
    }, []);
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj: object, key) => {
      // @ts-ignore
      newObj[key] = deepClone(obj[key]);
      return newObj;
    }, {});
  }
};

export const getExportableConfig = (
  editorConfig: SnippngEditorConfigInterface
): SnippngExportableConfig => {
  const deepClonedConfig = { ...deepClone(editorConfig) };
  deepClonedConfig.code = "";
  deepClonedConfig.bgImageVisiblePatch = null;
  delete deepClonedConfig.uid;
  delete deepClonedConfig.ownerUid;
  const exportableConfig: SnippngExportableConfig = deepClonedConfig;
  return exportableConfig;
};

export const validateSnippngConfig = (config: SnippngEditorConfigInterface) => {
  return Object.keys(config).every((key) => {
    return (
      typeof config[key as keyof typeof config] ===
      typeof defaultEditorConfig[key as keyof typeof defaultEditorConfig]
    );
  });
};

export const copyJSONText = async <T extends object>(data: T) => {
  return navigator.clipboard?.writeText(JSON.stringify(data));
};

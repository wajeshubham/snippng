import { DEFAULT_RANGES, DEFAULT_WIDTHS, isBrowser } from "@/lib/constants";
import {
  exportedTypeSuite,
  SnippngEditorConfigInterface,
  SnippngExportableConfig,
} from "@/types";
import { langs } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import { createCheckers } from "ts-interface-checker";

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
  const { SnippngEditorConfigInterface } = createCheckers(exportedTypeSuite);
  try {
    SnippngEditorConfigInterface.check(config);
    let minValues = DEFAULT_RANGES.min;
    let maxValues = DEFAULT_RANGES.max;
    if (+config.bgBlur > maxValues.BLUR || +config.bgBlur < minValues.BLUR) {
      throw Error(
        `bgBlur value must be in the range ${minValues.BLUR} to ${maxValues.BLUR}`
      );
    }
    if (
      +config.lineHeight > maxValues.LINE_HEIGHT ||
      +config.lineHeight < minValues.LINE_HEIGHT
    ) {
      throw Error(
        `lineHeight value must be in the range ${minValues.LINE_HEIGHT} to ${maxValues.LINE_HEIGHT}`
      );
    }
    if (
      +config.editorFontSize > maxValues.FONT_SIZE ||
      +config.editorFontSize < minValues.FONT_SIZE
    ) {
      throw Error(
        `editorFontSize value must be in the range ${minValues.FONT_SIZE} to ${maxValues.FONT_SIZE}`
      );
    }
    if (
      +config.gradientAngle > maxValues.GRADIENT_ANGLE ||
      +config.gradientAngle < minValues.GRADIENT_ANGLE
    ) {
      throw Error(
        `gradientAngle value must be in the range ${minValues.GRADIENT_ANGLE} to ${maxValues.GRADIENT_ANGLE}`
      );
    }
    if (
      +config.paddingHorizontal > maxValues.PADDING_HORIZONTAL ||
      +config.paddingHorizontal < minValues.PADDING_HORIZONTAL
    ) {
      throw Error(
        `paddingHorizontal value must be in the range ${minValues.PADDING_HORIZONTAL} to ${maxValues.PADDING_HORIZONTAL}`
      );
    }
    if (
      +config.paddingVertical > maxValues.PADDING_VERTICAL ||
      +config.paddingVertical < minValues.PADDING_VERTICAL
    ) {
      throw Error(
        `paddingVertical value must be in the range ${minValues.PADDING_VERTICAL} to ${maxValues.PADDING_VERTICAL}`
      );
    }
    if (
      +config.editorWidth &&
      (+config.editorWidth > DEFAULT_WIDTHS.maxWidth || +config.editorWidth < 0)
    ) {
      throw Error(
        `editorWidth value must be in the range ${DEFAULT_WIDTHS.minWidth} to ${DEFAULT_WIDTHS.maxWidth}`
      );
    }

    return "";
  } catch (error: any) {
    return error?.message || "Invalid config";
  }
};

export const copyJSONText = async <T extends object>(data: T) => {
  return navigator.clipboard?.writeText(JSON.stringify(data));
};

export class LocalStorage {
  static get(key: string) {
    if (!isBrowser) return;
    let value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }
  static set(key: string, value: any) {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}

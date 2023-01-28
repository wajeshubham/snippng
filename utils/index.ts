import { langs } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";

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

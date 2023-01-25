import { langs } from "@uiw/codemirror-extensions-langs";

export const clsx = (...classNames: string[]) =>
  classNames.filter(Boolean).join(" ");

export const getLanguage = (lang: string): keyof typeof langs => {
  return lang as keyof typeof langs;
};

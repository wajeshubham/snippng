import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const ThemeToggle = () => {
  const disableTransitionsTemporarily = () => {
    document.documentElement.classList.add("[&_*]:!transition-none");
    window.setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none");
    }, 0);
  };

  const toggleMode = () => {
    disableTransitionsTemporarily();
    let isDarkMode = document.documentElement.classList.toggle("dark");
    window.localStorage.isDarkMode = isDarkMode;
  };

  return (
    <button
      data-testid="toggle-btn"
      type="button"
      aria-label="Toggle dark mode"
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={toggleMode}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-800 stroke-zinc-300 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-100 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
    </button>
  );
};

export default ThemeToggle;

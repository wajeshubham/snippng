import { useContext, useState } from "react";

import { DEFAULT_BASE_SETUP } from "@/lib/constants";
import { clsx, getLanguage, getTheme } from "@/utils";

import { langs, loadLanguage } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";

import { SnippngEditorContext } from "@/context/SnippngEditorContext";
import NoSSRWrapper from "../NoSSRWrapper";
import SnippngControlHeader from "./SnippngControlHeader";
import SnippngWindowControls from "./SnippngWindowControls";

const SnippngCodeArea = () => {
  const [code, setCode] =
    useState(`export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};`);

  const { editorConfig } = useContext(SnippngEditorContext);
  const {
    selectedLang,
    selectedTheme,
    wrapperBg,
    editorFontSize,
    editorWindowControlsType,
    showLineNumbers,
    hasDropShadow,
    paddingVertical,
    paddingHorizontal,
    rounded,
    fileName,
    showFileName,
  } = editorConfig;

  return (
    <>
      <section data-testid="snippng-code-area">
        <NoSSRWrapper>
          <div className="rounded-md bg-white dark:bg-zinc-900 p-8 flex justify-start border-[1px] flex-col items-start dark:border-zinc-400 border-zinc-200 shadow-md w-full">
            <div className="w-full">
              <SnippngControlHeader />
            </div>
            <div
              id="code-wrapper"
              className="overflow-hidden p-16 w-full"
              style={{
                backgroundColor: wrapperBg,
                padding: `${paddingVertical}px ${paddingHorizontal}px`,
              }}
            >
              <div
                data-testid="editor-container"
                className={clsx(
                  "overflow-hidden !font-mono relative",
                  hasDropShadow
                    ? "shadow-xl shadow-zinc-900/40 has-drop-shadow-testclass"
                    : "",
                  rounded ? "rounded-md rounded-testclass" : "!rounded-none"
                )}
              >
                <CodeMirror
                  className={clsx("CodeMirror__Main__Editor")}
                  value={code}
                  extensions={[
                    loadLanguage(getLanguage(selectedLang.id))?.extension ||
                      langs.javascript(),
                  ]}
                  basicSetup={{
                    ...DEFAULT_BASE_SETUP,
                    lineNumbers: showLineNumbers,
                  }}
                  style={{
                    fontSize: `${editorFontSize}px`,
                  }}
                  // @ts-ignore
                  theme={themes[getTheme(selectedTheme.id)]}
                  indentWithTab
                  onChange={(value) => {
                    setCode(value);
                  }}
                >
                  <div className="absolute top-0 z-20 w-full text-white !px-3.5 !py-3 bg-inherit">
                    {showFileName ? (
                      <input
                        id="file-name-input"
                        defaultValue={fileName}
                        className="absolute bg-transparent w-72 text-center top-2 -translate-x-1/2 left-1/2 text-xs font-extralight text-zinc-400 focus:border-b-[0.1px] border-zinc-500 outline-none ring-0"
                        spellCheck={false}
                        contentEditable
                        autoComplete="off"
                      />
                    ) : null}
                    <SnippngWindowControls type={editorWindowControlsType} />
                  </div>
                </CodeMirror>
              </div>
            </div>
          </div>
        </NoSSRWrapper>
      </section>
    </>
  );
};

export default SnippngCodeArea;

import { useContext, useState } from "react";

import { DEFAULT_BASE_SETUP, DEFAULT_CODE_SNIPPET } from "@/lib/constants";
import { clsx, getEditorWrapperBg, getLanguage, getTheme } from "@/utils";

import { langs, loadLanguage } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";

import { SnippngEditorContext } from "@/context/SnippngEditorContext";
import NoSSRWrapper from "../NoSSRWrapper";
import SnippngControlHeader from "./SnippngControlHeader";
import SnippngWindowControls from "./SnippngWindowControls";

const SnippngCodeArea = () => {
  const [code, setCode] = useState(DEFAULT_CODE_SNIPPET);

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
    gradients,
    gradientAngle,
  } = editorConfig;

  return (
    <>
      <section
        className="mb-10"
        id="snippng-code-area"
        data-testid="snippng-code-area"
      >
        <NoSSRWrapper>
          <div className="rounded-md bg-white dark:bg-zinc-900 p-8 flex justify-start border-[1px] flex-col items-start dark:border-zinc-500 border-zinc-200 shadow-md w-full">
            <div className="w-full">
              <SnippngControlHeader />
            </div>
            <div
              id="code-wrapper"
              className="overflow-hidden p-16 w-full"
              style={{
                background: getEditorWrapperBg(
                  wrapperBg,
                  gradients,
                  gradientAngle
                ),
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
                  rounded ? "rounded-xl rounded-testclass" : "!rounded-none"
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

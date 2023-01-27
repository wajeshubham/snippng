import { useCallback, useContext, useEffect, useState } from "react";

import { DEFAULT_BASE_SETUP } from "@/lib/constants";
import { clsx, getLanguage, getTheme } from "@/utils";

import { langs, loadLanguage } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";

import { SnippngEditorContext } from "@/context/SnippngEditorContext";
import NoSSRWrapper from "../NoSSRWrapper";
import SnippngControlHeader from "./SnippngControlHeader";
import SnippngHeader from "./SnippngHeader";

const SnippngCodeArea = () => {
  const [code, setCode] = useState(`console.log("Hello world")`);
  const [lineNumberDigits, setLineNumberDigits] = useState(0);
  const { editorConfig, handleConfigChange } = useContext(SnippngEditorContext);

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
  } = editorConfig;

  const setContentMargin = useCallback(() => {
    const gutter = document.querySelector(".cm-gutters") as HTMLDivElement;
    const content = document.querySelector(".cm-content") as HTMLDivElement;
    if (!gutter || !content) {
      handleConfigChange("showLineNumbers")(true);
      // recalculate the margin once gutter and content are mounted
      return;
    }
    if (showLineNumbers) {
      gutter?.classList.remove("!hidden");
    } else {
      gutter?.classList.add("!hidden");
    }
    if (content) {
      content.style.marginLeft = showLineNumbers
        ? `${gutter?.clientWidth ?? 28}px`
        : "0px";
    }
  }, [showLineNumbers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentMargin();
    }, 50);
    return () => {
      clearTimeout(timer);
    };
  }, [setContentMargin, showLineNumbers]);

  return (
    <>
      <section>
        <NoSSRWrapper>
          <div className="rounded-md bg-white dark:bg-zinc-900 p-8 flex justify-start border-[1px] flex-col items-start dark:border-zinc-400 border-zinc-200 shadow-md w-full">
            <div className="w-full">
              <SnippngControlHeader />
            </div>
            <div
              id="code-wrapper"
              className="overflow-hidden p-16 w-full"
              style={{
                background: wrapperBg,
                padding: `${paddingVertical}px ${paddingHorizontal}px`,
              }}
            >
              <div
                data-testid="editor-container"
                className={clsx(
                  "overflow-hidden shadow-md !font-mono relative",
                  hasDropShadow ? "shadow-xl shadow-zinc-900/40" : "",
                  rounded ? "rounded-md" : "!rounded-none"
                )}
              >
                <CodeMirror
                  className={clsx("CodeMirror__Main__Editor")}
                  value={code}
                  extensions={[
                    loadLanguage(getLanguage(selectedLang.id))?.extension ||
                      langs.javascript(),
                  ]}
                  basicSetup={{ ...DEFAULT_BASE_SETUP }}
                  style={{
                    fontSize: `${editorFontSize}px`,
                    lineHeight: "100px",
                  }}
                  // @ts-ignore
                  theme={themes[getTheme(selectedTheme.id)]}
                  indentWithTab
                  onChange={(value, viewUpdate) => {
                    setCode(value);
                    const lineNumber = viewUpdate.state.doc.lines;
                    const lineDigitLength = lineNumber.toString().length;
                    if (lineDigitLength !== lineNumberDigits) {
                      setLineNumberDigits(lineDigitLength);
                      setContentMargin(); // update margin of content based on gutter width
                      // gutter width will change for every digit in line number change
                    }
                  }}
                >
                  <div className="absolute top-0 z-20 w-full text-white !px-3.5 !py-3 bg-inherit">
                    <SnippngHeader type={editorWindowControlsType} />
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

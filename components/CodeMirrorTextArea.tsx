import NoSSRWrapper from "./NoSSRWrapper";
import CodeMirror from "@uiw/react-codemirror";
import { langs, loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useEffect, useState } from "react";
import SnippngHeader from "./SnippngHeader";
import * as htmlToImage from "html-to-image";
import { LANGUAGES, THEMES } from "@/lib/constants";
import { getLanguage, getTheme } from "@/utils";
import Button from "./Button";
import Select from "./Select";
import { CheckIcon } from "@heroicons/react/20/solid";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import * as themes from "@uiw/codemirror-themes-all";

const CodeMirrorTextArea = () => {
  const [code, setCode] = useState(`console.log("Hello world")`);
  const [lineNumberDigits, setLineNumberDigits] = useState(0);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [wrapperBg, setWrapperBg] = useState("#eee811");

  const setContentMargin = () => {
    const gutter = document.querySelector(".cm-gutters") as HTMLDivElement;
    if (showLineNumbers) {
      gutter?.classList.remove("!hidden");
    } else {
      gutter?.classList.add("!hidden");
    }
    const content = document.querySelector(".cm-content") as HTMLDivElement;
    if (content) {
      content.style.marginLeft = showLineNumbers
        ? `${gutter?.clientWidth ?? 28}px`
        : "0px";
    }
  };

  const downloadImage = () => {
    var node = document.getElementById("code-wrapper");
    if (!node) return;
    htmlToImage
      .toPng(node)
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = dataUrl;
        a.click();
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentMargin();
    }, 50);
    return () => {
      clearTimeout(timer);
    };
  }, [showLineNumbers]);

  return (
    <>
      <section>
        <NoSSRWrapper>
          <div className="rounded-md p-8 flex justify-start border-[1px] flex-col items-start dark:border-zinc-100 border-zinc-700 w-full">
            <div className="w-full">
              <div className="mb-4 flex w-full justify-start items-center gap-2">
                <Button
                  startIcon={<CloudArrowDownIcon className="w-4 h-4 mr-2" />}
                  onClick={downloadImage}
                >
                  Download
                </Button>
                <Button
                  className="inline-flex items-center"
                  endIcon={
                    showLineNumbers ? (
                      <CheckIcon className="h-5 w-5 ml-2" />
                    ) : null
                  }
                  onClick={() => {
                    setShowLineNumbers(!showLineNumbers);
                  }}
                >
                  Line count
                </Button>

                <Select
                  value={selectedTheme}
                  onChange={(val) => {
                    if (!val.id) return;
                    setSelectedTheme(val);
                  }}
                  options={[...THEMES]}
                />
                <Select
                  value={selectedLang}
                  onChange={(val) => {
                    if (!val.id) return;
                    setSelectedLang(val);
                  }}
                  options={[...LANGUAGES]}
                />
                <div className="relative">
                  <label
                    htmlFor="color-picker"
                    className="h-8 rounded-sm outline outline-1 dark:outline-white outline-zinc-900 flex aspect-square "
                    style={{
                      backgroundColor: wrapperBg,
                    }}
                  ></label>
                  <input
                    className="h-0 w-0 p-0 m-0 absolute"
                    style={{
                      visibility: "hidden",
                    }}
                    id="color-picker"
                    type={"color"}
                    value={wrapperBg}
                    onChange={(e) => {
                      setWrapperBg(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              id="code-wrapper"
              className="overflow-hidden p-16 w-full"
              style={{
                backgroundColor: wrapperBg,
              }}
            >
              <div
                data-testid="editor-container"
                className="overflow-hidden rounded-md shadow-md !font-mono relative"
              >
                <CodeMirror
                  className="CodeMirror__Main__Editor"
                  value={code}
                  extensions={[
                    loadLanguage(getLanguage(selectedLang.id))?.extension ||
                      langs.javascript(),
                  ]}
                  basicSetup={{
                    lineNumbers: true,
                    indentOnInput: true,
                    tabSize: 4,
                    foldGutter: false,
                    highlightActiveLine: false,
                    highlightActiveLineGutter: false,
                    syntaxHighlighting: true,
                  }}
                  // @ts-ignore
                  theme={themes[getTheme(selectedTheme.id)]}
                  indentWithTab
                  onChange={(value, viewUpdate) => {
                    setCode(value);
                    const lineNumber = viewUpdate.state.doc.lines;
                    const lineDigitLength = lineNumber.toString().length;
                    if (
                      lineDigitLength > lineNumberDigits ||
                      lineDigitLength < lineNumberDigits
                    ) {
                      setLineNumberDigits(lineDigitLength);
                      setContentMargin();
                    }
                  }}
                >
                  <div className="absolute top-0 z-20 w-full text-white !px-3.5 !py-3 bg-inherit">
                    <SnippngHeader type="mac-left" />
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

export default CodeMirrorTextArea;

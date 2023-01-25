import { useCallback, useEffect, useState } from "react";

import { DEFAULT_BASE_SETUP, LANGUAGES, THEMES } from "@/lib/constants";
import { getLanguage, getTheme } from "@/utils";

import { CheckIcon } from "@heroicons/react/20/solid";
import {
  CloudArrowDownIcon,
  CommandLineIcon,
  ListBulletIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import { langs, loadLanguage } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";

import * as htmlToImage from "html-to-image";

import Button from "./Button";
import NoSSRWrapper from "./NoSSRWrapper";
import Select from "./Select";
import SnippngHeader from "./SnippngHeader";

const CodeMirrorTextArea = () => {
  const [code, setCode] = useState(`console.log("Hello world")`);
  const [lineNumberDigits, setLineNumberDigits] = useState(0);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [wrapperBg, setWrapperBg] = useState("#eee811");
  const [downloadingSnippet, setDownloadingSnippet] = useState(false);

  const setContentMargin = useCallback(() => {
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
  }, [showLineNumbers]);

  const downloadImage = () => {
    var node = document.getElementById("code-wrapper");
    if (!node) return;
    setDownloadingSnippet(true);
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
      })
      .finally(() => {
        setDownloadingSnippet(false);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentMargin();
    }, 100);
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
              <div className="mb-4 flex w-full justify-start items-center gap-2">
                <Button
                  disabled={downloadingSnippet}
                  StartIcon={CloudArrowDownIcon}
                  onClick={downloadImage}
                >
                  {downloadingSnippet ? "Downloading..." : "Download"}
                </Button>
                <Button
                  className="inline-flex items-center"
                  StartIcon={ListBulletIcon}
                  EndIcon={showLineNumbers ? CheckIcon : null}
                  onClick={() => {
                    setShowLineNumbers(!showLineNumbers);
                  }}
                >
                  Line count
                </Button>

                <Select
                  Icon={SparklesIcon}
                  value={selectedTheme}
                  onChange={(val) => {
                    if (!val.id) return;
                    setSelectedTheme(val);
                  }}
                  options={[...THEMES]}
                />
                <Select
                  Icon={CommandLineIcon}
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
                    className="h-8 cursor-pointer rounded-sm outline outline-1 dark:outline-white outline-zinc-900 flex aspect-square "
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
                  basicSetup={{ ...DEFAULT_BASE_SETUP }}
                  // @ts-ignore
                  theme={themes[getTheme(selectedTheme.id)]}
                  indentWithTab
                  onChange={(value, viewUpdate) => {
                    setCode(value);
                    const lineNumber = viewUpdate.state.doc.lines;
                    const lineDigitLength = lineNumber.toString().length;
                    if (lineDigitLength !== lineNumberDigits) {
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

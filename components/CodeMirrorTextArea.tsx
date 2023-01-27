import { useCallback, useEffect, useState } from "react";

import { DEFAULT_BASE_SETUP, LANGUAGES, THEMES } from "@/lib/constants";
import { clsx, getLanguage, getTheme } from "@/utils";

import {
  CheckIcon,
  Cog6ToothIcon,
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
import { SnippngEditorConfig } from "@/types";

const CodeMirrorTextArea = () => {
  const [code, setCode] = useState(`console.log("Hello world")`);
  const [lineNumberDigits, setLineNumberDigits] = useState(0);
  const [downloadingSnippet, setDownloadingSnippet] = useState(false);

  const [editorConfig, setEditorConfig] = useState<SnippngEditorConfig>({
    selectedLang: LANGUAGES[0],
    selectedTheme: THEMES[0],
    showLineNumbers: false,
    wrapperBg: "#eee811",
    editorWindowControlsType: "mac-left",
    editorFontSize: "14px",
    hasDropShadow: true,
  });

  const {
    selectedLang,
    selectedTheme,
    showLineNumbers,
    wrapperBg,
    editorWindowControlsType,
    editorFontSize,
    hasDropShadow,
  } = editorConfig;

  const handleConfigChange =
    <K extends keyof SnippngEditorConfig, V extends SnippngEditorConfig[K]>(
      key: K
    ) =>
    (value: V) => {
      setEditorConfig({
        ...editorConfig,
        [key]: value,
      });
    };

  const setContentMargin = useCallback(() => {
    const gutter = document.querySelector(".cm-gutters") as HTMLDivElement;
    const content = document.querySelector(".cm-content") as HTMLDivElement;
    if (!gutter || !content) {
      handleConfigChange("showLineNumbers")(true);
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
                    handleConfigChange("showLineNumbers")(!showLineNumbers);
                  }}
                >
                  Line count
                </Button>

                <Select
                  Icon={SparklesIcon}
                  value={selectedTheme}
                  onChange={(val) => {
                    if (!val.id) return;
                    handleConfigChange("selectedTheme")(val);
                  }}
                  options={[...THEMES]}
                />
                <Select
                  Icon={CommandLineIcon}
                  value={selectedLang}
                  onChange={(val) => {
                    if (!val.id) return;
                    handleConfigChange("selectedLang")(val);
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
                      handleConfigChange("wrapperBg")(e.target.value);
                    }}
                  />
                </div>
                <div className="ml-auto">
                  <Button>
                    <Cog6ToothIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            <div
              id="code-wrapper"
              className="overflow-hidden p-16 w-full"
              style={{
                background: wrapperBg,
              }}
            >
              <div
                data-testid="editor-container"
                className="overflow-hidden rounded-md shadow-md !font-mono relative"
              >
                <CodeMirror
                  className={clsx(
                    "CodeMirror__Main__Editor",
                    hasDropShadow ? "shadow-2xl" : ""
                  )}
                  value={code}
                  extensions={[
                    loadLanguage(getLanguage(selectedLang.id))?.extension ||
                      langs.javascript(),
                  ]}
                  basicSetup={{ ...DEFAULT_BASE_SETUP }}
                  style={{
                    fontSize: editorFontSize,
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
                      setContentMargin();
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

export default CodeMirrorTextArea;

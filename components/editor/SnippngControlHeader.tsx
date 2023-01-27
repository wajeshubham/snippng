import { SnippngEditorContext } from "@/context/SnippngEditorContext";
import { LANGUAGES, THEMES } from "@/lib/constants";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  CloudArrowDownIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import * as htmlToImage from "html-to-image";
import { Fragment, useContext, useState } from "react";
import Button from "../form/Button";
import Checkbox from "../form/Checkbox";
import Range from "../form/Range";
import Select from "../form/Select";

const SnippngControlHeader = () => {
  const [downloadingSnippet, setDownloadingSnippet] = useState(false);

  const { editorConfig, handleConfigChange } = useContext(SnippngEditorContext);

  const {
    selectedLang,
    selectedTheme,
    showLineNumbers,
    wrapperBg,
    hasDropShadow,
    rounded,
    editorFontSize,
    paddingVertical,
    paddingHorizontal,
    editorWindowControlsType,
    showFileName,
    lineHeight,
  } = editorConfig;

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

  return (
    <div className="mb-4 flex w-full justify-start items-center gap-2">
      <Button
        disabled={downloadingSnippet}
        StartIcon={CloudArrowDownIcon}
        onClick={downloadImage}
      >
        {downloadingSnippet ? "Downloading..." : "Download"}
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
          className="h-8 cursor-pointer rounded-sm outline outline-1 dark:outline-white outline-zinc-400 flex aspect-square "
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
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="py-1.5 inline-flex dark:bg-black dark:hover:bg-zinc-800 hover:bg-zinc-100 bg-white items-center text-sm px-3 rounded-sm outline outline-[1px] dark:outline-zinc-400 outline-zinc-300 w-full dark:text-white text-zinc-900">
              <Cog6ToothIcon className="h-5 w-5" />
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-30 mt-2 w-72 origin-top-right divide-y-[1px] dark:divide-zinc-400 divide-zinc-300 dark:bg-black bg-white max-h-max overflow-auto text-sm rounded-sm outline outline-[1px] dark:outline-zinc-400 outline-zinc-300 dark:text-white text-zinc-900">
              <div className="py-1 px-2">
                <Checkbox
                  label="Line count"
                  id="line-count"
                  checked={showLineNumbers}
                  onChange={() => {
                    handleConfigChange("showLineNumbers")(!showLineNumbers);
                  }}
                />
              </div>
              <div className="py-1 px-2">
                <Checkbox
                  label="Drop shadow"
                  id="drop-shadow"
                  checked={hasDropShadow}
                  onChange={() => {
                    handleConfigChange("hasDropShadow")(!hasDropShadow);
                  }}
                />
              </div>
              <div className="py-1 px-2">
                <Checkbox
                  label="Rounded edges"
                  id="rounded"
                  checked={rounded}
                  onChange={() => {
                    handleConfigChange("rounded")(!rounded);
                  }}
                />
              </div>
              <div className="py-1 px-2">
                <Checkbox
                  label="Show filename"
                  description="It renders an input at the top in which you can edit the filename"
                  id="file-name"
                  checked={showFileName}
                  onChange={() => {
                    handleConfigChange("showFileName")(!showFileName);
                  }}
                />
              </div>
              <div className="py-1 px-2 z-30">
                <Range
                  label={`Font size (${editorFontSize}px)`}
                  value={editorFontSize}
                  onChange={(e) => {
                    handleConfigChange("editorFontSize")(+e.target.value);
                  }}
                  max={32}
                  min={10}
                  rangeMin={"10px"}
                  rangeMax={"32px"}
                />
              </div>
              <div className="py-1 px-2 z-30">
                <Range
                  label={`Padding vertical (${paddingVertical}px)`}
                  value={paddingVertical}
                  onChange={(e) => {
                    handleConfigChange("paddingVertical")(+e.target.value);
                  }}
                  max={100}
                  min={0}
                  rangeMin={"0px"}
                  rangeMax={"100px"}
                />
              </div>
              <div className="py-1 px-2 z-30">
                <Range
                  label={`Padding horizontal (${paddingHorizontal}px)`}
                  value={paddingHorizontal}
                  onChange={(e) => {
                    handleConfigChange("paddingHorizontal")(+e.target.value);
                  }}
                  max={100}
                  min={0}
                  rangeMin={"0px"}
                  rangeMax={"100px"}
                />
              </div>
              <div className="py-1 px-2 z-30">
                <Range
                  label={`Line height (${lineHeight}px)`}
                  value={lineHeight}
                  onChange={(e) => {
                    handleConfigChange("lineHeight")(+e.target.value);
                  }}
                  max={40}
                  min={10}
                  rangeMin={"10px"}
                  rangeMax={"40px"}
                />
              </div>
              <div className="py-3 px-2 gap-2 flex flex-col">
                <p>Window controls type</p>
                <Checkbox
                  label="Mac left"
                  id="mac-pos-l"
                  checked={editorWindowControlsType === "mac-left"}
                  onChange={() => {
                    handleConfigChange("editorWindowControlsType")("mac-left");
                  }}
                />
                <Checkbox
                  label="Mac right"
                  id="mac-pos-r"
                  checked={editorWindowControlsType === "mac-right"}
                  onChange={() => {
                    handleConfigChange("editorWindowControlsType")("mac-right");
                  }}
                />
                <Checkbox
                  label="Windows left"
                  id="windows-pos-l"
                  checked={editorWindowControlsType === "windows-left"}
                  onChange={() => {
                    handleConfigChange("editorWindowControlsType")(
                      "windows-left"
                    );
                  }}
                />
                <Checkbox
                  label="Windows right"
                  id="windows-pos-r"
                  checked={editorWindowControlsType === "windows-right"}
                  onChange={() => {
                    handleConfigChange("editorWindowControlsType")(
                      "windows-right"
                    );
                  }}
                />
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default SnippngControlHeader;

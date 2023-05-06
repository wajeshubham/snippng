import { useSnippngEditor } from "@/context/SnippngEditorContext";
import { useToast } from "@/context/ToastContext";
import { ColorPicker } from "@/lib/color-picker";
import {
  DEFAULT_RANGES,
  DOWNLOAD_OPTIONS,
  LANGUAGES,
  defaultEditorConfig,
  getAvailableThemes,
  predefinedConfig,
} from "@/lib/constants";
import { ImagePicker } from "@/lib/image-picker";
import { SelectOptionInterface } from "@/types";
import { getEditorWrapperBg } from "@/utils";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  ArrowsUpDownIcon,
  ChevronDownIcon,
  CloudArrowDownIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  DocumentDuplicateIcon,
  FireIcon,
  PhotoIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import * as htmlToImage from "html-to-image";
import { useRouter } from "next/router";
import { Fragment, RefObject, useState } from "react";
import Button from "../form/Button";
import Checkbox from "../form/Checkbox";
import Range from "../form/Range";
import Select from "../form/Select";
import SnippngConfigImportExporter from "./SnippngConfigImportExporter";

const SnippngControlHeader: React.FC<{
  wrapperRef: RefObject<HTMLDivElement>;
  creatingTheme?: boolean;
}> = ({ wrapperRef, creatingTheme }) => {
  const [openImportExportSidebar, setOpenImportExportSidebar] = useState(false);

  const { editorConfig, handleConfigChange, setEditorConfig } =
    useSnippngEditor();

  const { addToast } = useToast();
  const router = useRouter();

  const {
    code,
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
    gradients,
    gradientAngle,
    snippetsName,
    bgBlur = 0,
    bgImageVisiblePatch,
    watermark,
  } = editorConfig;

  const downloadImage = (type: SelectOptionInterface) => {
    var node = document.getElementById("code-wrapper");
    if (!node) return;
    (() => {
      switch (type.id) {
        case "png":
          return htmlToImage.toPng(node);
        case "jpeg":
          return htmlToImage.toJpeg(node);
        case "svg":
          return htmlToImage.toSvg(node);
        default:
          return htmlToImage.toPng(node);
      }
    })()
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = snippetsName
          ? `${snippetsName.split(" ").join("_").toLowerCase()}.${
              type.id || "png"
            }`
          : "snippng." + (type.id || "png");
        a.click();
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
        addToast({
          message: "Error while downloading the image",
          type: "error",
        });
      });
  };

  return (
    <>
      <SnippngConfigImportExporter
        open={openImportExportSidebar}
        onClose={() => {
          setOpenImportExportSidebar(false);
        }}
      />
      <div className="mb-4 flex flex-wrap w-full justify-start items-center gap-2">
        <Select
          Icon={CloudArrowDownIcon}
          value={{ label: "Download", id: "download" }}
          onChange={downloadImage}
          options={[...DOWNLOAD_OPTIONS]}
        />

        {!creatingTheme ? (
          <Select
            Icon={SparklesIcon}
            value={selectedTheme}
            onChange={(val) => {
              if (!val.id) return;
              if (val.id === "create_new") {
                router.push("/theme/create");
                return;
              }
              handleConfigChange("selectedTheme")(val);
            }}
            options={getAvailableThemes()?.map((op) => {
              if (op?.isCustom) {
                // render icon for a custom theme
                return {
                  ...op,
                  icon: FireIcon,
                };
              }
              return op;
            })}
          />
        ) : null}
        <Select
          Icon={CommandLineIcon}
          value={selectedLang}
          onChange={(val) => {
            if (!val.id) return;
            handleConfigChange("selectedLang")(val);
          }}
          options={[...LANGUAGES]}
        />
        <div
          data-testid="wrapper-color-picker"
          className="relative lg:w-fit w-full flex lg:justify-start justify-end items-center gap-2"
        >
          <Button
            onClick={() => {
              if (!navigator?.clipboard)
                return addToast({
                  message: "navigator unavailable",
                  type: "error",
                });
              navigator.clipboard?.writeText(code).then(() => {
                addToast({
                  message: "Code snippet copied!",
                });
              });
            }}
          >
            <DocumentDuplicateIcon className="h-5 w-5 dark:text-white text-zinc-900" />
          </Button>
          <ColorPicker
            color={wrapperBg}
            gradientColors={gradients}
            onGradientSelect={(color) => {
              let colors = [...gradients, color];
              handleConfigChange("gradients")(colors);
            }}
            onGradientUnSelect={(color) => {
              let colors = [...gradients].filter((c) => c !== color);
              handleConfigChange("gradients")(colors);
            }}
            onChange={(color) => {
              handleConfigChange("wrapperBg")(color);
            }}
          >
            <button
              className="h-8 cursor-pointer rounded-sm outline outline-1 dark:outline-white outline-zinc-400 flex aspect-square "
              style={{
                background: getEditorWrapperBg(
                  wrapperBg,
                  gradients,
                  gradientAngle
                ),
              }}
            ></button>
          </ColorPicker>
          <ImagePicker
            aspect={
              wrapperRef?.current
                ? wrapperRef.current.clientWidth /
                  wrapperRef.current.clientHeight
                : 1
            }
            onChange={(src) => handleConfigChange("bgImageVisiblePatch")(src)}
          >
            <button className="h-8 cursor-pointer rounded-sm outline justify-center items-center outline-1 dark:outline-white outline-zinc-400 flex aspect-square ">
              <PhotoIcon className="h-4 w-4 mx-auto dark:text-white text-zinc-900" />
            </button>
          </ImagePicker>
        </div>

        <div className="ml-auto">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                data-testid="settings-cta"
                className="py-1.5 inline-flex dark:bg-black dark:hover:bg-zinc-800 hover:bg-zinc-100 bg-white items-center text-sm px-3 rounded-sm outline outline-[1px] dark:outline-zinc-400 outline-zinc-300 w-full dark:text-white text-zinc-900"
              >
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
              <Menu.Items className="absolute right-0 max-h-[500px] z-30 mt-2 w-96 origin-top-right divide-y-[1px] dark:divide-zinc-400 divide-zinc-300 dark:bg-black bg-white overflow-auto text-sm rounded-sm outline outline-[1px] dark:outline-zinc-400 outline-zinc-300 dark:text-white text-zinc-900">
                <Menu.Button
                  className="w-full text-left p-2 inline-flex items-center"
                  onClick={() => {
                    setOpenImportExportSidebar(true);
                  }}
                >
                  <ArrowsUpDownIcon className="h-5 w-5 mr-2" /> Import or export
                  config
                </Menu.Button>
                <Menu.Button
                  className="w-full text-left p-2 inline-flex items-center"
                  onClick={() => {
                    setEditorConfig({ ...predefinedConfig });
                  }}
                >
                  <ArrowPathIcon className="h-5 w-5 mr-2" /> Reset settings
                </Menu.Button>
                <div className="py-1 px-2">
                  <Checkbox
                    label="Watermark"
                    id="watermark"
                    data-testid="watermark"
                    checked={watermark}
                    onChange={() => {
                      handleConfigChange("watermark")(!watermark);
                    }}
                  />
                </div>
                <div className="py-1 px-2">
                  <Checkbox
                    label="Line count"
                    id="line-count"
                    data-testid="line-count"
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
                    data-testid="drop-shadow"
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
                    data-testid="rounded"
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
                    data-testid="file-name"
                    checked={showFileName}
                    onChange={() => {
                      handleConfigChange("showFileName")(!showFileName);
                    }}
                  />
                </div>
                <div className="py-1 px-2">
                  <Checkbox
                    label="Remove background"
                    id="remove-bg"
                    data-testid="remove-bg"
                    checked={
                      wrapperBg === "transparent" &&
                      !gradients.length &&
                      !bgBlur &&
                      !bgImageVisiblePatch
                    }
                    onChange={(e) => {
                      if (!e.target.checked) {
                        handleConfigChange("bgImageVisiblePatch")(
                          defaultEditorConfig.bgImageVisiblePatch
                        );
                        handleConfigChange("bgBlur")(
                          defaultEditorConfig.bgBlur
                        );
                        handleConfigChange("gradients")(
                          defaultEditorConfig.gradients
                        );
                        handleConfigChange("wrapperBg")(
                          defaultEditorConfig.wrapperBg
                        );
                      } else {
                        handleConfigChange("bgImageVisiblePatch")(null);
                        handleConfigChange("bgBlur")(0);
                        handleConfigChange("gradients")([]);
                        handleConfigChange("wrapperBg")("transparent");
                      }
                    }}
                  />
                </div>
                <div className="py-1 px-2 z-30">
                  <Range
                    unit="px"
                    label={`Bg blur (${bgBlur}px)`}
                    value={bgBlur}
                    max={DEFAULT_RANGES.max.BLUR}
                    min={DEFAULT_RANGES.min.BLUR}
                    onChange={(e) => {
                      handleConfigChange("bgBlur")(+e.target.value);
                    }}
                  />
                </div>
                <div className="py-1 px-2 z-30">
                  <Range
                    unit="px"
                    label={`Font size (${editorFontSize}px)`}
                    value={editorFontSize}
                    onChange={(e) => {
                      handleConfigChange("editorFontSize")(+e.target.value);
                    }}
                    max={DEFAULT_RANGES.max.FONT_SIZE}
                    min={DEFAULT_RANGES.min.FONT_SIZE}
                  />
                </div>
                <div className="py-1 px-2 z-30">
                  <Range
                    unit="px"
                    label={`Padding vertical (${paddingVertical}px)`}
                    value={paddingVertical}
                    onChange={(e) => {
                      handleConfigChange("paddingVertical")(+e.target.value);
                    }}
                    max={DEFAULT_RANGES.max.PADDING_VERTICAL}
                    min={DEFAULT_RANGES.min.PADDING_VERTICAL}
                  />
                </div>
                <div className="py-1 px-2 z-30">
                  <Range
                    unit="px"
                    label={`Padding horizontal (${paddingHorizontal}px)`}
                    value={paddingHorizontal}
                    onChange={(e) => {
                      handleConfigChange("paddingHorizontal")(+e.target.value);
                    }}
                    max={DEFAULT_RANGES.max.PADDING_HORIZONTAL}
                    min={DEFAULT_RANGES.min.PADDING_HORIZONTAL}
                  />
                </div>
                <div className="py-1 px-2 z-30">
                  <Range
                    unit="px"
                    label={`Line height (${lineHeight}px)`}
                    value={lineHeight}
                    onChange={(e) => {
                      handleConfigChange("lineHeight")(+e.target.value);
                    }}
                    max={DEFAULT_RANGES.max.LINE_HEIGHT}
                    min={DEFAULT_RANGES.min.LINE_HEIGHT}
                  />
                </div>
                <div className="py-1 px-2 z-30">
                  <Range
                    unit="deg"
                    label={`Gradient angle (${gradientAngle}deg)`}
                    value={gradientAngle}
                    onChange={(e) => {
                      handleConfigChange("gradientAngle")(+e.target.value);
                    }}
                    max={DEFAULT_RANGES.max.GRADIENT_ANGLE}
                    min={DEFAULT_RANGES.min.GRADIENT_ANGLE}
                  />
                </div>
                <div className="py-3 px-2 gap-2 flex flex-col">
                  <p>Window controls type</p>
                  <Checkbox
                    label="Mac left"
                    id="mac-pos-l"
                    data-testid="mac-pos-l"
                    checked={editorWindowControlsType === "mac-left"}
                    onChange={() => {
                      handleConfigChange("editorWindowControlsType")(
                        "mac-left"
                      );
                    }}
                  />
                  <Checkbox
                    label="Mac right"
                    id="mac-pos-r"
                    data-testid="mac-pos-r"
                    checked={editorWindowControlsType === "mac-right"}
                    onChange={() => {
                      handleConfigChange("editorWindowControlsType")(
                        "mac-right"
                      );
                    }}
                  />
                  <Checkbox
                    label="Windows left"
                    id="windows-pos-l"
                    data-testid="windows-pos-l"
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
                    data-testid="windows-pos-r"
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
    </>
  );
};

export default SnippngControlHeader;

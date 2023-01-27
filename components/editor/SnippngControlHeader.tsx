import { SnippngEditorContext } from "@/context/SnippngEditorContext";
import { LANGUAGES, THEMES } from "@/lib/constants";
import {
  CloudArrowDownIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import * as htmlToImage from "html-to-image";
import { useContext, useState } from "react";
import Button from "../form/Button";
import Checkbox from "../form/Checkbox";
import Select from "../form/Select";

const SnippngControlHeader = () => {
  const [downloadingSnippet, setDownloadingSnippet] = useState(false);

  const { editorConfig, handleConfigChange } = useContext(SnippngEditorContext);

  const { selectedLang, selectedTheme, showLineNumbers, wrapperBg } =
    editorConfig;

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
      <Checkbox
        label="Line count"
        id="line-count"
        onChange={() => {
          handleConfigChange("showLineNumbers")(!showLineNumbers);
        }}
      />

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
  );
};

export default SnippngControlHeader;

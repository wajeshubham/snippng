import { createRef, useState } from "react";

import { DEFAULT_BASE_SETUP } from "@/lib/constants";
import { clsx, getEditorWrapperBg, getLanguage, getTheme } from "@/utils";

import { langs, loadLanguage } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";

import { useSnippngEditor } from "@/context/SnippngEditorContext";
import { WidthHandler } from "@/lib/width-handler";
import Button from "../form/Button";
import Input from "../form/Input";
import NoSSRWrapper from "../NoSSRWrapper";
import SnippngControlHeader from "./SnippngControlHeader";
import SnippngWindowControls from "./SnippngWindowControls";

import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowDownOnSquareStackIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/context/ToastContext";

const SnippngCodeArea = () => {
  const editorRef = createRef<HTMLDivElement>();
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { editorConfig, handleConfigChange } = useSnippngEditor();
  const { user } = useAuth();
  const { addToast } = useToast();
  const {
    code,
    snippetsName,
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
    editorWidth,
    uid,
  } = editorConfig;

  const saveSnippet = async () => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    if (!user) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "user", user.uid, "snippets"), editorConfig);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setSaving(false);
    }
  };

  const updateSnippet = async () => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    if (!user || !uid) return;
    setUpdating(true);
    try {
      await updateDoc(doc(db, "user", user.uid, "snippets", uid), {
        ...editorConfig,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <section
        className="mb-10"
        id="snippng-code-area"
        data-testid="snippng-code-area"
      >
        <NoSSRWrapper>
          <div className="rounded-md bg-white dark:bg-zinc-900 p-8 flex justify-center border-[1px] flex-col items-center dark:border-zinc-500 border-zinc-200 shadow-md w-full">
            <div className="w-full">
              <SnippngControlHeader />
            </div>
            <div
              id="code-wrapper"
              className={clsx(
                "overflow-auto p-16 max-w-full",
                editorWidth ? "w-fit" : "w-full"
              )}
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
                ref={editorRef}
                data-testid="editor-container"
                className={clsx(
                  "overflow-hidden !font-mono relative max-w-full min-w-[320px]",
                  hasDropShadow
                    ? "shadow-xl shadow-zinc-900/40 has-drop-shadow-testclass"
                    : "",
                  rounded ? "rounded-xl rounded-testclass" : "!rounded-none"
                )}
                style={{
                  width: editorWidth || "100%",
                }}
              >
                <WidthHandler
                  innerRef={editorRef}
                  onChange={handleConfigChange("editorWidth")}
                />
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
                  onChange={(value) => handleConfigChange("code")(value)}
                >
                  <div className="absolute top-0 z-20 w-full text-white !px-3.5 !py-3 bg-inherit">
                    {showFileName ? (
                      <input
                        id="file-name-input"
                        value={fileName}
                        onChange={(e) =>
                          handleConfigChange("fileName")(e.target.value)
                        }
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
            <div className="w-full mt-8 flex md:flex-row flex-col gap-4 justify-start items-center">
              <div className="w-full">
                <Input
                  value={snippetsName}
                  onChange={(e) =>
                    handleConfigChange("snippetsName")(e.target.value)
                  }
                  placeholder="Snippet name..."
                />
              </div>
              <div className="flex flex-shrink-0 gap-4 md:flex-row flex-col md:w-fit w-full">
                <Button
                  id="save-snippet-btn"
                  StartIcon={ArrowDownOnSquareStackIcon}
                  disabled={saving}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!user)
                      return addToast({
                        message: "Please login first",
                        type: "error",
                        description:
                          "You need to login before saving the snippet",
                      });
                    if (!snippetsName)
                      return addToast({
                        message: "Snippet name is required",
                        type: "error",
                      });
                    else saveSnippet();
                  }}
                >
                  {saving
                    ? "Saving..."
                    : uid
                    ? "Save separately"
                    : "Save snippet"}
                </Button>
                {uid ? (
                  <Button
                    StartIcon={ArrowPathIcon}
                    disabled={updating}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!user)
                        return addToast({
                          message: "Please login first",
                          type: "error",
                          description:
                            "You need to login before saving the snippet",
                        });
                      if (!snippetsName)
                        return addToast({
                          message: "Snippet name is required",
                          type: "error",
                        });
                      updateSnippet();
                    }}
                  >
                    {updating ? "Updating..." : "Update snippet"}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </NoSSRWrapper>
      </section>
    </>
  );
};

export default SnippngCodeArea;

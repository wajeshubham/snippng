import { useEffect, useRef, useState } from "react";

import { DEFAULT_BASE_SETUP, THEMES } from "@/lib/constants";
import {
  LocalStorage,
  clsx,
  constructTheme,
  deepClone,
  getEditorWrapperBg,
  getLanguage,
  getTheme,
} from "@/utils";

import { langs, loadLanguage } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";

import { useSnippngEditor } from "@/context/SnippngEditorContext";
import { WidthHandler } from "@/lib/width-handler";
import NoSSRWrapper from "../NoSSRWrapper";
import Button from "../form/Button";
import Input from "../form/Input";
import SnippngControlHeader from "./SnippngControlHeader";
import SnippngWindowControls from "./SnippngWindowControls";

import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { SnippngThemeAttributesInterface } from "@/types";
import {
  ArrowDownOnSquareStackIcon,
  ArrowPathIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Logo from "../Logo";

interface Props {
  underConstructionTheme?: SnippngThemeAttributesInterface;
}

const SnippngCodeArea: React.FC<Props> = ({ underConstructionTheme }) => {
  const editorRef = useRef<HTMLDivElement>(null); // useRef to persist existing ref. Might be useful when dealing with background image in future
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { editorConfig, handleConfigChange } = useSnippngEditor();
  const { user } = useAuth();
  const { addToast } = useToast();
  const {
    ownerUid,
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
    bgImageVisiblePatch,
    bgBlur,
    watermark,
  } = editorConfig;

  const saveSnippet = async () => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    if (!user) return;
    setSaving(true);
    try {
      const dataToBeAdded = { ...deepClone(editorConfig) }; // deep clone the editor config to avoid mutation
      delete dataToBeAdded.uid; // delete existing uid if exists
      const savedDoc = await addDoc(collection(db, "snippets"), {
        ...dataToBeAdded,
        ownerUid: user.uid,
        owner: {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        },
      });
      if (savedDoc.id) {
        addToast({
          message: "Snippet saved successfully",
          description: "You can view your saved snippets in your profile page",
        });
      }
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
      await updateDoc(doc(db, "snippets", uid), {
        ...editorConfig,
      });
      addToast({
        message: "Snippet updated successfully",
        description: "You can view your updated snippets in your profile page",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setUpdating(false);
    }
  };

  /**
   *
   * @returns editor compatible theme object
   * @description  Function is responsible for constructing theme based on if it is
   * - `predefined` - theme in the `@uiw/codemirror-themes-all` library
   * - `localCustom` - Build by user and saved locally
   * - `underConstructionTheme` - user is currently constructing/configuring new theme
   */
  const getSelectedTheme = () => {
    // If user is configuring the custom theme (SnippngCustomThemeContextProvider modal is mounded)
    if (underConstructionTheme) return constructTheme(underConstructionTheme);
    else {
      // check if selected theme is predefined or locally created
      let [isPredefined, isLocalCustom] = getTheme(selectedTheme.id);

      if (isPredefined) return themes[isPredefined]; // if it is predefined return the theme configuration from the library

      if (isLocalCustom) return constructTheme(isLocalCustom); // else construct and return the code mirror compatible theme

      return themes[THEMES[0].id as keyof typeof themes]; // this will be returned if theme is not predefined as well as not available locally
    }
  };

  useEffect(() => {
    // if there is a uid means we are on edit page where we want to avoid persisting the editor config
    // underConstructionTheme means user is on the theme page which we don't want to persist
    if (uid || underConstructionTheme) return;
    // persist the editor config changes only when user is creating new snippet
    LocalStorage.set("config", {
      ...editorConfig,
      uid: undefined,
      ownerUid: undefined,
      owner: undefined,
    });
  }, [editorConfig, uid, underConstructionTheme]);

  return (
    <>
      <section
        className="mb-10"
        id="snippng-code-area"
        data-testid="snippng-code-area"
      >
        <NoSSRWrapper>
          <div className="rounded-md bg-white dark:bg-zinc-900 md:p-8 p-4 flex justify-center border-[1px] flex-col items-center dark:border-zinc-500 border-zinc-200 shadow-md w-full">
            <div className="w-full">
              <SnippngControlHeader
                creatingTheme={!!underConstructionTheme}
                wrapperRef={wrapperRef}
              />
            </div>
            {bgImageVisiblePatch ? (
              <button
                className="dark:text-white text-zinc-900 ml-auto text-xs py-1 px-1.5 mb-1 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => {
                  handleConfigChange("bgImageVisiblePatch")(null);
                }}
              >
                Remove bg image
              </button>
            ) : null}
            <div
              id="code-wrapper"
              ref={wrapperRef}
              className={clsx(
                "overflow-auto p-16 max-w-full relative",
                editorWidth ? "w-fit" : "w-full"
              )}
              style={{
                background: bgImageVisiblePatch
                  ? "none"
                  : getEditorWrapperBg(wrapperBg, gradients, gradientAngle),
                padding: `${paddingVertical}px ${paddingHorizontal}px`,
              }}
            >
              {bgImageVisiblePatch ? (
                <img
                  src={bgImageVisiblePatch}
                  alt="bg-image"
                  className="w-full h-full object-cover z-0 absolute inset-0"
                  style={{
                    filter: `blur(${bgBlur || 0}px)`,
                  }}
                />
              ) : null}
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
                  theme={getSelectedTheme()}
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
                {watermark ? (
                  <div
                    title="Remove watermark from the settings"
                    className="absolute bottom-1 text-white drop-shadow-[0_1px_1.2px_rgba(0,0,0,0.8)] opacity-50 right-2 text-[10px] inline-flex items-center"
                  >
                    <span className="mr-1">created using</span>{" "}
                    <Logo size="xs" />
                  </div>
                ) : null}
              </div>
            </div>
            {!underConstructionTheme ? (
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
                      : uid // if there is a uid, we are on snippet details page where user can copy the snippet
                      ? "Fork snippet"
                      : "Save snippet"}
                  </Button>
                  {uid && user && user.uid === ownerUid ? (
                    <Button
                      StartIcon={ArrowPathIcon}
                      disabled={updating}
                      onClick={(e) => {
                        e.stopPropagation();
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
            ) : null}
          </div>
          {uid ? (
            <small className="dark:text-zinc-300 text-left text-zinc-600 py-2 inline-block">
              <InformationCircleIcon className="w-4 h-4 inline-block mr-1 mb-1" />{" "}
              <strong>Note:</strong> When you click the{" "}
              <strong>
                <em>Fork snippet</em>
              </strong>{" "}
              button, a copy of the current snippet will be created in your
              profile <strong>with the same settings</strong>. As a result, if
              you change something and then forked, the snippet will include the
              changes you made.
            </small>
          ) : null}
        </NoSSRWrapper>
      </section>
    </>
  );
};

export default SnippngCodeArea;

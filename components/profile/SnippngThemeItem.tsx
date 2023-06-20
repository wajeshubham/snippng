import { useToast } from "@/context/ToastContext";
import { DEFAULT_BASE_SETUP, DEFAULT_CODE_SNIPPET } from "@/lib/constants";
import { SnippngThemeAttributesInterface } from "@/types";
import { LocalStorage, constructTheme, deepClone } from "@/utils";
import {
  ClipboardDocumentIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";

import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import ErrorText from "../ErrorText";
import Button from "../form/Button";

interface Props {
  theme: SnippngThemeAttributesInterface;
  onDelete: (themeId: string) => void;
  onPublishChange: (themeId: string) => void;
}

const SnippngThemeItem: React.FC<Props> = ({
  theme,
  onDelete,
  onPublishChange,
}) => {
  const { addToast } = useToast();
  const { user } = useAuth();

  const [deletingTheme, setDeletingTheme] = useState(false);

  const deleteThemeItem = async (themeId: string) => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    if (!user || !themeId) return;
    setDeletingTheme(true);

    try {
      await deleteDoc(doc(db, "themes", themeId));
      let localThemes =
        (LocalStorage.get(
          "local_themes"
        ) as SnippngThemeAttributesInterface[]) || [];
      localThemes = localThemes.filter((thm) => thm.id !== themeId);
      LocalStorage.set("local_themes", localThemes);
      onDelete(themeId || "");

      addToast({
        message: "Theme deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting theme", error);
    } finally {
      setDeletingTheme(false);
    }
  };

  const togglePublishThemeItem = async (themeId: string) => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    if (!user || !themeId) return;

    try {
      await updateDoc(doc(db, "themes", themeId), {
        ...theme,
        isPublished: !theme.isPublished,
      });

      let localThemes =
        (LocalStorage.get(
          "local_themes"
        ) as SnippngThemeAttributesInterface[]) || [];
      localThemes = localThemes.map((thm) => {
        if (thm.id === themeId) {
          thm.isPublished = !thm.isPublished;
        }
        return thm;
      });
      LocalStorage.set("local_themes", localThemes);
      addToast({
        message: `Theme ${
          theme.isPublished ? "unpublished" : "published"
        } successfully`,
      });
      onPublishChange(themeId || "");
    } catch (error) {
      console.log("Error publishing theme", error);
    }
  };

  const cloneTheme = async () => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    if (!user)
      return addToast({
        message: "Login to clone the theme",
        type: "error",
      });
    try {
      let data = deepClone(theme);
      // delete original theme's uid and id to persist them as they are unique
      delete data.uid;
      delete data.id;
      const dataToBeAdded = {
        ...data, // deep clone the theme to avoid mutation
        ownerUid: user.uid,
        isPublished: false,
        owner: {
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        },
      };
      const savedDoc = await addDoc(collection(db, "themes"), {
        ...dataToBeAdded,
      });
      if (savedDoc.id) {
        // get previously saved themes
        let previousThemes =
          (LocalStorage.get(
            "local_themes"
          ) as SnippngThemeAttributesInterface[]) || [];

        // push newly created theme inside the previous themes array
        previousThemes.push({
          ...dataToBeAdded,
          id: savedDoc.id,
        });
        // store the newly created theme inside local storage
        LocalStorage.set("local_themes", previousThemes);

        addToast({
          message: "Theme cloned successfully!",
          description: "You can view your cloned themes in your profile",
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
    }
  };

  if (!theme)
    return (
      <ErrorText
        errorTitle="Invalid theme"
        errorSubTitle="Them theme you want to render is corrupted"
      />
    );
  return (
    <CodeMirror
      readOnly
      editable={false}
      className={"CodeMirror__Theme__Preview__Editor"}
      value={DEFAULT_CODE_SNIPPET}
      extensions={[langs.javascript()]}
      basicSetup={{
        ...DEFAULT_BASE_SETUP,
      }}
      style={{
        fontSize: `12px`,
      }}
      // @ts-ignore
      theme={constructTheme(theme)}
      indentWithTab
    >
      {theme.isPublished ? (
        <span className="absolute z-10 right-0 top-0 inline-flex items-center rounded-bl-sm rounded-tr-md dark:bg-indigo-600 bg-indigo-100 h-[15px] py-2.5 px-1 text-[10px] dark:text-indigo-100 text-indigo-600 border-[1px] border-indigo-600">
          Published
        </span>
      ) : null}
      <div className="absolute bottom-0 z-20 w-full flex flex-row justify-between items-center text-base dark:text-white text-zinc-900 dark:bg-zinc-800 bg-white left-0 !p-3">
        <span className="font-semibold inline-flex items-center justify-between w-full text-indigo-600 dark:text-white">
          <span title={theme.label} className="truncate">
            {theme.label}
          </span>
          {theme?.ownerUid === user?.uid ? (
            <>
              <button
                aria-label="delete-theme"
                title="Delete theme"
                disabled={deletingTheme}
                onClick={() => {
                  let ok = confirm(
                    `Are you sure you want to ${
                      theme.isPublished ? "unpublish" : "publish"
                    } this theme?`
                  );
                  if (!ok) return;
                  togglePublishThemeItem(theme.id);
                }}
                className="inline-flex ml-auto mr-2 items-center gap-2 dark:text-white text-zinc-700 outline outline-[1px] dark:outline-zinc-500 rounded-md outline-zinc-200"
              >
                {theme.isPublished ? (
                  <EyeIcon
                    title="Theme is published"
                    className="h-7 w-7 hover:dark:bg-zinc-600 hover:bg-zinc-200 p-1 rounded-md cursor-pointer"
                  />
                ) : (
                  <EyeSlashIcon
                    role={"button"}
                    title="Theme is private"
                    tabIndex={0}
                    className="h-7 w-7 hover:dark:bg-zinc-600 hover:bg-zinc-200 p-1 rounded-md cursor-pointer"
                  />
                )}
              </button>
              <button
                aria-label="delete-theme"
                title="Delete theme"
                disabled={deletingTheme}
                onClick={() => {
                  let ok = confirm(
                    "Are you sure you want to delete this theme permanently?"
                  );
                  if (!ok) return;
                  deleteThemeItem(theme.id);
                }}
                className="inline-flex items-center gap-2 dark:text-white text-zinc-700 outline outline-[1px] dark:outline-zinc-500 rounded-md outline-zinc-200"
              >
                {/* <PencilIcon className="h-7 w-7 hover:dark:bg-zinc-600 hover:bg-zinc-200 p-1 rounded-md cursor-pointer" /> */}
                {deletingTheme ? (
                  <EllipsisHorizontalIcon className="animate-pulse h-7 w-7 hover:dark:bg-zinc-600 hover:bg-zinc-200 p-1 rounded-md cursor-pointer" />
                ) : (
                  <TrashIcon
                    role={"button"}
                    tabIndex={0}
                    className="h-7 w-7 hover:dark:bg-zinc-600 hover:bg-zinc-200 p-1 rounded-md cursor-pointer"
                  />
                )}
              </button>
            </>
          ) : null}
        </span>
        <span className="block w-full h-[0.1px] dark:bg-zinc-500 bg-zinc-300 my-3"></span>
        <span className="flex justify-start gap-3 items-center w-full">
          <img
            className="h-10 w-10 rounded-full border-[1px] dark:border-white border-zinc-900"
            src={theme?.owner?.photoURL || ""}
            alt=""
          />
          <span className="flex justify-start items-start flex-col">
            <p className="text-base font-bold text-zinc-900 dark:text-white">
              {theme?.owner?.displayName || "Snippng user"}
            </p>
            <p className="text-xs font-normal text-zinc-600 dark:text-zinc-200">
              {theme?.owner?.email || "Snippng user"}
            </p>
          </span>
          {theme?.ownerUid !== user?.uid ? (
            <Button
              className="ml-auto"
              aria-label="clone-theme"
              title="Clone theme"
              StartIcon={ClipboardDocumentIcon}
              onClick={cloneTheme}
            >
              Clone theme
            </Button>
          ) : null}
        </span>
      </div>
    </CodeMirror>
  );
};

export default SnippngThemeItem;

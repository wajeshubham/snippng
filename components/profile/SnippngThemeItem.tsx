import { useToast } from "@/context/ToastContext";
import { DEFAULT_BASE_SETUP, DEFAULT_CODE_SNIPPET } from "@/lib/constants";
import { SnippngThemeAttributesInterface } from "@/types";
import { constructTheme, LocalStorage } from "@/utils";
import { TrashIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";

import React, { useState } from "react";
import ErrorText from "../ErrorText";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import Loader from "../Loader";

interface Props {
  theme: SnippngThemeAttributesInterface;
  onDelete: (themeId: string) => void;
}

const SnippngThemeItem: React.FC<Props> = ({ theme, onDelete }) => {
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
      console.log("Error fetching snippets", error);
    } finally {
      setDeletingTheme(false);
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
      className="CodeMirror__Theme__Preview__Editor"
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
      {theme.isPublic ? (
        <span className="absolute right-0 top-0 inline-flex items-center rounded-bl-sm rounded-tr-md dark:bg-indigo-600 bg-indigo-100 h-[15px] py-2.5 px-1 text-[10px] dark:text-indigo-100 text-indigo-600 border-[1px] border-indigo-600">
          Published
        </span>
      ) : null}
      <div className="absolute bottom-0 z-20 w-full flex flex-row justify-between items-center text-base dark:text-white text-zinc-900 dark:bg-zinc-800 bg-white left-0 !p-3">
        <span className="font-semibold inline-flex items-center justify-between w-full text-indigo-600 dark:text-white">
          <span title={theme.label} className="truncate">
            {theme.label}
          </span>
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
            className="inline-flex items-center gap-2 dark:text-white text-zinc-700"
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
        </span>
      </div>
    </CodeMirror>
  );
};

export default SnippngThemeItem;

import { useToast } from "@/context/ToastContext";
import { SnippngEditorConfigInterface } from "@/types";
import {
  CommandLineIcon,
  FolderOpenIcon,
  LinkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Button from "../form/Button";

import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";

interface Props {
  snippet: SnippngEditorConfigInterface;
  onDelete: (uid: string) => void;
}
const SnippngListItem: React.FC<Props> = ({ snippet, onDelete }) => {
  const [deletingSnippet, setDeletingSnippet] = useState(false);
  const { addToast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const deleteCodeSnippet = async (snippetId: string) => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    if (!user || !snippetId) return;
    setDeletingSnippet(true);
    try {
      await deleteDoc(doc(db, "snippets", snippetId));
      onDelete(snippet.uid || "");
      addToast({
        message: "Snippet deleted successfully",
      });
    } catch (error) {
      console.log("Error fetching snippets", error);
    } finally {
      setDeletingSnippet(false);
    }
  };

  return (
    <li className="flex items-center md:justify-between md:flex-row flex-col py-3 pl-3 pr-4 text-sm">
      <div className="flex flex-shrink-0 flex-1 text-left md:w-fit w-full md:py-0 py-4 items-center dark:text-white text-zinc-900">
        <CommandLineIcon
          className="h-5 w-5 flex-shrink-0x"
          aria-hidden="true"
        />
        <span className="ml-2 flex-1 truncate">{snippet.snippetsName}</span>
      </div>
      <div className="md:w-fit w-full md:flex-row flex-col flex-shrink-0 gap-3 inline-flex items-center">
        <Button
          className="md:w-[unset] w-full"
          StartIcon={FolderOpenIcon}
          onClick={() => {
            router.push(`/snippet/${snippet.uid}`);
          }}
        >
          Open
        </Button>

        <Button
          className="md:w-[unset] w-full"
          StartIcon={LinkIcon}
          onClick={() => {
            if (!navigator?.clipboard)
              return addToast({
                message: "navigator unavailable",
                type: "error",
              });
            navigator.clipboard
              ?.writeText(`${window.location.host}/snippet/${snippet.uid}`)
              .then(() => {
                addToast({
                  message: "Link copied!",
                  description:
                    "You can share this link to anyone. So that, they can copy or fork this code snippet and can use it anywhere.",
                });
              });
          }}
        >
          Copy link
        </Button>
        <Button
          className="!text-red-500 md:w-[unset] w-full"
          disabled={deletingSnippet}
          StartIcon={TrashIcon}
          onClick={() => {
            const confirm = window.confirm(
              "Are you sure you want to delete this snippet?"
            );
            if (confirm) {
              deleteCodeSnippet(snippet.uid ?? "");
            }
          }}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export default SnippngListItem;

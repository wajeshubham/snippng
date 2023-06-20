import { ErrorText, Loader, SnippngCodeArea } from "@/components";
import { db } from "@/config/firebase";
import { useSnippngEditor } from "@/context/SnippngEditorContext";
import { useToast } from "@/context/ToastContext";
import Layout from "@/layout/Layout";
import { defaultEditorConfig } from "@/lib/constants";
import { SnippngEditorConfigInterface } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// TODO: implement SSR
const SavedSnippet = () => {
  const router = useRouter();
  const { editorConfig, setEditorConfig } = useSnippngEditor();

  const [notFound, setNotFound] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);

  const { uid } = router.query as { uid: string };

  const { addToast } = useToast();

  const fetchCodeSnippet = async () => {
    if (!db) {
      setLoadingConfig(false);
      return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    }
    try {
      const docRef = await getDoc(doc(db, "snippets", uid));
      if (docRef.exists()) {
        setEditorConfig({
          ...docRef.data(),
          uid,
        } as SnippngEditorConfigInterface);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      setNotFound(true);
    } finally {
      setLoadingConfig(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchCodeSnippet();
    return () => {
      // set uid & ownerUid to undefined because we are leaving the snippet details page, the only page where uid is required
      setEditorConfig({
        ...defaultEditorConfig,
        uid: undefined,
        ownerUid: undefined,
        owner: undefined,
      });
    };
  }, [router.isReady]);

  useEffect(() => {
    if (!notFound) return;
    addToast({
      message: "404 Snippet not found",
      description: "The snippet you are looking for does not exist.",
      type: "error",
    });
  }, [notFound]);

  if (notFound)
    return (
      <Layout>
        <div className="w-full py-32">
          <ErrorText
            errorTitle="Invalid snippet ID"
            errorSubTitle="The snippet you are looking for does not exist."
            errorActionProps={{
              children: "Go Back",
              StartIcon: ArrowLeftIcon,
              onClick: () => router.back(),
            }}
          />
        </div>
      </Layout>
    );

  return (
    <Layout>
      {loadingConfig ? (
        <Loader />
      ) : (
        <>
          <div className="my-4 max-w-3xl md:flex md:items-start md:justify-between md:space-x-5 lg:max-w-7xl">
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-14 w-14 rounded-full border-[1px] dark:border-white border-zinc-900"
                    src={editorConfig?.owner?.photoURL || ""}
                    alt=""
                  />
                  <span
                    className="absolute inset-0 rounded-full shadow-inner"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-xl items-center inline-flex font-bold text-zinc-900 dark:text-white">
                  {editorConfig?.owner?.displayName || "Snippng user"}{" "}
                  <span className="inline-flex items-center ml-1.5 rounded-sm dark:bg-indigo-600 bg-indigo-100 h-[15px] py-1.5 px-1 text-[10px] dark:text-indigo-100 text-indigo-600 border-[1px] border-indigo-600">
                    Author
                  </span>
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-300">
                  {editorConfig?.owner?.email || "Snippng user email"}
                </p>
              </div>
            </div>
          </div>
          <SnippngCodeArea />
        </>
      )}
    </Layout>
  );
};

export default SavedSnippet;

import { ErrorText, Loader, SigninButton, SnippngCodeArea } from "@/components";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useSnippngEditor } from "@/context/SnippngEditorContext";
import { useToast } from "@/context/ToastContext";
import Layout from "@/layout/Layout";
import { defaultEditorConfig } from "@/lib/constants";
import { SnippngEditorConfigInterface } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SavedSnippet = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { setEditorConfig } = useSnippngEditor();

  const [notFound, setNotFound] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);

  const { uid } = router.query as { uid: string };

  const { addToast } = useToast();

  const fetchCodeSnippet = async () => {
    if (!user || !db) {
      setLoadingConfig(false);
      if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
      return;
    }
    try {
      const docRef = await getDoc(doc(db, "user", user.uid, "snippets", uid));
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
    if (!router.isReady || !user) return;
    fetchCodeSnippet();
    return () => {
      setEditorConfig({ ...defaultEditorConfig });
    };
  }, [router.isReady, user]);

  useEffect(() => {
    if (!notFound) return;
    addToast({
      message: "404 Snippet not found",
      description: "Snippet that you are looking for does not exist.",
      type: "error",
    });
  }, [notFound]);

  if (notFound)
    return (
      <Layout>
        <div className="w-full py-32">
          <ErrorText
            errorTitle="Invalid snippet ID"
            errorSubTitle="The snippet that you are looking for does not exist"
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
      {!user ? (
        <div className="w-full h-full flex justify-center items-center py-32">
          <SigninButton />
        </div>
      ) : loadingConfig ? (
        <Loader />
      ) : (
        <SnippngCodeArea />
      )}
    </Layout>
  );
};

export default SavedSnippet;

import { useEffect, useState } from "react";
import { ErrorText, Loader, SigninButton, SnippngCodeArea } from "@/components";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useSnippngEditor } from "@/context/SnippngEditorContext";
import Layout from "@/layout/Layout";
import { SnippngEditorConfigInterface } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { defaultEditorConfig } from "@/lib/constants";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const SavedSnippet = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { setEditorConfig } = useSnippngEditor();

  const [notFound, setNotFound] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);

  const { uid } = router.query as { uid: string };

  const fetchCodeSnippet = async () => {
    if (!user) {
      setLoadingConfig(false);
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

import { useEffect, useState } from "react";
import { SnippngCodeArea } from "@/components";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useSnippngEditor } from "@/context/SnippngEditorContext";
import Layout from "@/layout/Layout";
import { SnippngEditorConfigInterface } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

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
  }, [router.isReady, user]);

  return (
    <Layout>
      {!notFound ? (
        loadingConfig ? (
          <p className="text-white">Loading...</p>
        ) : (
          <SnippngCodeArea />
        )
      ) : (
        <p className="text-white">404 not found</p>
      )}
    </Layout>
  );
};

export default SavedSnippet;

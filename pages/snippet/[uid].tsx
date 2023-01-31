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
  const [notFound, setNotFound] = useState(false);
  const { uid } = router.query as { uid: string };
  const { user } = useAuth();
  const { setEditorConfig } = useSnippngEditor();

  // TODO: handle loading
  const fetchCodeSnippet = async () => {
    if (!uid || !user) {
      setNotFound(true);
      return;
    }
    if (!user) return;
    try {
      const docRef = await getDoc(doc(db, "user", user.uid, "snippets", uid));
      if (docRef.exists()) {
        setEditorConfig(docRef.data() as SnippngEditorConfigInterface);
      }
    } catch (error) {
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchCodeSnippet();
  }, [router.isReady]);

  return (
    <Layout>
      {!notFound ? (
        <SnippngCodeArea />
      ) : (
        <p className="text-white">404 not found</p>
      )}
    </Layout>
  );
};

export default SavedSnippet;

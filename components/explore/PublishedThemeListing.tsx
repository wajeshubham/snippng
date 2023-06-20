import { db } from "@/config/firebase";
import { SnippngThemeAttributesInterface } from "@/types";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ErrorText from "../ErrorText";
import Loader from "../Loader";
import SnippngThemeItem from "../profile/SnippngThemeItem";
import { useAuth } from "@/context/AuthContext";

const PublishedThemeListing = () => {
  const [themes, setThemes] = useState<SnippngThemeAttributesInterface[]>([]);
  const [loadingThemes, setLoadingThemes] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const fetchPublishedThemes = async () => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    setLoadingThemes(true);
    try {
      const _themes: SnippngThemeAttributesInterface[] = [];
      const docRef = await getDocs(
        query(collection(db, "themes"), where("isPublished", "==", true))
      );
      docRef.forEach((doc) => {
        const theme = doc.data();
        _themes.push({
          ...theme,
          uid: doc.id,
        } as unknown as SnippngThemeAttributesInterface);
      });
      setThemes(_themes);
    } catch (error) {
      console.log("Error fetching snippets", error);
    } finally {
      setLoadingThemes(false);
    }
  };

  useEffect(() => {
    fetchPublishedThemes();
  }, [user]);

  if (loadingThemes) return <Loader />;

  return (
    <div className="py-5">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dd className="mt-1 text-sm text-zinc-900">
            {themes.length ? (
              <ul role="list" className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {themes.map((theme) => (
                  <SnippngThemeItem
                    key={theme.id}
                    theme={theme}
                    onDelete={(themeId) => {
                      setThemes(
                        [...themes].filter((thm) => thm.id !== themeId)
                      );
                    }}
                    onPublishChange={(themeId) => {
                      setThemes(
                        [...themes].map((theme) => {
                          if (theme.id === themeId) {
                            theme.isPublished = !theme.isPublished;
                          }
                          return theme;
                        })
                      );
                    }}
                  />
                ))}
              </ul>
            ) : (
              <ErrorText
                errorTitle="No themes found"
                errorSubTitle="Please construct some themes to list them here"
                errorActionProps={{
                  children: "Construct",
                  StartIcon: SparklesIcon,
                  onClick: () => {
                    router.push("/theme/create");
                  },
                }}
              />
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default PublishedThemeListing;

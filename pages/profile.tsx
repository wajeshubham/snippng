import withAuth from "@/HOC/withAuth";
import { Button, ErrorText, Loader } from "@/components";
import SnippngListItem from "@/components/profile/SnippngListItem";
import SnippngThemeItem from "@/components/profile/SnippngThemeItem";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/layout/Layout";
import {
  SnippngEditorConfigInterface,
  SnippngThemeAttributesInterface,
} from "@/types";
import { loadThemes } from "@/utils";
import {
  CodeBracketIcon,
  PlusCircleIcon,
  PlusIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [savedSnippets, setSavedSnippets] = useState<
    SnippngEditorConfigInterface[]
  >([]);
  const [savedThemes, setSavedThemes] = useState<
    SnippngThemeAttributesInterface[]
  >([]);

  const [loadingSnippets, setLoadingSnippets] = useState(true);

  const { user } = useAuth();
  const router = useRouter();

  const fetchCodeSnippets = async () => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    try {
      const snippets: SnippngEditorConfigInterface[] = [];
      const docRef = await getDocs(
        query(collection(db, "snippets"), where("ownerUid", "==", user?.uid))
      );
      docRef.forEach((doc) => {
        snippets.push({
          ...doc.data(),
          uid: doc.id,
        } as SnippngEditorConfigInterface);
      });
      setSavedSnippets(snippets);
    } catch (error) {
      console.log("Error fetching snippets", error);
    } finally {
      setLoadingSnippets(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchCodeSnippets();
    loadThemes(user, (themes) => {
      setSavedThemes(themes);
    });
  }, [user]);

  return (
    <Layout
      title={`${user?.displayName || "Snippng"} | code snippets to image`}
    >
      <div className="min-h-full">
        <main className="py-10">
          {/* Page header */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full border-[1px] dark:border-white border-zinc-900"
                    src={user?.photoURL || ""}
                    alt=""
                  />
                  <span
                    className="absolute inset-0 rounded-full shadow-inner"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {user?.displayName || "Snippng user"}
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-300">
                  {user?.email || "Snippng user"}
                </p>
              </div>
            </div>
            <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
              <Button
                StartIcon={PlusCircleIcon}
                onClick={() => router.push("/#snippng-code-area")}
              >
                Generate snippet
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-3 lg:col-start-1">
              <section aria-labelledby="saved-snippets-section">
                <div className="dark:bg-zinc-800 bg-white border-[1px] dark:border-zinc-500 border-zinc-200 shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium inline-flex items-center dark:text-white text-zinc-900">
                          <CodeBracketIcon className="w-5 h-5 mr-2" /> Saved
                          snippets
                        </dt>
                        <dd className="mt-3 text-sm text-zinc-900">
                          {!loadingSnippets ? (
                            savedSnippets.length ? (
                              <ul
                                role="list"
                                className="divide-y dark:divide-zinc-500 divide-zinc-200 rounded-md border-[1px] dark:border-zinc-500 border-zinc-200"
                              >
                                {savedSnippets.map((snippet) => (
                                  <SnippngListItem
                                    key={snippet.uid}
                                    snippet={snippet}
                                    onDelete={(uid) => {
                                      setSavedSnippets((prevSnippets) =>
                                        [...prevSnippets].filter(
                                          (snippet) => snippet.uid !== uid
                                        )
                                      );
                                    }}
                                  />
                                ))}
                              </ul>
                            ) : (
                              <ErrorText
                                errorTitle="No snippets found"
                                errorSubTitle="Please generate some snippets to list them here"
                                errorActionProps={{
                                  children: "Generate",
                                  StartIcon: PlusIcon,
                                  onClick: () =>
                                    router.push("/#snippng-code-area"),
                                }}
                              />
                            )
                          ) : (
                            <Loader />
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              <section aria-labelledby="saved-themes-section">
                <div className="dark:bg-zinc-800 bg-white border-[1px] dark:border-zinc-500 border-zinc-200 shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <div className="flex justify-between items-center w-full mb-4">
                          <dt className="text-sm font-medium inline-flex items-center dark:text-white text-zinc-900">
                            <SparklesIcon className="w-5 h-5 mr-2" /> Saved
                            themes
                          </dt>
                          <Button
                            StartIcon={SparklesIcon}
                            onClick={() => {
                              router.push("/theme/create");
                            }}
                          >
                            Create theme
                          </Button>
                        </div>
                        <dd className="mt-1 text-sm text-zinc-900">
                          {savedThemes.length ? (
                            <ul
                              role="list"
                              className="grid md:grid-cols-2 grid-cols-1 gap-4"
                            >
                              {savedThemes.map((theme) => (
                                <SnippngThemeItem
                                  key={theme.id}
                                  theme={theme}
                                  onDelete={(themeId) => {
                                    setSavedThemes(
                                      [...savedThemes].filter(
                                        (thm) => thm.id !== themeId
                                      )
                                    );
                                  }}
                                  onPublishChange={(themeId) => {
                                    setSavedThemes(
                                      [...savedThemes].map((theme) => {
                                        if (theme.id === themeId) {
                                          theme.isPublished =
                                            !theme.isPublished;
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
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default withAuth(UserProfile);
